import { readFile } from "node:fs/promises";
import path from "node:path";
import process from "node:process";
import { Buffer } from "node:buffer";
import { transform } from "esbuild";

/**
 * Injects a static, crawlable version of the site's content into the built
 * index.html, inside a <noscript> block.
 *
 * The app is client-rendered, so the shipped HTML is just an empty <div>.
 * Crawlers that don't execute JavaScript see nothing, and even those that do
 * see almost nothing, because the experience/project/education content only
 * mounts once a modal is opened. This bakes the same content into the HTML.
 *
 * It ships inside <noscript>, so browsers never paint it and visitors see no
 * flash before React mounts. It is generated from the same data modules the
 * components render, so it cannot drift out of sync.
 */

const SOURCES = {
  profile: "src/profileconfig.jsx",
  experience: "src/components/constants/experience.jsx",
  project: "src/components/constants/project.jsx",
  education: "src/components/constants/education.jsx",
};

// The data modules are plain data, but run them through esbuild anyway so the
// plugin keeps working if any of them ever gains JSX.
async function loadDataModule(file) {
  const source = await readFile(file, "utf8");
  const { code } = await transform(source, {
    loader: "jsx",
    format: "esm",
    target: "node18",
  });
  const url = `data:text/javascript;base64,${Buffer.from(code).toString("base64")}`;
  return import(url);
}

const esc = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");

const list = (items) =>
  items?.length
    ? `<ul>${items.map((i) => `<li>${esc(i)}</li>`).join("")}</ul>`
    : "";

function renderRole(role) {
  const at = [role.company, role.client && `Client: ${role.client}`]
    .filter(Boolean)
    .join(" — ");
  return `<article>
<h3>${esc(role.role)} — ${esc(at)}</h3>
<p>${esc(role.location)} | ${esc(role.duration)}</p>
<p>${esc(role.briefDesc)}</p>
${list(role.desc)}
<p>Technologies: ${esc(role.tech?.join(", "))}</p>
</article>`;
}

function renderProject(proj) {
  const links = [
    proj.liveLink && `<a href="${esc(proj.liveLink)}">Live site</a>`,
    proj.githubLink && `<a href="${esc(proj.githubLink)}">Source</a>`,
  ].filter(Boolean);
  return `<article>
<h3>${esc(proj.name)}${proj.tagline ? ` — ${esc(proj.tagline)}` : ""}</h3>
<p>${esc(proj.duration)}${proj.status ? ` | ${esc(proj.status)}` : ""}</p>
<p>${esc(proj.briefDesc)}</p>
${list(proj.desc)}
<p>Technologies: ${esc(proj.tech?.join(", "))}</p>
${links.length ? `<p>${links.join(" ")}</p>` : ""}
</article>`;
}

function renderSchool(edu) {
  const detail = [edu.degree, edu.cgpa || edu.score].filter(Boolean).join(" | ");
  return `<article>
<h3>${esc(edu.institution)}</h3>
<p>${esc(edu.duration)} | ${esc(detail)}</p>
</article>`;
}

// Only ever rendered when scripting is unavailable, in which case it is the
// whole page — so keep it legible.
const FALLBACK_STYLE = `#seo-fallback{max-width:46rem;margin:0 auto;padding:2rem 1.25rem;
font-family:system-ui,-apple-system,'Segoe UI',sans-serif;line-height:1.5;color:#111827}
#seo-fallback h1{font-size:1.6rem;margin:0 0 .5rem}
#seo-fallback h2{font-size:1.15rem;margin:2rem 0 .5rem;border-bottom:1px solid #e5e7eb;padding-bottom:.25rem}
#seo-fallback h3{font-size:1rem;margin:1.25rem 0 .25rem}
#seo-fallback p{margin:.25rem 0}
#seo-fallback ul{margin:.5rem 0;padding-left:1.25rem}
#seo-fallback a{color:#2563eb;margin-right:.75rem}`;

function renderFallback({ profile, experience, project, education }) {
  return `<div id="seo-fallback">
<style>${FALLBACK_STYLE}</style>
<h1>${esc(profile.name)} — ${esc(profile.title)}</h1>
<p>Software Developer building production web applications and REST APIs with
React.js, Next.js, Node.js, Express.js and Spring Boot.</p>

<h2>Skills</h2>
<p>${esc(profile.skills.join(", "))}</p>

<h2>Experience</h2>
${experience.map(renderRole).join("\n")}

<h2>Projects</h2>
${project.map(renderProject).join("\n")}

<h2>Education</h2>
${education.map(renderSchool).join("\n")}

<h2>Contact</h2>
<p>
<a href="mailto:${esc(profile.email)}">${esc(profile.email)}</a>
<a href="${esc(profile.github)}">GitHub</a>
<a href="${esc(profile.linkedin)}">LinkedIn</a>
<a href="${esc(profile.twitter)}">X</a>
<a href="/Resume.pdf">Resume</a>
</p>
</div>`;
}

export default function seoFallback({ root = process.cwd() } = {}) {
  return {
    name: "seo-fallback",
    apply: "build",
    async transformIndexHtml(html) {
      const loaded = Object.fromEntries(
        await Promise.all(
          Object.entries(SOURCES).map(async ([key, file]) => [
            key,
            await loadDataModule(path.resolve(root, file)),
          ])
        )
      );

      const markup = renderFallback({
        profile: loaded.profile,
        experience: loaded.experience.experience,
        project: loaded.project.project,
        education: loaded.education.education,
      });

      const target = '<div id="root"></div>';
      if (!html.includes(target)) {
        throw new Error(
          'seo-fallback: could not find <div id="root"></div> in index.html'
        );
      }
      // <noscript> rather than inside #root: the markup stays in the served
      // HTML for agents that don't run scripts, but browsers never parse or
      // paint it, so there is no flash of fallback content before React mounts.
      return html.replace(target, `${target}\n<noscript>${markup}</noscript>`);
    },
  };
}

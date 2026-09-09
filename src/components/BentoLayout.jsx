import { useEffect, useRef, useState } from "react";
import { gsap } from "gsap";
import githubLogo from "../assets/github.svg";
import linkedInLogo from "../assets/linkedin.svg";
import xLogo from "../assets/x-logo.svg";
import mailLogo from "../assets/mail.png";
import resumeImage from "../assets/resume.svg";
import backgroundImage from "../assets/profile-photo.jpg";
import projectsImage from "../assets/projects.jpg";
import expLogo from "../assets/experience/+1.svg";
import contactme from "../assets/contact.jpg";
import { email, github, linkedin, twitter, resume } from "../profileconfig";
import ProjectModal from "./modals/ProjectModal.jsx";
import ContactModal from "./modals/ContactModal.jsx";
import ExperienceModal from "./modals/ExperienceModal.jsx";

const BentoLayout = ({ isDarkMode, toggleDarkMode }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const gridRef = useRef(null);
  const [animationDone, setAnimationDone] = useState(false);
  const [contactOpen, setContactOpen] = useState(false);
  const [experienceOpen, setExperienceOpen] = useState(false);

  useEffect(() => {
    const grid = gridRef.current;
    if (!grid) return;
    const elements = grid.children;

    // Land on the finished state without animating. GSAP drives tweens off
    // requestAnimationFrame, which is throttled in a hidden tab and never runs
    // during prerender — so starting at opacity 0 there would hide the grid
    // permanently. Same end state for anyone who asked for less motion.
    const settle = () => {
      gsap.set(elements, { opacity: 1, x: 0, y: 0 });
      setAnimationDone(true);
    };

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion || document.visibilityState !== "visible") {
      settle();
      return;
    }

    const ctx = gsap.context(() => {
      gsap.set(elements, {
        opacity: 0,
        y: () => -Math.random() * 500 - 100,
        x: () => 50 - Math.random() * 100,
      });
      gsap.to(elements, {
        opacity: 1,
        y: 0,
        x: 0,
        stagger: 0.1,
        ease: "elastic.out(1, 0.75)",
        duration: 1.2,
        delay: 0.5,
        onComplete: () => setAnimationDone(true),
      });
    }, grid);

    return () => ctx.revert();
  }, []);

  useEffect(() => {
    if (!animationDone) return;
    const grid = gridRef.current;
    if (!grid) return;

    // Touch browsers fire mouseenter on tap and never fire mouseleave, which
    // would leave a tile stuck at scale 1.1.
    if (!window.matchMedia("(hover: hover)").matches) return;

    const teardown = [...grid.children].map((element) => {
      const scaleTo = (scale, zIndex) => () =>
        gsap.to(element, {
          scale,
          zIndex,
          duration: 0.2,
          ease: "Power1.easeOut",
          overwrite: "auto",
        });
      const onEnter = scaleTo(1.1, 10);
      const onLeave = scaleTo(1, 1);
      element.addEventListener("mouseenter", onEnter);
      element.addEventListener("mouseleave", onLeave);
      return () => {
        element.removeEventListener("mouseenter", onEnter);
        element.removeEventListener("mouseleave", onLeave);
      };
    });

    return () => teardown.forEach((off) => off());
  }, [animationDone]);

  return (
    <div className={`app-container ${isDarkMode ? "dark" : "light"} p-4`}>
      <button
        onClick={toggleDarkMode}
        className="p-3 px-4 bg-gray-800 text-white rounded-md fixed top-4 right-4 z-50"
      >
        {isDarkMode ? (
          <i className="fas fa-sun"></i>
        ) : (
          <i className="fas fa-moon"></i>
        )}
      </button>

      <div
        ref={gridRef}
        className="grid grid-cols-2 lg:grid-cols-4 gap-4"
      >
        {/* Profile Image */}
        <div
          className="relative overflow-hidden col-span-2 aspect-square sm:aspect-[2/1] rounded-xl border-transparent p-4 shadow-md flex justify-center items-center"
          style={{
            backgroundImage: `url(${backgroundImage})`,
            backgroundSize: "cover",
            backgroundPosition: "center 22%",
          }}
        >
          {/* keeps the label readable, and weighted left so it clears the face */}
          <div
            aria-hidden="true"
            className="absolute inset-0 bg-gradient-to-tr from-black/80 via-black/25 to-transparent"
          />
          <span className="relative w-full self-end text-left text-xl lg:text-3xl text-white font-bold drop-shadow-lg">
            Who Am I?
          </span>
        </div>

        {/* Resume */}
        <div className="col-span-1 aspect-square rounded-xl border-transparent shadow-md overflow-hidden">
          <a href={resume} target="_blank" rel="noopener noreferrer">
            <img
              src={resumeImage}
              alt="Resume"
              className="w-full h-full object-cover"
            />
          </a>
        </div>

        {/* Experience */}
        <div className="col-span-1 aspect-square rounded-xl border-transparent shadow-md overflow-hidden">
          <button
            className="w-full h-full"
            onClick={() => setExperienceOpen(true)}
            aria-label="View work experience"
          >
            <img
              src={expLogo}
              alt="Experience"
              className="w-full h-full object-cover"
            />
          </button>
        </div>

        {/* Projects */}
        <div className="col-span-2 lg:col-span-4 aspect-[2/1] sm:aspect-[4/1] rounded-xl border-transparent shadow-md overflow-hidden">
          <button
            className="relative w-full h-full"
            onClick={() => setIsModalOpen(true)}
            aria-label="View projects"
          >
            <img
              src={projectsImage}
              alt="Screenshots of VYARA and Borcelle Kitchen"
              className="w-full h-full object-cover"
            />
            {/* label lives in the DOM so it survives every aspect-ratio crop */}
            <div
              aria-hidden="true"
              className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/30 to-transparent"
            />
            <span className="absolute left-4 sm:left-6 top-1/2 -translate-y-1/2 text-white font-bold drop-shadow-lg text-xl sm:text-2xl lg:text-3xl">
              Projects
            </span>
          </button>
        </div>

        {/* GitHub */}
        <div className="col-span-1 aspect-square rounded-xl border-transparent shadow-md overflow-hidden">
          <a href={github} target="_blank" rel="noopener noreferrer">
            <img
              src={githubLogo}
              alt="GitHub Logo"
              className="w-full h-full object-cover"
            />
          </a>
        </div>

        {/* LinkedIn */}
        <div className="col-span-1 aspect-square rounded-xl border-transparent shadow-md overflow-hidden">
          <a href={linkedin} target="_blank" rel="noopener noreferrer">
            <img
              src={linkedInLogo}
              alt="LinkedIn Logo"
              className="w-full h-full object-cover"
            />
          </a>
        </div>

        {/* X/Twitter */}
        <div className="col-span-1 aspect-square rounded-xl border-transparent shadow-md overflow-hidden">
          <a href={twitter} target="_blank" rel="noopener noreferrer">
            <img
              src={xLogo}
              alt="X/Twitter Logo"
              className="w-full h-full object-cover"
            />
          </a>
        </div>

        {/* Email */}
        <div className="col-span-1 aspect-square rounded-xl border-transparent shadow-md overflow-hidden">
          <a href={`mailto:${email}`}>
            <img
              src={mailLogo}
              alt="Mail Logo"
              className="w-full h-full object-cover"
            />
          </a>
        </div>

        {/* Contact me */}
        <div
          className="col-span-2 lg:col-span-4 rounded-xl border-transparent shadow-md overflow-hidden cursor-pointer"
          onClick={() => setContactOpen(true)}
        >
          <img src={contactme} />
        </div>
      </div>

      {/*
        Modals stay mounted rather than being conditionally rendered, so their
        content is present in the rendered DOM for search engines — this is the
        same pattern as tabbed/accordion content, which Google indexes normally.
        The `hidden` attribute keeps them out of view, out of the tab order and
        out of the accessibility tree. Note it must sit on an element with no
        display utility, or Tailwind's `.flex` would override `[hidden]`.
      */}
      <div hidden={!isModalOpen}>
        <ProjectModal onClose={() => setIsModalOpen(false)} mode={isDarkMode} />
      </div>

      <div hidden={!experienceOpen}>
        <ExperienceModal
          onClose={() => setExperienceOpen(false)}
          mode={isDarkMode}
        />
      </div>

      <div hidden={!contactOpen}>
        <div className="flex flex-col md:flex-row gap-10">
          <ContactModal setContactOpen={setContactOpen} mode={isDarkMode} />
        </div>
      </div>
    </div>
  );
};

export default BentoLayout;

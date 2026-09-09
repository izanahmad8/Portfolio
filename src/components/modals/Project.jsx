import { useState } from "react";
import githubLogo from "../../assets/github.svg";
import siteLogo from "../../assets/internet.svg";
import cross from "../../assets/cross.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, FreeMode } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import "swiper/css/free-mode";

const Project = ({ proj, index, isDarkMode }) => {
  const [preview, setPreview] = useState(false);
  const hasPreview = proj.previewImages?.length > 0;
  const headingColor = isDarkMode ? "text-gray-100" : "text-gray-900";

  return (
    <div key={index} className="relative">
      <div className="flex flex-row items-center gap-4">
        {proj.logo ? (
          <img
            src={proj.logo}
            alt={`${proj.name} Logo`}
            className="w-14 h-14 shrink-0 rounded-lg object-cover"
          />
        ) : (
          <div
            aria-hidden="true"
            className={`w-14 h-14 shrink-0 rounded-lg grid place-items-center text-2xl font-bold ${
              isDarkMode
                ? "bg-gray-700 text-teal-300"
                : "bg-blue-100 text-blue-600"
            }`}
          >
            {proj.name.charAt(0)}
          </div>
        )}

        <div className="flex-grow min-w-0">
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl sm:text-2xl font-semibold">
              {proj.name}
            </span>
            {proj.status && (
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  isDarkMode
                    ? "bg-teal-500 text-gray-900"
                    : "bg-blue-600 text-white"
                }`}
              >
                {proj.status}
              </span>
            )}
          </div>
          {proj.tagline && (
            <div className="text-sm sm:text-base font-light">
              {proj.tagline}
            </div>
          )}
          {proj.duration && (
            <div className="text-sm italic">{proj.duration}</div>
          )}
        </div>

        <div className="flex flex-row gap-3 shrink-0">
          {proj.githubLink && (
            <a
              href={proj.githubLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${proj.name} source on GitHub`}
            >
              <img src={githubLogo} alt="GitHub" className="w-10 h-10" />
            </a>
          )}
          {proj.liveLink && (
            <a
              href={proj.liveLink}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${proj.name} live site`}
            >
              <img src={siteLogo} alt="Live site" className="w-10 h-10" />
            </a>
          )}
        </div>
      </div>

      <p className="italic mt-3 mb-2">{proj.briefDesc}</p>

      <h3 className={`font-bold mt-3 ${headingColor}`}>Description:</h3>
      <ul className="list-disc list-inside mb-2">
        {proj.desc.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h3 className={`font-bold ${headingColor}`}>Technologies:</h3>
      <div className="mt-1 flex flex-wrap items-center gap-2">
        {proj.tech.map((t, idx) => (
          <span
            key={idx}
            className={`text-sm px-2 py-1 rounded-md ${
              isDarkMode
                ? "bg-gray-700 text-gray-100"
                : "bg-gray-200 text-gray-800"
            }`}
          >
            {t}
          </span>
        ))}
        {hasPreview && (
          <button
            onClick={() => setPreview(true)}
            className="ml-auto bg-black text-white px-4 py-2 rounded-md hover:bg-slate-700 transition-all duration-200"
          >
            Preview
          </button>
        )}
      </div>

      {hasPreview && (
        <div
          className={`bg-white w-full h-full p-8 ${
            preview ? "block" : "hidden"
          } flex flex-col gap-4 absolute top-0 left-0`}
        >
          <img
            src={cross}
            alt="Close"
            className="absolute hover:cursor-pointer top-5 flex right-5 w-5 h-5"
            onClick={() => setPreview(false)}
          />
          <h2 className="font-semibold text-gray-900">{proj.name} Preview</h2>
          <Swiper
            slidesPerView={1}
            spaceBetween={25}
            loop={true}
            freeMode={true}
            autoplay={{
              delay: 2500,
              disableOnInteraction: false,
            }}
            modules={[FreeMode, Autoplay]}
            className="w-full"
          >
            {proj.previewImages.map((img, idx) => (
              <SwiperSlide className="h-auto w-full" key={idx}>
                <img src={img} className="w-fit" alt={`${proj.name} preview`} />
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      )}
    </div>
  );
};

export default Project;

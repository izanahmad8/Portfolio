import { Typewriter } from "react-simple-typewriter";
import { name, skills, title } from "../profileconfig.jsx";

const ProfileSidebar = (props) => {
  const isDarkMode = props.isDarkMode;
  return (
    <div className="flex flex-col justify-center h-full  p-4">
      <h2
        className={`text-2xl lg:text-3xl font-light ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        I'm
      </h2>
      <h1
        className={`text-4xl  font-bold ${
          isDarkMode ? "text-white" : "text-black"
        }`}
      >
        {name}
      </h1>
      <p className="text-xl lg:text-2xl font-light mb-4">{title}</p>
      <p className="text-xl lg:text-2xl">
        <Typewriter
          words={skills}
          loop={Infinity}
          cursor
          cursorStyle="_"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </p>
    </div>
  );
};

export default ProfileSidebar;

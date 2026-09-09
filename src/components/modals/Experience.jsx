const Experience = ({ exp, index, isDarkMode }) => {
  return (
    <div key={index} className="relative">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-2">
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="text-xl sm:text-2xl font-semibold">
              {exp.role}
            </span>
            {exp.current && (
              <span
                className={`text-xs font-bold px-2 py-1 rounded-full ${
                  isDarkMode
                    ? "bg-teal-500 text-gray-900"
                    : "bg-blue-600 text-white"
                }`}
              >
                Present
              </span>
            )}
          </div>
          <div className="text-lg font-light">
            {exp.company}
            {exp.client && (
              <span className="italic"> (Client: {exp.client})</span>
            )}
          </div>
        </div>
        <div className="text-sm sm:text-base sm:text-right shrink-0">
          <div>{exp.duration}</div>
          <div className="italic">{exp.location}</div>
        </div>
      </div>

      <p className="italic mt-2 mb-2">{exp.briefDesc}</p>

      <h3
        className={`font-bold mt-3 ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Highlights:
      </h3>
      <ul className="list-disc list-inside mb-2">
        {exp.desc.map((item, idx) => (
          <li key={idx}>{item}</li>
        ))}
      </ul>

      <h3
        className={`font-bold ${
          isDarkMode ? "text-gray-100" : "text-gray-900"
        }`}
      >
        Technologies:
      </h3>
      <div className="mt-1 flex flex-wrap gap-2">
        {exp.tech.map((t, idx) => (
          <span
            key={idx}
            className={`text-sm px-2 py-1 rounded-md ${
              isDarkMode ? "bg-gray-700 text-gray-100" : "bg-gray-200 text-gray-800"
            }`}
          >
            {t}
          </span>
        ))}
      </div>
    </div>
  );
};

export default Experience;

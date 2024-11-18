import React, { useState, useEffect } from "react";
import "../styles/DarkMode.css";

const DarkMode: React.FC = () => {
  /*State til at holde styr på dark mode tilstand*/
  const [isDarkMode, setIsDarkMode] = useState<boolean>(false);

  /* Hent tidligere tema fra localStorage */
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  /* Funktion til at skifte tema farven */
  const toggleDarkMode = (): void => {
    setIsDarkMode((prevMode) => {
      const newMode = !prevMode;

      if (newMode) {
        document.body.classList.add("dark-mode");
        localStorage.setItem("theme", "dark");
      } else {
        document.body.classList.remove("dark-mode");
        localStorage.setItem("theme", "light");
      }

      return newMode;
    });
  };

  return (
    <button
      onClick={toggleDarkMode}
      className="dark-mode-toggle"
      aria-label="Skift mellem mørk og lys tilstand"
    >
      <span className="slider">
        <img src="/src/assets/svg/moon.svg" alt="Piktogram af måne" id="moon" />
        <img src="/src/assets/svg/sun.svg" alt="Piktogram af sol" id="sun" />
      </span>
    </button>
  );
};

export default DarkMode;

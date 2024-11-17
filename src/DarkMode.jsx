import React, { useState, useEffect } from "react";
import "./DarkMode.css";

const DarkMode = () => {
  const [isDarkMode, setIsDarkMode] = useState(false);

  /*Hent tidligere tema fra localStorage*/
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme === "dark") {
      setIsDarkMode(true);
      document.body.classList.add("dark-mode");
    }
  }, []);

  /*Funktion til at skifte tema farven*/
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);

    if (!isDarkMode) {
      document.body.classList.add("dark-mode");
      localStorage.setItem("theme", "dark");
    } else {
      document.body.classList.remove("dark-mode");
      localStorage.setItem("theme", "light");
    }
  };

  return (
    <button 
    onClick={toggleDarkMode} 
    className="dark-mode-toggle"
    aria-label="Skift mellem mørk og lys tilstand"
    >
      <span class="slider"><img src="svg/moon.svg" alt="Piktogram af måne" id="moon"/><img src="svg/sun.svg" alt="Piktogram af sol" id="sun"/></span>
    </button>
  );
};

export default DarkMode;

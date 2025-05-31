import LogoCountry from "../assets/country.jpg";
import { useState, useRef, useEffect } from "react";

function Header({ onLanguageChange }) {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [currentLanguage, setCurrentLanguage] = useState("Русский");
  const languageRef = useRef(null);

  const languages = [
    { name: "Русский", code: "ru" },
    { name: "English", code: "en" },
  ];

  const toggleLanguageMenu = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const handleLanguageSelect = (language) => {
    setCurrentLanguage(language.name);
    setIsLanguageOpen(false);
    if (onLanguageChange) {
      onLanguageChange(language.code);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="header">
      <div className="navigation">
        <div className="logo-container">
          <img src={LogoCountry} alt="website icon" className="logo-image" />
          <p className="logo-text">Country Lib</p>
        </div>

        <input
          className="search-input"
          type="text"
          placeholder={
            currentLanguage === "Русский"
              ? "Введите название страны..."
              : "Enter country name..."
          }
        />

        <div className="language-selector" ref={languageRef}>
          <button
            className="language-button"
            onClick={toggleLanguageMenu}
            aria-label="Select language"
          >
            {currentLanguage}
            <span className={`arrow ${isLanguageOpen ? "open" : ""}`}>▼</span>
          </button>

          {isLanguageOpen && (
            <div className="language-dropdown">
              <ul>
                {languages.map((language) => (
                  <li
                    key={language.code}
                    onClick={() => handleLanguageSelect(language)}
                    className={
                      currentLanguage === language.name ? "active" : ""
                    }
                  >
                    {language.name}
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Header;

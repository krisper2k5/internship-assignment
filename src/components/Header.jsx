import { useState, useRef, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setSearchTerm, setLanguage } from "../features/countrySlice";
import { useTranslation } from "react-i18next";
import LogoCountry from "../assets/country.jpg";
import { Link } from "react-router";

function Header() {
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const languageRef = useRef(null);
  const dispatch = useDispatch();
  const { t, i18n } = useTranslation();
  const currentLanguage = useSelector((state) => state.country.language);

  const languages = [
    { name: "Русский", code: "ru" },
    { name: "English", code: "en" },
  ];

  const toggleLanguageMenu = () => {
    setIsLanguageOpen(!isLanguageOpen);
  };

  const handleLanguageSelect = (language) => {
    i18n
      .changeLanguage(language.code)
      .then(() => {
        dispatch(setLanguage(language.code));
        localStorage.setItem("language", language.code);
        setIsLanguageOpen(false);
      })
      .catch(console.error);
  };

  const handleSearch = (e) => {
    dispatch(setSearchTerm(e.target.value));
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (languageRef.current && !languageRef.current.contains(event.target)) {
        setIsLanguageOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <header className="header">
      <div className="header-container">
        <div className="logo-search-container">
          <Link to={"/"} className="logo-container">
            <img src={LogoCountry} alt="Logo" className="logo-image" />
            <h1 className="logo-text">Country Lib</h1>
          </Link>

          <input
            className="search-input"
            type="text"
            placeholder={t("searchPlaceholder")}
            onChange={handleSearch}
          />
        </div>

        <div className="language-selector" ref={languageRef}>
          <button
            className="language-button"
            onClick={toggleLanguageMenu}
            aria-expanded={isLanguageOpen}
          >
            <span className="current-language">
              {currentLanguage === "ru" ? "Русский" : "English"}
            </span>
            <span className={`arrow ${isLanguageOpen ? "open" : ""}`}>▼</span>
          </button>

          <div
            className={`language-dropdown ${isLanguageOpen ? "visible" : ""}`}
          >
            {languages.map((language) => (
              <button
                key={language.code}
                className={`language-option ${
                  currentLanguage === language.code ? "active" : ""
                }`}
                onClick={() => handleLanguageSelect(language)}
              >
                {language.name}
              </button>
            ))}
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;

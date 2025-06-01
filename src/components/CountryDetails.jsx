import { useParams, useNavigate, Link } from "react-router-dom";
import { useGetCountryByCodeQuery } from "../services/countryApi";
import { useTranslation } from "react-i18next";
import { useEffect } from "react";

function CountryDetail() {
  const { code } = useParams();
  const navigate = useNavigate();
  const {
    data: countryData,
    isLoading,
    isError,
    error,
  } = useGetCountryByCodeQuery(code || "", {
    skip: !code,
  });
  const { t, i18n } = useTranslation();

  console.log("Country code:", code);
  console.log("API response:", countryData);

  useEffect(() => {
    if (!code) {
      navigate("/", { replace: true });
    }
  }, [code, navigate]);

  if (!code) return null;

  if (isLoading) return <div className="loading">Loading...</div>;
  if (isError) {
    console.error("Error loading country:", error);
    return <div className="error">{t("errorLoadingCountry")}</div>;
  }
  if (!countryData || countryData.length === 0) {
    return <div className="error">{t("countryNotFound")}</div>;
  }

  const country = countryData[0];

  const displayName =
    i18n.language === "ru"
      ? country.translations?.rus?.official || country.name.official
      : country.name.official;

  const displayLanguages = country.languages
    ? Object.values(country.languages).join(", ")
    : "N/A";

  return (
    <div className="country-details">
      <button onClick={() => navigate(-1)} className="back-button">
        ← {t("backButton")}
      </button>

      <div className="detail-content">
        <img
          src={country.flags?.png}
          alt={`Flag of ${displayName}`}
          className="detail-flag"
        />

        <div className="detail-info">
          <h2>{displayName}</h2>

          <div className="detail-grid">
            <div>
              <p>
                <strong>{t("population")}:</strong>{" "}
                {country.population?.toLocaleString() || "N/A"}
              </p>
              <p>
                <strong>{t("region")}:</strong> {country.region || "N/A"}
              </p>
              <p>
                <strong>{t("capital")}:</strong> {country.capital?.[0] || "N/A"}
              </p>
            </div>
            <div>
              <p>
                <strong>{t("subregion")}:</strong> {country.subregion || "N/A"}
              </p>
              <p>
                <strong>{t("languages")}:</strong> {displayLanguages}
              </p>
            </div>
          </div>

          {country.borders && country.borders.length > 0 && (
            <div className="border-countries">
              <h3>{t("borderCountries")}:</h3>
              <div className="border-list">
                {country.borders.map((borderCode) => (
                  <button
                    key={borderCode}
                    onClick={() => navigate(`/country/${borderCode}`)}
                    className="border-button"
                  >
                    {borderCode}
                  </button>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default CountryDetail;

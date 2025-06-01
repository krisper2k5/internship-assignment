import { useSelector } from "react-redux";
import { useGetAllCountriesQuery } from "../services/countryApi";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

function CountryCards() {
  const { data: countries, isLoading, error } = useGetAllCountriesQuery();
  const { searchTerm, regionFilter, sortBy } = useSelector(
    (state) => state.country
  );
  const { t, i18n } = useTranslation();

  const filteredCountries = countries
    ?.filter((country) => {
      const matchesSearch = country.name.official
        .toLowerCase()
        .includes(searchTerm.toLowerCase());
      const matchesRegion = regionFilter
        ? country.region === regionFilter
        : true;
      return matchesSearch && matchesRegion;
    })
    .sort((a, b) => {
      if (sortBy === "population") return b.population - a.population;
      if (sortBy === "name")
        return a.name.official.localeCompare(b.name.official);
      return 0;
    });

  if (isLoading) return <div className="loading">Loading...</div>;
  if (error) return <div className="error">{t("errorLoadingCountries")}</div>;

  return (
    <div className="countries-container">
      {filteredCountries?.map((country) => (
        <Link
          to={`/country/${country.cca3 || country.cca2 || country.cioc}`}
          key={country.cca3}
          className="card-link"
        >
          <div className="card">
            <img
              src={country.flags.png}
              alt={`Flag of ${country.name.official}`}
              className="card-flag"
            />
            <p className="card-name">
              {i18n.language === "ru"
                ? country.translations?.rus?.official || country.name.official
                : country.name.official}
            </p>
          </div>
        </Link>
      ))}
    </div>
  );
}

export default CountryCards;

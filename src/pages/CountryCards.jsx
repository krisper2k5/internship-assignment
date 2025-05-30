import LogoCountry from "../assets/country.jpg";

function CountryCards() {
  return (
    <>
      <div className="header">
        <div className="navigation">
          <div className="logo-container">
            <img src={LogoCountry} alt="website icon" className="logo-image" />
            <p className="logo-text">Country Lib</p>
          </div>
          <input
            className="search-input"
            type="text"
            placeholder="Введите название страны..."
          />
        </div>
      </div>
    </>
  );
}

export default CountryCards;

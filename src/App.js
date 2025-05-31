import React from "react";

import "./scss/app.scss";
import CountryCards from "./pages/CountryCards";
import Header from "./pages/Header";

function App() {
  return (
    <>
      <Header />
      <CountryCards />
    </>
  );
}

export default App;

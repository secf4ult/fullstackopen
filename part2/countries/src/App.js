import React, { useState, useEffect } from "react";

import axios from "axios";

const Detail = ({ country }) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const [weather, setWeather] = useState();

  useEffect(() => {
    axios
      .get(
        `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`
      )
      .then((res) => setWeather(res.data));
  }, [country]);

  return (
    <div>
      <h1>{country.name}</h1>
      <p>capital {country.capital}</p>
      <p>population {country.population}</p>
      <h3>languages</h3>
      <ul>
        {country.languages.map((lang) => (
          <li key={lang.iso639_1}>{lang.name}</li>
        ))}
      </ul>
      <img src={country.flag} width="100" alt={`flag of ${country.name}`} />
      {weather ? (
        <div>
          <h2>Weather in {country.capital}</h2>
          <p>temperature: {weather.main.temp} Celcius</p>
          <p>
            wind: {weather.wind.speed} m/s direction {weather.wind.deg}
          </p>
        </div>
      ) : null}
    </div>
  );
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");
  const [selectedCountry, setSelectedCountry] = useState();
  let result;

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => setCountries(res.data));
  }, []);

  const showCountryDetail = (country) => (e) => {
    setSelectedCountry(country);
  };

  if (filter === "") {
    result = countries.map((country) => (
      <li key={country.alpha3Code}>{country.name}</li>
    ));
  } else {
    const filteredCountries = countries.filter((country) =>
      country.name.toLowerCase().includes(filter)
    );

    if (filteredCountries.length > 10) {
      result = <p>Too many matches, specify another filter</p>;
    } else if (filteredCountries.length === 1) {
      result = <Detail country={filteredCountries[0]} />;
    } else {
      result = filteredCountries.map((country) => (
        <li key={country.alpha3Code}>
          {country.name}
          <button onClick={showCountryDetail(country)}>show</button>
        </li>
      ));
    }
  }

  return (
    <div>
      <span>find countries&nbsp;</span>
      <input value={filter} onChange={(e) => setFilter(e.target.value)} />
      {result}
      {selectedCountry ? <Detail country={selectedCountry} /> : null}
    </div>
  );
};

export default App;

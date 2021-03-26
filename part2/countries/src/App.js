import React, { useState, useEffect } from "react";

import axios from "axios";

const Country = ({ country }) => {
  const apiKey = process.env.REACT_APP_WEATHER_API_KEY;
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${country.capital}&appid=${apiKey}&units=metric`;

  const [weather, setWeather] = useState();

  useEffect(() => {
    axios.get(url).then((res) => setWeather(res.data));
  }, []);

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

const Search = ({ value, setValue }) => {
  const onChange = (e) => setValue(e.target.value);
  return (
    <div>
      <span>find countries&nbsp;</span>
      <input value={value} onChange={onChange} />
    </div>
  );
};

const Countries = ({ countries, setValue }) => {
  if (countries.length === 0) return <div>no matches</div>;
  if (countries.length === 1) return <Country country={countries[0]} />;
  if (countries.length < 10)
    return (
      <div>
        {countries.map((c) => (
          <div key={c.alpha2Code}>
            {c.name}
            <button onClick={() => setValue(c.name)}>show</button>
          </div>
        ))}
      </div>
    );

  return <div>Too many matches, specify another filter</div>;
};

const App = () => {
  const [countries, setCountries] = useState([]);
  const [filter, setFilter] = useState("");

  useEffect(() => {
    axios
      .get("https://restcountries.eu/rest/v2/all")
      .then((res) => setCountries(res.data));
  }, []);

  const filteredCountries =
    filter.length === 0
      ? countries
      : countries.filter((c) =>
          c.name.toLowerCase().includes(filter.toLowerCase())
        );

  return (
    <div>
      <Search value={filter} setValue={setFilter} />
      <Countries countries={filteredCountries} setValue={setFilter} />
    </div>
  );
};

export default App;

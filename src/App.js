
import React, { useState } from "react";
import "./App.css";

const API_KEY = "fb89f2741feabd20aeed1fab9118e670"; // i Generated it from https://openweathermap.org/

function App() {
  const celsiusToFahrenheit = (celsius) => {
    return (celsius * 9/5) + 32;
  };
 // State to hold the user's input and fetched weather data
  const [query, setQuery] = useState("");
  const [weather, setWeather] = useState(null);

// Function to fetch weather data from OpenWeatherMap API 
  const fetchWeather = async () => {
    const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${query}&appid=${API_KEY}`);
    const data = await response.json();
    setWeather(data);
  };
  // This function is triggered when the user presses the "Enter" key 
  // in the search input field. It calls the fetchWeather
  const handleSearch = (e) => {
    if (e.key === "Enter") {
      fetchWeather();
    }
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Weather App</h1>
        <div className="search-container">
          <input
            type="text"
            className="search"
            placeholder="Search for a city..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyPress={handleSearch}
          />
        </div>
        {weather && (
          <div className="weather">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="weather-info">
              <div className="temperature">{Math.round(celsiusToFahrenheit(weather.main.temp - 273.15))}°F</div>
              <div className="description">{weather.weather[0].description}</div>
              <img
                className="weather-icon"
                src={`http://openweathermap.org/img/w/${weather.weather[0].icon}.png`}
                alt="Weather Icon"
              />
            </div>
          </div>
        )}
      </header>
    </div>
  );
}

export default App;

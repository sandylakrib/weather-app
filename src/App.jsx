import React, { useState } from "react";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState(""); // new state

  const API_KEY = "fa4e1e36ef8ad8e33413079de1576c0b";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    setError(""); // reset error
    setWeather(null);
    setForecast(null);

    try {
      const resWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      const dataWeather = await resWeather.json();

      if (dataWeather.cod !== 200) {
        setError("City not found. Please try again.");
        return;
      }

      setWeather(dataWeather);

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      const dataForecast = await resForecast.json();
      setForecast(dataForecast);
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="app">
      <h1>Umbrella or Shades?</h1>

      <form onSubmit={handleSearch}>
        <input
          type="text"
          placeholder="Enter city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="unit-toggle">
        <button onClick={toggleUnit}>
          Switch to {unit === "metric" ? "°F / mph" : "°C / m/s"}
        </button>
      </div>

      {/* Display error message */}
      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      {/* Current Weather */}
      <WeatherDisplay weather={weather} unit={unit} />

      {/* 5-Day Forecast */}
      <Forecast forecastData={forecast} unit={unit} />
    </div>
  );
}

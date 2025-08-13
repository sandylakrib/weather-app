import React, { useState } from "react";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";
import "./App.css";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric");

  const API_KEY = "fa4e1e36ef8ad8e33413079de1576c0b";

  const handleSearch = async (e) => {
    e.preventDefault();
    if (!city) return;

    try {
      // Fetch current weather
      const resWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      const dataWeather = await resWeather.json();
      setWeather(dataWeather);

      // Fetch 5-day forecast
      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
      );
      const dataForecast = await resForecast.json();
      setForecast(dataForecast); // pass full response
    } catch (err) {
      console.error(err);
    }
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="app">
      <h1>Weather App</h1>

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

      {/* Current Weather */}
      <WeatherDisplay weather={weather} unit={unit} />

      {/* 5-Day Forecast */}
      <Forecast forecastData={forecast} unit={unit} />
    </div>
  );
}

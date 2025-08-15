import React, { useState } from "react";
import WeatherDisplay from "./components/WeatherDisplay";
import Forecast from "./components/Forecast";
import "./App.css";


export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [forecast, setForecast] = useState(null);
  const [unit, setUnit] = useState("metric");
  const [error, setError] = useState("");

  const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;

  const fetchWeatherData = async (cityName) => {
    setError("");
    setWeather(null);
    setForecast(null);

    try {
      const resWeather = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const dataWeather = await resWeather.json();
      if (dataWeather.cod !== 200) {
        setError("City not found. Please try again.");
        return;
      }
      setWeather(dataWeather);

      const resForecast = await fetch(
        `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=${API_KEY}`
      );
      const dataForecast = await resForecast.json();

      const now = new Date();
      const filteredList = dataForecast.list.filter(item => {
        const itemDate = new Date(item.dt_txt);
        return itemDate >= now;
      });

      const dailyForecast = [];
      const seenDates = new Set();

      filteredList.forEach(item => {
        const date = item.dt_txt.split(" ")[0];
        const hour = item.dt_txt.split(" ")[1];

        if (!seenDates.has(date) && hour === "12:00:00") {
          dailyForecast.push(item);
          seenDates.add(date);
        }
      });

      setForecast({ ...dataForecast, list: dailyForecast.slice(0, 5) });
    } catch (err) {
      setError("An error occurred. Please try again.");
      console.error(err);
    }
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (!city) return;
    fetchWeatherData(city);
  };

  const toggleUnit = () => {
    setUnit(unit === "metric" ? "imperial" : "metric");
  };

  return (
    <div className="app">
       <h1>Umbrella or shades?</h1>
      <h1> ☔  😎 </h1>

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

      {error && <p style={{ color: "red", marginTop: 10 }}>{error}</p>}

      <WeatherDisplay weather={weather} unit={unit} />
      <Forecast forecastData={forecast} unit={unit} />
    </div>
  );
}

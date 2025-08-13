import React from "react";
import "./WeatherDisplay.css";

export default function WeatherDisplay({ weather, unit }) {
  if (!weather) return null;

  const tempUnit = unit === "metric" ? "°C" : "°F";
  const speedUnit = unit === "metric" ? "m/s" : "mph";

  const convertTemp = (temp) => (unit === "metric" ? temp : temp * 9/5 + 32);
  const convertSpeed = (speed) => (unit === "metric" ? speed : speed * 2.23694);

  const iconUrl = `https://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`;

  return (
    <div className="weather-display">
      <h2>{weather.name}, {weather.sys.country}</h2>
      <div className="weather-display-main">
        <img src={iconUrl} alt={weather.weather[0].description} />
        <div>
          <p className="weather-temp">{Math.round(convertTemp(weather.main.temp))} {tempUnit}</p>
          <p className="weather-description">{weather.weather[0].description}</p>
        </div>
      </div>
      <p>Humidity: {weather.main.humidity}%</p>
      <p>Wind Speed: {Math.round(convertSpeed(weather.wind.speed))} {speedUnit}</p>
    </div>
  );
}

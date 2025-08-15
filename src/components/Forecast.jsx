import React, { useState } from "react";
import "./Forecast.css";

export default function Forecast({ forecastData, unit }) {
  const [selectedDay, setSelectedDay] = useState(null);

  if (!forecastData) return null;

  const handleClick = (item) => {
    setSelectedDay(selectedDay?.dt === item.dt ? null : item);
  };

  return (
    <div className="forecast-wrapper">
      <div className="forecast-grid">
        {forecastData.list.map((item) => {
          const date = new Date(item.dt_txt).toLocaleDateString("en-US", {
            weekday: "short",
            day: "numeric",
            month: "short",
          });

          const isSelected = selectedDay?.dt === item.dt;

          return (
            <div
              key={item.dt}
              className={`forecast-card ${isSelected ? "selected" : ""}`}
              onClick={() => handleClick(item)}
            >
              <p>{date}</p>
              <img
                src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
                alt={item.weather[0].description}
              />
              <p>{Math.round(item.main.temp)}°{unit === "metric" ? "C" : "F"}</p>

              {isSelected && (
                <div className="forecast-details">
                  <p>Min : {Math.round(item.main.temp_min)}° / Max : {Math.round(item.main.temp_max)}°</p>
                  <p>Humidité : {item.main.humidity}%</p>
                  <p>Conditions : {item.weather[0].description}</p>
                  <p>Vent : {item.wind.speed} {unit === "metric" ? "m/s" : "mph"}</p>
                </div>
              )}
            </div>
          );
        })}
      </div>
    </div>
  );
}

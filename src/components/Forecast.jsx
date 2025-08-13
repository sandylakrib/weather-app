import React from "react";
import "./Forecast.css";

function groupByDate(list) {
  const days = {};
  list.forEach((item) => {
    const date = item.dt_txt.split(" ")[0];
    if (!days[date]) days[date] = [];
    days[date].push(item);
  });
  return Object.values(days);
}

function summarizeDay(dayData) {
  const temps = dayData.map((d) => d.main.temp);
  const maxTemp = Math.max(...temps);
  const minTemp = Math.min(...temps);
  const midday = dayData.find((d) => d.dt_txt.includes("12:00:00")) || dayData[0];
  const icon = midday.weather[0].icon;
  const description = midday.weather[0].description;

  return { maxTemp, minTemp, icon, description };
}

// Conversion helpers
const convertTemp = (temp, unit) => (unit === "metric" ? temp : temp * 9 / 5 + 32);

export default function Forecast({ forecastData, unit }) {
  if (!forecastData) return null;

  const days = groupByDate(forecastData.list);
  const tempUnit = unit === "metric" ? "°C" : "°F";

  return (
    <div className="forecast-wrapper">
      <h3>5-Day Forecast</h3>
      <div className="forecast-grid">
        {days.map((dayData) => {
          const dateStr = dayData[0].dt_txt.split(" ")[0];
          const summary = summarizeDay(dayData);
          const iconUrl = `https://openweathermap.org/img/wn/${summary.icon}@2x.png`;

          return (
            <div className="forecast-card" key={dateStr}>
              <p className="forecast-date">
                {new Date(dateStr).toLocaleDateString(undefined, {
                  weekday: "short",
                  month: "short",
                  day: "numeric",
                })}
              </p>
              <img src={iconUrl} alt={summary.description} />
              <p className="forecast-description">{summary.description}</p>
              <p>
                {Math.round(convertTemp(summary.maxTemp, unit))}° /{" "}
                {Math.round(convertTemp(summary.minTemp, unit))}° {tempUnit}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}

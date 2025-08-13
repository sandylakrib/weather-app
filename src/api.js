const API_KEY = import.meta.env.VITE_OPENWEATHER_API_KEY;
const BASE_URL = "https://api.openweathermap.org/data/2.5";

export async function fetchWeather(city, unit = "metric") {
  const response = await fetch(
    `${BASE_URL}/weather?q=${city}&units=${unit}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("City not found");
  }

  return response.json();
}
export async function fetchForecast(city, unit = "metric") {
    const response = await fetch(
      `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
    );
  
    if (!response.ok) {
      throw new Error("Forecast not found");
    }
  
    return response.json();
  }
  
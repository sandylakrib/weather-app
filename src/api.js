export async function fetchForecast(city, unit = "metric") {
  const response = await fetch(
    `https://api.openweathermap.org/data/2.5/forecast?q=${city}&units=${unit}&appid=${API_KEY}`
  );

  if (!response.ok) {
    throw new Error("Forecast not found");
  }

  const data = await response.json();

  const now = new Date();


  const filteredList = data.list.filter(item => {
    const itemDate = new Date(item.dt_txt);
    return itemDate >= now;
  });


  data.list = filteredList;

  return data;
}

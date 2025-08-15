# Umbrella or Shades? 🌦️

A dynamic Weather Forecasting App built with **React** and the **OpenWeatherMap API**. Users can search for a city to view current weather and a 5-day forecast with interactive cards.

---

## Features

- Search for any city worldwide.
- Display **current weather**: temperature, humidity, wind speed, and conditions.
- **5-day forecast** with interactive cards:
  - Click a card to expand and view detailed info for that day.
- **Celsius / Fahrenheit toggle** for all temperatures.
- Responsive design for desktop, tablet, and mobile.
- Smooth animations and transitions.
- Proper error handling for invalid cities or network issues.

---

## Getting Started

### Prerequisites

- Node.js >= 14  
- npm

### Installation

1. Clone the repository:  
   ```bash
   git clone https://github.com/sandylakrib/weather-app.git
   ```

2. Go to the project folder 
  ```bash
cd weather-app 
```

3. Install dependences 
  ```bash
npm install 
```

4. Create a .env file in the root directory and add your OpenWeatherMap API key:
VITE_WEATHER_API_KEY=your_api_key_here


5. Start the server:
  ```bash
npm run dev
```
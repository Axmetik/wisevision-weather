import React, { useState, useEffect } from "react";
import Weather from "./components/Weather";
import Input from "./components/Input";
import { convertToFlag } from "./utils/convertToFlag";

function App() {
  const [isLoading, setIsLoading] = useState(false);
  const [location, setLocation] = useState(""); //localStorage.getItem("location")
  const [displayLocation, setDisplayLocation] = useState("");
  const [weather, setWeather] = useState({});

  useEffect(() => {
    async function fetchWeather() {
      if (location.length < 2) {
        setWeather({});
        return;
      }

      try {
        setIsLoading(true);

        const geoRes = await fetch(
          `https://geocoding-api.open-meteo.com/v1/search?name=${location}`
        );
        const geoData = await geoRes.json();
        console.log(geoData);

        if (!geoData.results) throw new Error("Location not found");

        const { latitude, longitude, timezone, name, country_code } = geoData.results[0];
        setDisplayLocation(`${name} ${convertToFlag(country_code)}`);

        const weatherRes = await fetch(
          `https://api.open-meteo.com/v1/forecast?latitude=${latitude}&longitude=${longitude}&timezone=${timezone}&daily=weathercode,temperature_2m_max,temperature_2m_min`
        );
        const weatherData = await weatherRes.json();
        setWeather(weatherData.daily);
      } catch (err) {
        console.log(err);
      } finally {
        setIsLoading(false);
      }
    }

    if (location) {
      fetchWeather();
      //localStorage.setItem("location", location);
    }
  }, [location]);

  return (
    <div className="app">
      <h1>Wisevison Weather</h1>
      <Input location={location} onChangeLocation={(e) => setLocation(e.target.value)} />

      {weather.weathercode && (
        <Weather weather={weather} location={displayLocation} isLoading={isLoading} />
      )}
    </div>
  );
}

export default App;

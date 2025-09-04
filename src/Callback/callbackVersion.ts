import "dotenv/config";
import { fetchWeatherByCity } from "./weather";

const inputcity = process.argv.slice(2).join(" ") || "Pretoria";

fetchWeatherByCity(inputcity, (err, weatherInfo) => {
  if (err) return console.error("Weather Error:", err.message);

  console.log("---WEATHER REPORT---:");
  console.log("");
  console.log(weatherInfo);
});

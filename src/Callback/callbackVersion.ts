import "dotenv/config";
import { fetchWeatherByCity } from "./weather";
import { fetchNews } from "./news";

const inputcity = process.argv.slice(2).join(" ") || "Pretoria";

console.log("Fetching data...");

fetchWeatherByCity(inputcity, (err, weatherInfo) => {
  if (err) return console.error("Application Error:", err.message);

  console.log(`
--- WEATHER REPORT ---

${weatherInfo}
`);

  fetchNews((err, newsInfo) => {
    if (err) return console.error("Application Error", err.message);

   console.log(`
--- LATEST NEWS HEADLINES ---

${newsInfo}
`);

  });
});

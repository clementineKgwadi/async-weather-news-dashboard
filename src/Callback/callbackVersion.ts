import "dotenv/config";
import { fetchWeatherByCity } from "./weather";
import { fetchNews } from "./news";

const inputcity = process.argv.slice(2).join(" ") || "Pretoria";

fetchWeatherByCity(inputcity, (err, weatherInfo) => {
  if (err) return console.error("Weather Error:", err.message);

  console.log(`

--- WEATHER REPORT ---

${weatherInfo}
`);

  fetchNews((err, newsInfo) => {
    if (err) return console.error("News Error", err.message);

   console.log(`
--- LATEST NEWS HEADLINES ---

${newsInfo}
`);

  });
});

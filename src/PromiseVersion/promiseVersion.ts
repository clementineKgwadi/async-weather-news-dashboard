import "dotenv/config";
import { fetchWeatherByCity } from "./weather";
import { fetchNews } from "./news";

const city = process.argv.slice(2).join(" ") || "Pretoria";

fetchWeatherByCity(city)
  .then((weather) => {
    console.log("---WEATHER REPORT---");
    console.log(weather);
    return fetchNews(); 
  })
  .then((news) => {
    console.log("\n---NEWS REPORT---");
    console.log(news);
  })
  .catch((err) => console.error("Error:", err));
import "dotenv/config";
import { fetchWeatherByCity } from "./weather";
import { fetchNews } from "./news";

const city = process.argv.slice(2).join(" ") || "Pretoria";

console.log("Fetching data...", "\n");

fetchWeatherByCity(city)
  .then((weather) => {
    console.log("---WEATHER REPORT---", "\n");
    console.log(weather, "\n");

    return fetchNews(); 
  })
  .then((news) => {
    console.log("---NEWS REPORT---", "\n", news);
  })
  .catch((err) => console.error("Error:", err));
  
  Promise.all([fetchWeatherByCity(city), fetchNews()]).then(([weather, news]) =>{
    console.log("\n---ALL RESULTS USING Promise.all()---\n");
    console.log(weather, "\n");
    console.log(news, "\n")
  }).catch((err) => console.error("Error in Promise.all:", err.message));

  Promise.race([fetchWeatherByCity(city), fetchNews()]).then((raceResult) =>{
   console.log("---RACE RESULT USING Promise.race()---", "\n");
   console.log(raceResult, "\n")
  }).catch((err) => console.error("Error in Promise.race:", err.message));
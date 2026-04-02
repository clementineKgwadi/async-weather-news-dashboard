import "dotenv/config";
import { fetchWeatherByCity } from "../Async_await/weather";
import { fetchNews } from "../Async_await/news";

const city = process.argv.slice(2).join(" ") || "Pretoria";

async function display_Weather_News(city: string) {
  try {
  
    console.log("Fetching data...", "\n");

    const weather = await fetchWeatherByCity(city);
    console.log("---WEATHER REPORT---\n");
    console.log(weather, "\n");

    const news = await fetchNews();
    console.log("---NEWS REPORT---\n");
    console.log(news, "\n");

    const [allWeather, allNews] = await Promise.all([
      fetchWeatherByCity(city),
      fetchNews(),
    ]);

    console.log("---ALL RESULTS USING Promise.all()---\n");
    console.log(allWeather, "\n");
    console.log(allNews, "\n");

    const raceResult = await Promise.race([
      fetchWeatherByCity(city),
      fetchNews(),
    ]);
    console.log("---RACE RESULT USING Promise.race()---\n");
    console.log(raceResult, "\n");

  } catch (err) {
    console.error("Application error.", (err as Error).message);
  }
}

display_Weather_News(city);

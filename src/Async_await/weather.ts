import https from "https";

const apiKey = process.env.OPENWEATHER_API_KEY;

if (!apiKey) {
  console.error("Error: set OPENWEATHER_API_KEY before running.");
  process.exit(1);
}

function fetchData(url: string): Promise<any> {
  return new Promise((resolve, reject) => {
    https
      .get(url, (res) => {
        let data = "";

        res.on("data", (chunk) => (data += chunk));

        res.on("end", () => {
          try {
            const parsed = JSON.parse(data);
            resolve(parsed);
          } catch (err) {
            reject(err); 
          }
        });
      })
      .on("error", (err) => reject(err)); 
  });
}

export async function fetchWeatherByCity(city: string): Promise<string> {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  try {
    const data = await fetchData(url);

    const cityName = data.name;
    const country = data.sys?.country || "";
    const description = data.weather[0]?.description || "No description";
    const temp = Math.round(data.main?.temp);
    const feelsLike = Math.round(data.main?.feels_like);
    const humidity = data.main?.humidity || 0;
    const windSpeed = data.wind?.speed || 0;

    return `City: ${cityName}, ${country}
          Temp: ${temp}°C, ${description}
          Feels like: ${feelsLike}°C
          Humidity: ${humidity}%
          Wind speed: ${windSpeed} km/h`;
  } catch (err: any) {
    throw new Error("Failed to fetch weather: " + (err?.message || err));
  }
}

import https from "https";

const apiKey = process.env.OPENWEATHER_API_KEY;

if (!apiKey) {
  console.error("Error: set OPENWEATHER_API_KEY before running.");
  process.exit(1);
}

function fetchData(
  url: string,
  callback: (err: Error | null, parsed?: any) => void
): void {
  https
    .get(url, (res) => {
      let data = "";
      res.on("data", (chunk) => (data += chunk));
      res.on("end", () => {

        try {
          const parsed = JSON.parse(data);

          if(parsed.cod && parsed.cod !== 200){
            callback(new Error(parsed.message || "API retruned an error"))
          } 
          else{
          callback(null, parsed);
          }
        } catch {
          callback(new Error("Invalid JSON response"));
        }
      });
    })
    .on("error", (err) => callback(new Error("Network error" + err.message)));
}

export function fetchWeatherByCity(
  city: string,
  callback: (err: Error | null, weatherInfo?: string) => void
): void {
  const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;

  fetchData(url, (err, data) => {
    if (err) return callback(err);

    const cityName = data.name;
    const country = data.sys?.country || "";
    const description = data.weather[0]?.description || "No description";
    const temp =Math.round( data.main?.temp);
    const feelsLike = Math.round(data.main?.feels_like);
    const humidity = data.main?.humidity || 0;
    const windSpeed = data.wind?.speed || 0;   

    const weatherReport = `City: ${cityName}, ${country}
     Temp: ${temp}°C, ${description}
     Feels like: ${feelsLike}°C
     Humidity: ${humidity}%, wind-speed: ${windSpeed} km/h`;

    callback(null, weatherReport);
  });
}



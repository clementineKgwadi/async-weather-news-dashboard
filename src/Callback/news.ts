import https from "https";

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
          callback(null, parsed);
          
        } catch (err) {
          callback(err as Error);
        }
      });
    })
    .on("error", (err) => callback(err));
}

export function fetchNews(
  callback: (err: Error | null, newsInfo?: string) => void
): void {
  const url = "https://dummyjson.com/posts";

  fetchData(url, (err, data) => {

    if (err) return callback(err);

    const headlines = data.posts
      .slice(0, 3)
      .map((post: any, index: number) => `${index + 1}. ${post.title}`)
      .join("\n");

    const newsReport = headlines;

    callback(null, newsReport);
  });
}

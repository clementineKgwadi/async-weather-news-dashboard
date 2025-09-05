import https from "https";

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
          } 
          catch (err) {
            reject(err);
          }
        });
      })
      .on("error", (err) => reject(err)); 
  });
}

export async function fetchNews(): Promise<string> {
  const url = "https://dummyjson.com/posts";

  try {
    const data = await fetchData(url);

    const headlines = data.posts
      .slice(0, 4)
      .map((post: { title: string }, index: number) => `${index + 1}. ${post.title}`)
      .join("\n");

    return headlines;
  } catch (err) {
    throw new Error("Failed to fetch news: " + (err as any).message);
  }
}

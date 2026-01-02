export function getKey() {
  const hotpepperApiKey = import.meta.env.VITE_HOTPEPPER_API_KEY;
  console.log("Hot Pepper API Key:", hotpepperApiKey);
  const hotpepperApiUrl = import.meta.env.VITE_HOTPEPPER_API_URL;
  console.log("Hot Pepper API URL:", hotpepperApiUrl);
  console.log(
    `http://webservice.recruit.co.jp/hotpepper/gourmet/v1/?key=${hotpepperApiKey}&lat=34.67&lng=135.52&range=5&order=4`
  );
}

async function fetchGourmet() {
  const hotpepperApiKey = import.meta.env.VITE_HOTPEPPER_API_KEY;

  const hotpepperApiUrl = import.meta.env.VITE_HOTPEPPER_API_URL;
  const params = new URLSearchParams({
    key: String(hotpepperApiKey),
    format: "json",
    large_area: "Z011",
    count: "5",
  });
  const url = `/hotpepper/hotpepper/gourmet/v1/?${params.toString()}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);
  } catch (error) {
    console.error("API取得エラー", error);
  }
}
fetchGourmet();

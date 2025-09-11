import fetch from "node-fetch";

export async function handler(event, context) {
  const { lat, lng } = event.queryStringParameters || {};

  if (!lat || !lng) {
    return {
      statusCode: 400,
      body: JSON.stringify({ error: "lat and lng are required" }),
    };
  }

  const url = `https://naveropenapi.apigw.ntruss.com/map-place/v1/search?query=약국&coordinate=${lng},${lat}&radius=1000&sort=distance`;

  try {
    const response = await fetch(url, {
      headers: {
        "X-NCP-APIGW-API-KEY-ID": "1uzxn48abj",
        "X-NCP-APIGW-API-KEY": "mIJ9XvCfQu9c0yXOArDMWvd9NQ9hNI9X0BXPzUfo",
      },
    });

    const data = await response.json();

    return {
      statusCode: 200,
      body: JSON.stringify(data),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
}

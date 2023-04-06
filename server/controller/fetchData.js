require('dotenv').config();
const request = require('request');

const { DATA_API_KEY } = process.env;
const url = `http://openapi.seoul.go.kr:8088/${DATA_API_KEY}/xml/citydata/1/5/공덕`;

async function fetchData() {
  const res = await fetch(
    `http://openapi.seoul.go.kr:8088/5478417475796a65353661524a7961/xml/citydata/1/5/광화문·덕수궁`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
  const rawData = await res.text();
  console.log();
}

fetchData();

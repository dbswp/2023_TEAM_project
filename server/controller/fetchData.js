const request = require('request');
const { parseString } = require('xml2js');
require('dotenv').config();

const { DATA_API_KEY } = process.env;
const url = `http://openapi.seoul.go.kr:8088/${DATA_API_KEY}/xml/citydata/1/5/공덕`;

async function fetchData(req, res) {
  const resolve = await fetch(
    `http://openapi.seoul.go.kr:8088/5478417475796a65353661524a7961/xml/citydata/1/5/서울역`,
    {
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml',
      },
    }
  );
  const rawData = await resolve.text();
  parseString(rawData, (err, result) => {
    if (err) {
      res.status(500).send(err);
    } else {
      // res.send(result);
      console.log(
        //KT의 실시간 인구밀도 데이터
        result['SeoulRtd.citydata']['CITYDATA'][0].LIVE_PPLTN_STTS[0]
          .LIVE_PPLTN_STTS[0]

        //당일 전체적인 날씨
        // result['SeoulRtd.citydata']['CITYDATA'][0].WEATHER_STTS[0]
        //   .WEATHER_STTS[0],

        //당일 시간별 날씨
        // result['SeoulRtd.citydata']['CITYDATA'][0].WEATHER_STTS[0]
        //   .WEATHER_STTS[0].FCST24HOURS[0].FCST24HOURS
      );
    }
  });
}

fetchData();

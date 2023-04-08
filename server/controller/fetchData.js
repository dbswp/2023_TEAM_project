const { parseString } = require("xml2js");

const { DATA_API_KEY } = process.env;

async function fetchData(END_POINT) {
  const AREA_END_POINT = `http://openapi.seoul.go.kr:8088/${DATA_API_KEY}/xml/citydata/1/5/${END_POINT}`;

  let model = {
    area_name: "",
    live_data: {},
    live_weather: {},
  };

  const resolve = await fetch(AREA_END_POINT, {
    method: "GET",
    headers: {
      "Content-Type": "application/xml",
    },
  });

  const rawData = await resolve.text();

  parseString(rawData, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      //KT의 실시간 인구밀도 데이터
      let liveData =
        result["SeoulRtd.citydata"]["CITYDATA"][0].LIVE_PPLTN_STTS[0]
          .LIVE_PPLTN_STTS[0];
      //지역 이름
      let areaName = result["SeoulRtd.citydata"]["CITYDATA"][0].AREA_NM;
      //당일 전체적인 날씨
      let dayWeather =
        result["SeoulRtd.citydata"]["CITYDATA"][0].WEATHER_STTS[0]
          .WEATHER_STTS[0].PCP_MSG[0];
      //당일 시간별 날씨
      let timeWeather =
        result["SeoulRtd.citydata"]["CITYDATA"][0].WEATHER_STTS[0]
          .WEATHER_STTS[0].FCST24HOURS[0].FCST24HOURS;

      model = {
        area_name: areaName[0],
        live_data: liveData,
        live_weather: dayWeather,
      };
    }
  });
  return model;
}

module.exports = fetchData;

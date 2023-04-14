const { parseString } = require("xml2js");
const { DATA_API_KEY } = process.env;

async function fetchData(req, res) {
  const END_POINT = req.body.point.trim();
  console.log(END_POINT);
  try {
    const AREA_END_POINT = `http://openapi.seoul.go.kr:8088/${DATA_API_KEY}/xml/citydata/1/5/${END_POINT}`;

    let model = {
      area_name: "",
      live_data: {},
    };

    let weatherModel = {
      temperature: "",
      sen_temperature: "",
      min_temperature: "",
      max_temperature: "",
      pcp_msg: "",
      air_idx: "",
      fcst_24hours: {},
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
            .WEATHER_STTS[0];
        //당일 시간별 날씨
        let timeWeather =
          result["SeoulRtd.citydata"]["CITYDATA"][0].WEATHER_STTS[0]
            .WEATHER_STTS[0].FCST24HOURS[0];

        model = {
          area_name: areaName[0],
          live_data: liveData,
        };

        weatherModel = {
          temperature: dayWeather.TEMP[0],
          sen_temperature: dayWeather.SENSIBLE_TEMP[0],
          min_temperature: dayWeather.MIN_TEMP[0],
          max_temperature: dayWeather.MAX_TEMP[0],
          pcp_msg: dayWeather.PCP_MSG[0],
          air_idx: dayWeather.AIR_IDX[0],
          fcst_24hours: timeWeather,
        };
      }
    });

    res.status(200).json({ model, weatherModel });
  } catch (err) {
    console.error("something went wrong in fetchingData file");
    res.status(500);
  }
}
module.exports = { fetchData };

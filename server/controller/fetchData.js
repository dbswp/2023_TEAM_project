const fs = require("fs");
const path = require("path");
const { parseString } = require("xml2js");
const { DATA_API_KEY } = process.env;

const FILE_NAME = "coordinates.csv";
const csvPath = path.join(__dirname, "../../client/public", "data", FILE_NAME);

async function fetchData(req, res) {
  const csv = fs.readFileSync(csvPath, "utf-8");
  const csvData = csv.split("\n"); //맥 사용자의 경우는 \n으로 바꿀것
  const locationData = csvData.map((el) => el.split(","));
  let newLocation = [];

  for (let i = 1; i < locationData.length - 1; i += 1) {
    newLocation.push(locationData[i]);
  }

  //프론트에서 요청body에 담아 보낸 지역엔드포인트를 변수에 저장
  //마커 클릭으로 받아오는 지역엔드포인트는 문자 앞에 공백이 하나 있기때문에 trim()을 통해 공백제거
  const END_POINT = req.body.point.trim();
  console.log(END_POINT);
  try {
    const AREA_END_POINT = `http://openapi.seoul.go.kr:8088/${DATA_API_KEY}/xml/citydata/1/5/${END_POINT}`;

    //프론트에서 필요한 데이터만 추린 모델
    //여기서 정의한 이유는 parseString메서드 밖으로 쉽게 꺼내주기 위해서이다.
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

    //위에서 정의한 URI와 함께 서울시 데이터 광장에 xml데이터 요청 전송
    const resolve = await fetch(AREA_END_POINT, {
      method: "GET",
      headers: {
        "Content-Type": "application/xml",
      },
    });

    //모듈 xml2js 에서 꺼내온 parseString 메서드를 이용하여 xml데이터를 json형식으로 바꾸어주는 과정
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

        //프론트에서 필요한 데이터만 뿌려주기
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

    res.status(200).json({ model, weatherModel, newLocation });
  } catch (err) {
    console.error("something went wrong in fetchingData file");
    res.status(500);
  }
}
module.exports = { fetchData };

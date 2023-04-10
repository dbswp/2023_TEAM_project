const { parseString } = require('xml2js');

const { DATA_API_KEY } = process.env;

async function fetchData(END_POINT) {
  const AREA_END_POINT = `http://openapi.seoul.go.kr:8088/${DATA_API_KEY}/xml/citydata/1/5/${END_POINT}`;

  let model = {
    area_name: '',
    live_data: {},
  };

  const resolve = await fetch(AREA_END_POINT, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/xml',
    },
  });

  const rawData = await resolve.text();

  parseString(rawData, (err, result) => {
    if (err) {
      console.error(err);
    } else {
      //KT의 실시간 인구밀도 데이터
      let liveData =
        result['SeoulRtd.citydata']['CITYDATA'][0].LIVE_PPLTN_STTS[0]
          .LIVE_PPLTN_STTS[0];
      //지역 이름
      let areaName = result['SeoulRtd.citydata']['CITYDATA'][0].AREA_NM;

      model = {
        area_name: areaName[0],
        live_data: liveData,
      };
    }
  });
  return model;
}

module.exports = fetchData;

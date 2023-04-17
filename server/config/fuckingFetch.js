const { parseString } = require('xml2js');

const DATA_API_KEY = '5478417475796a65353661524a7961';

const END_POINT = [
  '강남 MICE 관광특구',
  '동대문 관광특구',
  '명동 관광특구',
  '이태원 관광특구',
  '잠실 관광특구',
  '종로·청계 관광특구',
  '홍대 관광특구',
  '경복궁·서촌마을',
  '광화문·덕수궁',
  '창덕궁·종묘',
  '가산디지털단지역',
  '강남역',
  '건대입구역',
  '고속터미널역',
  '교대역',
  '구로디지털단지역',
  '서울역',
  '선릉역',
  '신도림역',
  '신림역',
  '신촌·이대역',
  '역삼역',
  '연신내역',
  '용산역',
  '왕십리역',
  'DMC(디지털미디어시티)',
  '창동 신경제 중심지',
  '노량진',
  '낙산공원·이화마을',
  '북촌한옥마을',
  '가로수길',
  '성수카페거리',
  '수유리 먹자골목',
  '쌍문동 맛집거리',
  '압구정로데오거리',
  '여의도',
  '영등포 타임스퀘어',
  '인사동·익선동',
  '국립중앙박물관·용산가족공원',
  '남산공원',
  '뚝섬한강공원',
  '망원한강공원',
  '반포한강공원',
  '북서울꿈의숲',
  '서울대공원',
  '서울숲공원',
  '월드컵공원',
  '이촌한강공원',
  '잠실종합운동장',
  '잠실한강공원',
];

async function fetchData() {
  //여기서 정의한 이유는 parseString메서드 밖으로 쉽게 꺼내주기 위해서이다.
  let modelArr = [];
  let model = {
    area: '',
    congest: '',
  };

  //위에서 정의한 URI와 함께 서울시 데이터 광장에 xml데이터 요청 전송
  for (let i = 0; i < END_POINT.length; i += 1) {
    const AREA_END_POINT = `http://openapi.seoul.go.kr:8088/${DATA_API_KEY}/xml/citydata/1/5/${END_POINT[i]}`;
    const resolve = await fetch(AREA_END_POINT, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/xml',
      },
    });
    //모듈 xml2js 에서 꺼내온 parseString 메서드를 이용하여 xml데이터를 json형식으로 바꾸어주는 과정
    const rawData = await resolve.text();
    parseString(rawData, (err, result) => {
      if (err) {
        console.error(err);
      } else {
        // KT의 실시간 인구밀도 데이터
        let congestLevel =
          result['SeoulRtd.citydata']['CITYDATA'][0].LIVE_PPLTN_STTS[0]
            .LIVE_PPLTN_STTS[0].AREA_CONGEST_LVL[0];
        //지역 이름
        let areaName = result['SeoulRtd.citydata']['CITYDATA'][0].AREA_NM[0];

        model = {
          area: areaName,
          congest: congestLevel,
        };

        modelArr.push(model);
      }
    });
  }
  console.log(modelArr);
}

fetchData();

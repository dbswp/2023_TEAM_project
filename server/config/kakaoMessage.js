const request = require('request');

const sendKakaoMessage = (kakao_access_token) => {
  let testObj = {
    object_type: 'text',
    text: '현재 인구밀도 혼잡 지역에 있습니다!',
    link: {
      web_url: 'https://localhost:3000/login',
      mobile_web_url: 'https://localhost:3000/login',
    },
    button_title: '바로 확인',
  };
  let testObjStr = JSON.stringify(testObj);
  let options = {
    url: 'https://kapi.kakao.com/v2/api/talk/memo/default/send',
    method: 'POST',
    headers: {
      Authorization: `Bearer ${kakao_access_token}`,
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    form: {
      template_object: testObjStr,
    },
  };
  function callback(error, response, body) {
    if (response) {
      console.log(body);
    }
  }
  request(options, callback);
};

module.exports = { sendKakaoMessage };

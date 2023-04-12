const CryptoJS = require('crypto-js');
const NCP_serviceID = 'ncp:sms:kr:305761385612:balance_place';
const NCP_access_key = 'WagMa47ZF4wVHqw1Nv3K';
const NCP_secret_key = 'FgZbhOIfHx9UXFcrVF4dW1u8Tn8rSIz98iUCn1fQ';

const date = Date.now().toString();
const phone = '010-5002-9433';
const method = 'POST';
const space = ' ';
const newLine = '\n';
const url = `https://sens.apigw.ntruss.com/sms/v2/services/${NCP_serviceID}/messages`;
const url2 = `/sms/v2/services/${NCP_serviceID}/messages`;

const hmac = CryptoJS.algo.HMAC.create(CryptoJS.algo.SHA256, NCP_secret_key);
hmac.update(method);
hmac.update(space);
hmac.update(url2);
hmac.update(newLine);
hmac.update(date);
hmac.update(newLine);
hmac.update(NCP_access_key);
const hash = hmac.finalize();
const signature = hash.toString(CryptoJS.enc.Base64);

const simpleNotification = async () => {
  const res = await fetch(url, {
    method: 'POST',
    headers: {
      'x-ncp-apigw-timestamp': `${date}`,
      'x-ncp-iam-access-key': `${NCP_access_key}`,
      'x-ncp-apigw-signature-v2': `${signature}`,
      'Content-Type': 'application/json; charset=utf-8',
    },
    data: {
      type: 'SMS',
      contentType: 'COMM',
      countryCode: '82',
      from: `${phone}`,
      content: `[북적북적] 현재 인구밀집 '혼잡' 지역에 위치해 있습니다. 안전에 유의해주세요!`,
      messages: [{ to: `${phone}` }],
    },
  });

  console.log(res.statusText, res.status);
};

simpleNotification();

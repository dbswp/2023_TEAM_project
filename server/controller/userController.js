const mongooseConnect = require('./mongooseConnect');
const User = require('../models/user');

const { KAKAO_API_KEY, KAKAO_REDIRECT_URI } = process.env;

mongooseConnect();

// 회원 가입
// 몽구스 삽입은 create, 뒤에 {} = One, 뒤에 [] = Many
const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    await User.create(req.body);
    res.status(200).json({ text: '회원가입 성공!!' });
    console.log('회원가입 성공!');
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: '회원가입 실패' });
  }
};

const loginUser = async (req, res) => {
  try {
    const duplicatedUser = await User.findOne({ id: req.body.id });
    if (duplicatedUser) {
      console.log('db에서 아이디 대조까지는 성공');
    }
    if (!duplicatedUser) {
      return res.status(400).json({ text: '없는 아이디임..' });
    }
    if (duplicatedUser.password !== req.body.password) {
      return res.status(400).json({ text: '비밀번호 틀림!' });
    }
    // req.session.login = true;
    // req.session.userId = req.body.id;

    // res.cookie('user', req.body.id, {
    //   maxAge: 1000 * 30,
    //   httpOnly: true,
    //   signed: true,
    // });

    //로그인 성공시 프론트단에서 화면이 변화되는 처리를 해줘야할듯!!!

    res.status(200).json({ text: '로그인 성공' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: '로그인 오류' });
  }
};

const kakaoLoginUser = (req, res) => {
  const KAKAO_CODE = req.body.code;
  console.log(KAKAO_CODE);
  try {
    fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'x-www-form-urlencoded;charset=utf-8',
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log(data.access_token);
      });
    res.status(200).json('엑세스 토큰 발급');
  } catch (err) {
    console.error(err);
    res.status(500).json('엑세스 토큰 받기 실패!!');
  }
};

module.exports = {
  registerUser,
  loginUser,
  kakaoLoginUser,
};

const mongooseConnect = require('./mongooseConnect');
const User = require('../models/user');
const jwt = require('jsonwebtoken');
const { simpleNotification } = require('../config/naverApiTest');
const bcrypt = require('bcrypt');

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

mongooseConnect();
const saltRounds = 10;

//유저 로그인시 데이터를 받기 위한 전역변수
let isNormalUserLogined = false;
let userID;

// 회원 가입
// 몽구스 삽입은 create, 뒤에 {} = One, 뒤에 [] = Many
const registerUser = async (req, res) => {
  let { email, phone, password, passwordCheck } = req.body;
  // 빈값이 오면 팅겨내기
  if (email === '' || phone === '' || password === '' || passwordCheck === '') {
    return res.json({ registerSuccess: false, message: '정보를 입력하세요' });
  }

  const sameEmailUser = await User.findOne({ email: email });
  if (sameEmailUser !== null) {
    return res.json({
      registerSuccess: false,
      message: '이미 존재하는 이메일입니다',
    });
  }

  const sameNickNameUser = await User.findOne({ phone });
  if (sameNickNameUser !== null) {
    return res.json({
      registerSuccess: false,
      message: '이미 존재하는 닉네임입니다.',
    });
  }

  // 솔트 생성 및 해쉬화 진행
  bcrypt.genSalt(saltRounds, async (err, salt) => {
    // 솔트 생성 실패시
    if (err)
      return res.status(500).json({
        registerSuccess: false,
        message: '비밀번호 해쉬화에 실패했습니다.',
      });
    // salt 생성에 성공시 hash 진행

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err)
        return res.status(500).json({
          registerSuccess: false,
          message: '비밀번호 해쉬화에 실패했습니다.',
        });

      // 비밀번호를 해쉬된 값으로 대체합니다.
      password = hash;

      try {
        const user = new User({
          email: email,
          phone,
          password,
        });
        await user.save();
        await User.create(user);
        return res.json({ registerSuccess: true });
      } catch (err) {
        return res.json({ registerSuccess: false, message: err.message });
      }
    });
  });
};

//로그인 미들웨어
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  //알림 기능을 위한 전역변수 변경
  userID = email;
  isNormalUserLogined = true;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        loginSuccess: false,
        message: '해당되는 이메일이 없습니다.',
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ email: user.email }, ACCESS_SECRET, {
        expiresIn: '7d',
      });

      // const decodedToken = jwt.verify(token, ACCESS_SECRET);
      // if (decodedToken.email !== user.email) {
      //   return res.status(403).json({
      //     loginSuccess: false,
      //     message: "인증 실패",
      //   });
      // }

      user.token = token;
      await user.save();

      // req.session.login = true;
      // req.session.user = {
      //   email: user.email,
      //   token: token,
      // };
      // res.cookie("user", user, {
      //   maxAge: 1000 * 30,
      //   httpOnly: true,
      //   signed: true,
      // });
      return res
        .status(200)
        .json({ loginSuccess: true, email: user.email, token });
    } else {
      return res.status(403).json({
        loginSuccess: false,
        message: '비밀번호가 틀렸습니다.',
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: 'something wrong' });
  }
};

const kakaoLoginUser = async (req, res) => {
  //프론트에서 요청과 함께 보낸 카카오 엑세스 토큰을 변수에 저장
  const KAKAO_CODE = req.body.kakao_access_token;

  try {
    //카카오 엑세스 토큰을 사용하여 사용자 정보에 접근!
    const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: 'POST',
      headers: {
        Authorization: `Bearer ${KAKAO_CODE}`,
        'Content-type': 'application/x-www-form-urlencoded',
      },
    });
    if (userResponese.status === 200) {
      const userKaKaoInfo = await userResponese.json();

      //jwt accesstoken 발급
      const kakaoAccessToken = jwt.sign(
        {
          id: userKaKaoInfo.id,
          email: userKaKaoInfo.kakao_account.email,
        },
        ACCESS_SECRET,
        {
          expiresIn: 1000 * 60,
          issuer: 'About Tech',
        }
      );
      // 쿠키에 담아서 전송
      res.cookie('kakaoAccessToken', kakaoAccessToken, {
        secure: false,
        httpOnly: false,
      });
    }
    res.status(200).json('엑세스 토큰 받기 성공!');
  } catch (err) {
    console.error(err);
  }
};

const accesstoken = async (req, res) => {
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, ACCESS_SECRET);

    const userData = await User.findOne({ email: data.email });

    const { password, ...others } = userData.toObject();
    res.status(200).json(others);
    console.log(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const refreshtoken = async (req, res) => {
  const { email } = req.body;
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, ACCESS_SECRET);

    const userData = await User.findOne({ email: data.email });

    const accessToken = jwt.sign(
      {
        email: userData.email,
      },
      ACCESS_SECRET,
      {
        expiresIn: '1m',
        issuer: 'About Tech',
      }
    );

    res.cookie('accessToken', accessToken, {
      secure: false,
      httpOnly: true,
    });
    res.status(200).json('Access Token Recreated');
    console.log(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};
const checkLoggedIn = async (req, res, next) => {
  console.log('!!');
  // console.log(req.body);
  // {
  //   email: '',
  //   content: '',
  //   token: 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImRic3dwOTgwNDI3QGdtYWlsLmNvbSIsImlhdCI6MTY4MTczMjk3NCwiZXhwIjoxNjgyMzM3Nzc0fQ.hzDq_ZfEtUEZBBaxO0gkIvI0UQmBw4IM_niAEVJOF2Q'
  // }
  try {
    const token = req.body.token; // 세션에 저장된 토큰 값을 가져옴
    const decoded = jwt.verify(token, ACCESS_SECRET); // 토큰을 디코딩해서 검증
    const user = await User.findOne({ email: decoded.email }); // 검증된 사용자 정보를 가져옴
    // console.log("user ->", user);

    if (user) {
      // 사용자 정보가 있으면 로그인 상태를 유지하고, req 객체에 사용자 정보를 담음
      // req.session.user = {
      //   email: user.email,
      //   token: token,
      // };
      req.userInfo = user;
      next(); // 다음 미들웨어 실행
    } else {
      // 사용자 정보가 없으면 로그인 상태를 초기화
      req.session.destroy();
      res.clearCookie('connect.sid');
      res.redirect('/login');
    }
  } catch (err) {
    // 토큰 검증에 실패한 경우 로그인 상태를 초기화
    req.session.destroy();
    res.clearCookie('connect.sid');
    res.redirect('/login');
  }
};

const logout = (req, res) => {
  try {
    const token = req.body.token;
    if (!token) {
      return res.status(400).send('No token provided');
    }
    res.status(200).json('Logout Success');
  } catch (error) {
    res.status(500).json(error);
  }
};

const findPhoneNumber = async (req, res) => {
  //NaverMaps.jsx 요청의 body 안에 담겨온 카카오 엑세스 토큰을 변수에 저장
  const kakao_access_token = req.body.kakao_access_token;
  if (isNormalUserLogined && userID !== undefined) {
    try {
      //이메일 형식의 유저 아이디를 컨트롤러 상단의 전역변수에서 받아와서 DB에서 해당 유저정보를 가져옴
      const configuration = await User.findOne({
        email: userID,
      }).find();
      // 해당 유저정보에서 핸드폰 번호만 추출
      const phone = configuration[0]?.phone;
      // 핸드폰 번호가 존재하면 알림문자전송 모듈에 인자로 전달
      if (configuration) simpleNotification(phone, kakao_access_token);
    } catch (err) {
      console.error(err);
    }
  } else {
    res.status(404).json('로그인해');
  }
};

module.exports = {
  loginUser,
  accesstoken,
  refreshtoken,
  registerUser,
  kakaoLoginUser,
  logout,
  findPhoneNumber,
  checkLoggedIn,
};

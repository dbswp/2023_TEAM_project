const mongooseConnect = require("./mongooseConnect");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { simpleNotification } = require("../config/naverApiTest");
const bcrypt = require("bcrypt");

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
  if (email === "" || phone === "" || password === "" || passwordCheck === "") {
    return res.json({ registerSuccess: false, message: "정보를 입력하세요" });
  }

  const sameEmailUser = await User.findOne({ email: email });
  if (sameEmailUser !== null) {
    return res.json({
      registerSuccess: false,
      message: "이미 존재하는 이메일입니다",
    });
  }

  const sameNickNameUser = await User.findOne({ phone });
  if (sameNickNameUser !== null) {
    return res.json({
      registerSuccess: false,
      message: "이미 존재하는 닉네임입니다.",
    });
  }

  // 솔트 생성 및 해쉬화 진행
  bcrypt.genSalt(saltRounds, async (err, salt) => {
    // 솔트 생성 실패시
    if (err)
      return res.status(500).json({
        registerSuccess: false,
        message: "비밀번호 해쉬화에 실패했습니다.",
      });
    // salt 생성에 성공시 hash 진행

    bcrypt.hash(password, salt, async (err, hash) => {
      if (err)
        return res.status(500).json({
          registerSuccess: false,
          message: "비밀번호 해쉬화에 실패했습니다.",
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
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(403).json({
        loginSuccess: false,
        message: "해당되는 이메일이 없습니다.",
      });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (isMatch) {
      const token = jwt.sign({ email: user.email }, ACCESS_SECRET, {
        expiresIn: "7d",
      });

      user.token = token;
      await user.save();

      return res
        .cookie("x_auth", user.token, {
          maxAge: 1000 * 60 * 60 * 24 * 7,
          httpOnly: true,
        })
        .status(200)
        .json({ loginSuccess: true, userId: user._id });
    } else {
      return res.status(403).json({
        loginSuccess: false,
        message: "비밀번호가 틀렸습니다.",
      });
    }
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: "something wrong" });
  }
};

const kakaoLoginUser = async (req, res) => {
  //프론트에서 요청과 함께 보낸 카카오 엑세스 토큰을 변수에 저장
  const KAKAO_CODE = req.body.kakao_access_token;

  try {
    //카카오 엑세스 토큰을 사용하여 사용자 정보에 접근!
    const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${KAKAO_CODE}`,
        "Content-type": "application/x-www-form-urlencoded",
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
          issuer: "About Tech",
        }
      );
      // 쿠키에 담아서 전송
      res.cookie("kakaoAccessToken", kakaoAccessToken, {
        secure: false,
        httpOnly: false,
      });
    }
    res.status(200).json("엑세스 토큰 받기 성공!");
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
        expiresIn: "1m",
        issuer: "About Tech",
      }
    );

    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: true,
    });
    res.status(200).json("Access Token Recreated");
    console.log(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};
// 로그인 체크 미들웨어
const isLoggedIn = async (req, res, next) => {
  try {
    // 클라이언트 쿠키에서 token을 가져옵니다.
    const token = req.cookies.x_auth;
    if (!token) {
      return res.redirect("/login"); // 로그인 페이지로 리다이렉트
    }
    // token을 decode 합니다.
    const decoded = jwt.verify(token, ACCESS_SECRET);
    // decoded에는 jwt를 생성할 때 첫번째 인자로 전달한 객체가 있습니다.
    // { email: user.email } 형태로 줬으므로 email을 꺼내 씁시다
    const user = await User.findOne({ email: decoded.email });
    if (!user) {
      return res.redirect("/login"); // 로그인 페이지로 리다이렉트
    }
    req.user = user;
    next();
  } catch (err) {
    console.error(err);
    return res.status(500).json({ error: "서버 오류 발생" });
  }
};

const logout = (req, res) => {
  console.log("들어오나?");
  try {
    res.cookie("accessToken", " ");
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
  }
};

const findPhoneNumber = async (req, res) => {
  //NaverMaps.jsx 요청의 body 안에 담겨온 카카오 엑세스 토큰을 변수에 저장
  const kakao_access_token = req.body.kakao_access_token;

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
};

module.exports = {
  loginUser,
  accesstoken,
  refreshtoken,
  isLoggedIn,
  registerUser,
  kakaoLoginUser,
  logout,
  findPhoneNumber,
};

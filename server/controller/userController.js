const mongooseConnect = require("./mongooseConnect");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { simpleNotification } = require("../config/naverApiTest");

const { ACCESS_SECRET, REFRESH_SECRET } = process.env;

mongooseConnect();

//유저 로그인시 데이터를 받기 위한 전역변수
let isUserLogined = false;
let userID;

// 회원 가입
// 몽구스 삽입은 create, 뒤에 {} = One, 뒤에 [] = Many
const registerUser = async (req, res) => {
  const { email } = req.body;
  console.log(req.body);
  try {
    const duplicatedUser = await User.findOne({ email });
    if (duplicatedUser) {
      res.status(409).json({ text: "중복된 이메일입니다." });
    } else {
      await User.create(req.body);
      res.status(200).json({ text: "회원가입 성공!!" });
      console.log("회원가입 성공!");
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "회원가입 실패" });
  }
};

const loginUser = async (req, res) => {
  const { email, password, phone } = req.body;
  try {
    const duplicatedUser = await User.findOne({ email });
    if (duplicatedUser) {
      console.log("db에서 아이디 대조까지는 성공");
    }
    if (!duplicatedUser) {
      return res.status(400).json({ text: "없는 이메일입니다." });
    }
    if (duplicatedUser.password !== req.body.password) {
      return res.status(400).json({ text: "비밀번호 틀림" });
    }

    // 유저가 로그인 하면 true로 바꾸어줌
    isUserLogined = true;
    // 로그인시 유저가 req.body에 담겨서 오는  유저 이메일을 전역 변수에 저장
    if (isUserLogined) userID = email;

    // accesstoken 발급
    const accessToken = jwt.sign(
      {
        email: duplicatedUser.email,
        phone: duplicatedUser.phone,
        password: duplicatedUser.password,
      },
      ACCESS_SECRET,
      {
        expiresIn: 1000 * 60,
        issuer: "About Tech",
      }
    );

    // refreshtoken 발급
    const refreshToken = jwt.sign(
      {
        email: duplicatedUser.email,
        phone: duplicatedUser.phone,
        password: duplicatedUser.password,
      },
      REFRESH_SECRET,
      {
        expiresIn: "24h",
        issuer: "About Tech",
      }
    );

    // 쿠키에 담아서 전송
    res.cookie("accessToken", accessToken, {
      secure: false,
      httpOnly: false,
    });
    res.cookie("refreshToken", refreshToken, {
      secure: false,
      httpOnly: false,
    });

    res.status(200).json({ text: "로그인 성공" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "로그인 오류" });
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

      console.log(userKaKaoInfo);

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
      // console.log(kakaoAccessToken);
    }
    res.status(200).json("엑세스 토큰 받기 성공!");
  } catch (err) {
    console.error(err);
  }
};

const accesstoken = async (req, res) => {
  const { email, phone } = req.body;
  const duplicatedUser = await User.findOne({ email, phone });
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, ACCESS_SECRET);

    const userData = duplicatedUser.filter((el) => {
      return el.email === data.email;
    });

    const { password, ...others } = userData;
    res.status(200).json(others);
    console.log(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const refreshtoken = async (req, res) => {
  const { email } = req.body;
  const duplicatedUser = await User.findOne({ email });
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, ACCESS_SECRET);

    const userData = duplicatedUser.filter((el) => {
      return el.email === data.email;
    });

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

const loginSuccess = (req, res) => {};

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
  loginSuccess,
  registerUser,
  kakaoLoginUser,
  logout,
  findPhoneNumber,
};

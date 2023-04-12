const mongooseConnect = require("./mongooseConnect");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const request = require("request");

const { ACCESS_SECRET, REFRESH_SECRET, KAKAO_API_KEY, KAKAO_REDIRECT_URI } =
  process.env;

mongooseConnect();

// 회원 가입
// 몽구스 삽입은 create, 뒤에 {} = One, 뒤에 [] = Many
const registerUser = async (req, res) => {
  console.log(req.body);
  try {
    await User.create(req.body);
    res.status(200).json({ text: "회원가입 성공!!" });
    console.log("회원가입 성공!");
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
    // console.log(duplicatedUser);

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
    // console.log(accessToken);

    // console.log(accessToken);
    // console.log(refreshToken);

    res.status(200).json({ text: "로그인 성공" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "로그인 오류" });
  }
};

let kakao_access_token;

const kakaoLoginUser = async (req, res) => {
  const KAKAO_CODE = req.body.code;

  try {
    console.log(KAKAO_API_KEY, KAKAO_REDIRECT_URI);
    const getKakaoAccessToken = await fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "x-www-form-urlencoded;charset=utf-8",
        },
      }
    );
    const data = await getKakaoAccessToken.json();
    kakao_access_token = data.access_token;
    console.log("카카오 엑세스 토큰 발급 성공!!   토큰:", data.access_token);

    let testObj = {
      object_type: "text",
      text: "현재 인구밀도 혼잡 지역에 있습니다! 다른 지역으로의 이동은 어떨까요?",
      link: {
        web_url: "https://localhost:3000/login",
        mobile_web_url: "https://localhost:3000/login",
      },
      button_title: "바로 확인",
    };

    let testObjStr = JSON.stringify(testObj);

    let options = {
      url: "https://kapi.kakao.com/v2/api/talk/memo/default/send",
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        "Content-Type": "application/x-www-form-urlencoded",
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

    const userResponese = await fetch(`https://kapi.kakao.com/v2/user/me`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${data.access_token}`,
        "Content-type": "application/x-www-form-urlencoded",
      },
    });
    if (userResponese.status === 200) {
      const userKaKaoInfo = await userResponese.json();
      console.log(userKaKaoInfo);
      // console.log(userKaKaoInfo.id);
      // console.log(userKaKaoInfo.kakao_account.email);

      // accesstoken 발급
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
      console.log(kakaoAccessToken);
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
    res.cookie("accessToken", "");
    res.status(200).json("Logout Success");
  } catch (error) {
    res.status(500).json(error);
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
};

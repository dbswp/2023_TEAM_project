const mongooseConnect = require("./mongooseConnect");
const User = require("../models/user");
const jwt = require("jsonwebtoken");
const { json } = require("body-parser");

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
  const { id, password } = req.body;
  try {
    const duplicatedUser = await User.findOne({ id });
    if (duplicatedUser) {
      console.log("db에서 아이디 대조까지는 성공");
    }
    if (!duplicatedUser) {
      return res.status(400).json({ text: "없는 아이디임.." });
    }
    if (duplicatedUser.password !== req.body.password) {
      return res.status(400).json({ text: "비밀번호 틀림!" });
    }
    // console.log(duplicatedUser);

    // accesstoken 발급
    const accessToken = jwt.sign(
      {
        id: duplicatedUser.id,
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
        id: duplicatedUser.id,
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
    console.log(accessToken);

    // console.log(accessToken);
    // console.log(refreshToken);

    //로그인 성공시 프론트단에서 화면이 변화되는 처리를 해줘야할듯!!!

    res.status(200).json({ text: "로그인 성공" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ text: "로그인 오류" });
  }
};

const kakaoLoginUser = (req, res) => {
  const KAKAO_CODE = req.body.code;
  console.log(KAKAO_CODE);
  try {
    fetch(
      `https://kauth.kakao.com/oauth/token?grant_type=authorization_code&client_id=${KAKAO_API_KEY}&redirect_uri=${KAKAO_REDIRECT_URI}&code=${KAKAO_CODE}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "x-www-form-urlencoded;charset=utf-8",
        },
      }
    )
      .then((res) => res.json())
      .then((data) => {
        console.log("카카오 엑세스 토큰 발급 성공!!   토큰:", KAKAO_CODE);
        // accesstoken 발급
        // const accessToken = jwt.sign(
        //   {
        //     id: data.id,
        //   },
        //   ACCESS_SECRET,
        //   {
        //     expiresIn: 1000 * 60,
        //     issuer: "About Tech",
        //   }
        // );
      });
    res.status(200).json("엑세스 토큰 받기 성공!");
  } catch (err) {
    console.error(err);
    res.status(500).json("엑세스 토큰 받기 실패!!");
  }
};

const accesstoken = async (req, res) => {
  const { id } = req.body;
  const duplicatedUser = await User.findOne({ id });
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, ACCESS_SECRET);

    const userData = duplicatedUser.filter((el) => {
      return el.id === data.id;
    });

    const { password, ...others } = userData;
    res.status(200).json(others);
    console.log(userData);
  } catch (err) {
    res.status(500).json(err);
  }
};

const refreshtoken = async (req, res) => {
  const { id } = req.body;
  const duplicatedUser = await User.findOne({ id });
  try {
    const token = req.cookies.accessToken;
    const data = jwt.verify(token, ACCESS_SECRET);

    const userData = duplicatedUser.filter((el) => {
      return el.id === data.id;
    });

    const accessToken = jwt.sign(
      {
        id: userData.id,
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

const express = require("express");
const cors = require("cors");
const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const session = require("express-session");

require("dotenv").config();

const { PORT, CLIENT_URL } = process.env;
const app = express();

const registerRouter = require("./routes/register");
const loginRouter = require("./routes/login");
const verifyTokenRouter = require("./routes/accesstoken");
const refreshToken = require("./routes/refreshtoken");
const logoutRouter = require("./routes/logout");
const dataRouter = require("./routes/data");
const seoulDataRouter = require("./routes/seoulDataName");
const pushAlarmRouter = require("./routes/webPush");
const boardRouter = require("./routes/boardPrint");

app.use(
  cors({
    origin: true,
    methods: ["GET", "POST"],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser("dbswp"));
app.use(
  session({
    secret: "dbswp", // secret값으로 암호화
    resave: false, // 변경사항이 없어도 다시 저장
    saveUninitialized: true, // 세션에 저장할 내역이 없더라도 처음부터 세션 생성
    // cookie: {
    //   maxAge: 1000 * 60 * 60,
    // },
  })
);
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); // json 형태로 전달
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/register", registerRouter);
app.use("/login", loginRouter);
app.use("/logout", logoutRouter);
// app.use("/accesstoken", accessToken);
app.use("/refreshtoken", refreshToken);
app.use("/data", dataRouter);
app.use("/nameData", seoulDataRouter);
app.use("/push", pushAlarmRouter);
app.use("/board", boardRouter);
// 라우터 등록
app.use("/verify-token", verifyTokenRouter);
// app.get("/login/success", loginSuccess);

app.get("/", (req, res) => {
  res.send("연결 성공");
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).send("Something went wrong...");
});

app.listen(PORT, () => {
  console.log(`THE SERVER IS OPEN ON PORT ${PORT}...!!`);
});

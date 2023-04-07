const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');

require('dotenv').config();

const { PORT, CLIENT_URL } = process.env;
const app = express();

const registerRouter = require('./routes/register');
const loginRouter = require('./routes/login');
const accessToken = require('./routes/accesstoken');
const refreshToken = require('./routes/refreshtoken');
const dataRouter = require('./routes/data');

app.use(
  cors({
    origin: CLIENT_URL,
    methods: ['GET', 'POST'],
    credentials: true,
  })
);
app.use(express.json());
app.use(cookieParser());
app.use(express.urlencoded({ extended: false }));
app.use(bodyParser.json()); // json 형태로 전달
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/register', registerRouter);
app.use('/login', loginRouter);
app.get('/accesstoken', accessToken);
app.get('/refreshtoken', refreshToken);
app.use('/data', dataRouter);
// app.get("/login/success", loginSuccess);

app.get('/', (req, res) => {
  res.send('연결 성공');
});

app.use((err, req, res, next) => {
  console.log(err);
  res.status(err.statusCode).send('Something went wrong...');
});

app.listen(PORT, () => {
  console.log(`THE SERVER IS OPEN ON PORT ${PORT}...!!`);
});

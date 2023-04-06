const mongooseConnect = require('./mongooseConnect');
const User = require('../models/user');

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

module.exports = {
  registerUser,
  loginUser,
};

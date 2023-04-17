const mongooseConnect = require("./mongooseConnect");
const Board = require("../models/board");

const getArticles = async (req, res) => {
  console.log(req.userInfo.email);
  try {
    const selectArticle = await Board.find();
    res.status(200).json(selectArticle);
  } catch (err) {
    console.log(err);
  }
};

const writeArticle = async (req, res) => {
  // console.log(req.userInfo);
  const { email, content } = req.body;
  try {
    const newComment = new Board({ email, content });
    await newComment.save();
    await Board.create(newComment);
    res.status(200).json({ text: "댓글 성공" });
    console.log("댓글 저장 성공");
  } catch (err) {
    console.log(err);
  }
};

module.exports = {
  getArticles,
  writeArticle,
};
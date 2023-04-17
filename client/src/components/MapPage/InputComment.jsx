import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/mp-board.scss";
import { useNavigate } from "react-router-dom";

const InputComment = ({ area }) => {
  const [email, setEmail] = useState("");
  const [content, setContent] = useState("");
  const [comments, setComments] = useState([]);
  const [renderCount, setRenderCount] = useState(0);
  const point = localStorage.getItem("END_POINT");
  const navigator = useNavigate();

  const sendData = async (e) => {
    e.preventDefault();
    const res = await axios
      .post("http://localhost:4000/board/write", {
        email: email,
        content: `위치 : ${point}  댓글 : ${content}`,
        token: window.localStorage.getItem("token"),
      })
      .then((result) => {
        if (result.status === 200) {
          setRenderCount((cnt) => cnt + 1);
          console.log(result);
          // // input 창 초기화
          // setEmail((comments) => comments === "");
          // setContent((comments) => comments === "");
        }
      });
  };

  const getData = async (e) => {
    // e.preventDefault();
    const res = await axios.post("http://localhost:4000/board", {
      email: email,
      content: content,
      token: window.localStorage.getItem("token"),
    });
    if (res.status !== 200) alert("데이터 수신 실패");
    setComments(res.data);
  };

  useEffect(() => {
    getData();
  }, [renderCount]);

  // comments가 undefined일 때 렌더링하지 않도록 처리
  if (!comments) {
    return null;
  }
  return (
    <>
      <div className="board_container">
        <div className="board_header">
          <h1>댓글 달기</h1>
        </div>
        <form className="board_form">
          <div className="form_title">
            <h3>이메일</h3>
            <input
              type="email"
              name="title"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="form_content">
            <h3>내용</h3>
            <textarea
              name="content"
              id="content"
              cols="50"
              rows="2"
              required
              onChange={(e) => setContent(e.target.value)}
            ></textarea>
          </div>
          <button type="submit" onClick={sendData}>
            글 작성하기
          </button>
        </form>
        <div className="board-print">
          <h1>댓글 현황</h1>
          {comments.length > 0 &&
            comments.map((comment, index) => (
              <div key={index}>
                <p>{comment.area}</p>
                <p>{comment.email}</p>
                <p>{comment.content}</p>
              </div>
            ))}
        </div>
      </div>
    </>
  );
};

export default InputComment;

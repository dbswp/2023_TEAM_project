import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../styles/Register.css";

export default function Register() {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [id, setId] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //오류메시지 상태저장
  const [idMessage, setIdMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isId, setIsId] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:4000/register", {
            id: id,
            password: password,
          })
          .then((res) => {
            console.log("response:", res);
            if (res.status === 200) {
              navigate("/Login");
            }
          });
      } catch (err) {
        console.error(err);
      }
    },
    [id, password]
  );

  // 이름
  const onChangeId = useCallback((e) => {
    setId(e.target.value);
    if (e.target.value.length < 2 || e.target.value.length > 9) {
      setIdMessage("2글자 이상 9글자 미만으로 입력해주세요.");
      setIsId(false);
    } else {
      setIdMessage("올바른 이름 형식입니다 :)");
      setIsId(true);
    }
  }, []);

  // 비밀번호
  const onChangePassword = useCallback((e) => {
    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
    const passwordCurrent = e.target.value;
    setPassword(passwordCurrent);

    if (!passwordRegex.test(passwordCurrent)) {
      setPasswordMessage("숫자+영문자+특수문자 조합으로 8자리 이상 입력해주세요!");
      setIsPassword(false);
    } else {
      setPasswordMessage("안전한 비밀번호에요 : )");
      setIsPassword(true);
    }
  }, []);

  // 비밀번호 확인
  const onChangePasswordConfirm = useCallback(
    (e) => {
      const passwordConfirmCurrent = e.target.value;
      setPasswordConfirm(passwordConfirmCurrent);

      if (password === passwordConfirmCurrent) {
        setPasswordConfirmMessage("비밀번호를 똑같이 입력했어요 : )");
        setIsPasswordConfirm(true);
      } else {
        setPasswordConfirmMessage("비밀번호가 틀려요. 다시 확인해주세요 ㅜ ㅜ");
        setIsPasswordConfirm(false);
      }
    },
    [password, passwordConfirm]
  );

  return (
    <>
      <div className="login__box">
        <h1>회원가입</h1>
        <form onSubmit={onSubmit}>
          <div className="mt-3 id formBox">
            <input type="text" value={id} onChange={onChangeId} placeholder="아이디를 입력하세요" required />
            {id.length > 0 && <div className={`message ${isId ? "success" : "error"}`}>{idMessage}</div>}
          </div>
          <div className="mt-3 password">
            <input
              type="password"
              value={password}
              onChange={onChangePassword}
              placeholder="비밀번호를 입력하세요"
              required
            />
            {password.length > 0 && (
              <div className={`message ${isPassword ? "success" : "error"}`}>{passwordMessage}</div>
            )}
          </div>
          <div className="mt-3 password">
            <input
              type="password"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
              placeholder="비밀번호를 입력하세요"
              required
            />
            {passwordConfirm.length > 0 && (
              <div className={`message ${isPasswordConfirm ? "success" : "error"}`}>{passwordConfirmMessage}</div>
            )}
          </div>
          <div className="d-flex justify-content-center mt-4 password">
            <button type="submit" className="btn btn-primary">
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

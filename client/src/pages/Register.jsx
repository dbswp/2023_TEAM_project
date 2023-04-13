import React, { useCallback, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import style from "../styles/Register.css";

export default function Register() {
  //이름, 이메일, 비밀번호, 비밀번호 확인
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");

  //오류메시지 상태저장
  const [emailMessage, setEmailMessage] = useState("");
  const [phoneMessage, setPhoneMessage] = useState("");
  const [passwordMessage, setPasswordMessage] = useState("");
  const [passwordConfirmMessage, setPasswordConfirmMessage] = useState("");

  // 유효성 검사
  const [isEmail, setIsEmail] = useState(false);
  const [isPhone, setIsPhone] = useState(false);
  const [isPassword, setIsPassword] = useState(false);
  const [isPasswordConfirm, setIsPasswordConfirm] = useState(false);
  const navigate = useNavigate();

  const onSubmit = useCallback(
    async (e) => {
      e.preventDefault();
      try {
        await axios
          .post("http://localhost:4000/register", {
            email: email,
            password: password,
            phone: phone,
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
    [email, password, phone]
  );

  // 이메일
  const onChangeEmail = useCallback((e) => {
    const emailRegex =
      /([\w-.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([\w-]+\.)+))([a-zA-Z]{2,4}|[0-9]{1,3})(\]?)$/;
    const emailCurrent = e.target.value;
    setEmail(emailCurrent);

    if (!emailRegex.test(emailCurrent)) {
      setEmailMessage("이메일 형식이 틀렸어요! 다시 확인해주세요 ㅜ ㅜ");
      setIsEmail(false);
    } else {
      setEmailMessage("올바른 이메일 형식이에요 : )");
      setIsEmail(true);
    }
  }, []);

  // 번호
  const onChangePhone = useCallback((e) => {
    const phoneRegExp = /^01([0|1|6|7|8|9])-?([0-9]{4})-?([0-9]{4})$/;
    const currentPhone = e.target.value;
    setPhone(currentPhone);

    if (!phoneRegExp.test(currentPhone)) {
      setPhoneMessage(` "-" 빼고 입력해주세요`);
      setIsPhone(false);
    } else {
      setPhoneMessage("사용 가능한 번호입니다:-)");
      setIsPhone(true);
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
    [password]
  );

  return (
    <>
      <div className="login__box">
        <h1>회원가입</h1>
        <form onSubmit={onSubmit}>
          {/* Email Part*/}
          <div className="mt-3 email">
            <input type="email" onChange={onChangeEmail} placeholder="이메일을 입력해주세요" value={email} />
            {email.length > 0 && <div className={`message ${isEmail ? "success" : "error"}`}>{emailMessage}</div>}
          </div>

          {/* Phone Part */}
          <div className="mt-3 phone">
            <input type="phone" placeholder="핸드폰 번호를 입력해주세요" value={phone} onChange={onChangePhone} />
            {phone.length > 0 && <div className={`message ${isPhone ? "success" : "error"}`}>{phoneMessage}</div>}
          </div>

          {/* Password Part */}
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
          {/* PasswordConfirm Part*/}
          <div className="mt-3 passwordConfirm">
            <input
              type="password"
              value={passwordConfirm}
              onChange={onChangePasswordConfirm}
              placeholder="비밀번호를 확인하세요"
              required
            />
            {passwordConfirm.length > 0 && (
              <div className={`message ${isPasswordConfirm ? "success" : "error"}`}>{passwordConfirmMessage}</div>
            )}
          </div>
          <div className="d-flex justify-content-center mt-4 password">
            <button
              type="submit"
              className="btn btn-primary"
              disabled={!(isEmail && isPassword && isPasswordConfirm && isPhone)}
            >
              회원가입
            </button>
          </div>
        </form>
      </div>
    </>
  );
}

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function Register() {
  const navigate = useNavigate();
  const [id, setId] = useState('');
  const [password, setPassword] = useState('');

  const idHandler = (e) => {
    e.preventDefault();
    setId(e.target.value);
  };

  const passwordHandler = (e) => {
    e.preventDefault();
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = {
      id: id,
      password: password,
    };

    const res = await axios.post('http://localhost:4000/register', body);
    if (res) navigate('/login');
  };
  return (
    <div>
      <h1>회원가입페이지</h1>
      <form onSubmit={handleSubmit}>
        <div className="mt-3 id">
          <label className="mb-2" htmlFor="input-email">
            아이디
          </label>
          <input
            type="text"
            value={id}
            onChange={idHandler}
            placeholder="아이디를 입력하세요"
            required
          />
        </div>
        <div className="mt-3 password">
          <label className="mb-2" htmlFor="input-pw">
            비밀번호
          </label>
          <input
            type="password"
            value={password}
            onChange={passwordHandler}
            placeholder="비밀번호를 입력하세요"
            required
          />
        </div>
        <div className="d-flex justify-content-center mt-4 password">
          <button type="submit" className="btn btn-primary">
            회원가입
          </button>
        </div>
      </form>
    </div>
  );
}

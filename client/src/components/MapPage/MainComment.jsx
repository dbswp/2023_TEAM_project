import React, { useState, useEffect } from "react";
import InputComment from "./InputComment";
import { Link, useNavigate } from "react-router-dom";

export default function MainComment({ area }) {
  const [isLogin, setIsLogin] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    if (localStorage.getItem("token")) {
      setIsLogin(true);
    } else {
      setIsLogin(false);
      navigate("/login");
    }
  }, [navigate]);

  return <>{isLogin ? <InputComment area={area} /> : <Link to="/login" />}</>;
}

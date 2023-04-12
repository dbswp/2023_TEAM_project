import React from "react";
import "../../styles/card.scss";
import axios from "axios";
const { DATA_API_KEY } = process.env;

export default function Card({ name, img }) {
  const divName = async () => {
    try {
      const res = await axios.post("http://localhost:4000/data/getdata", {
        END_POINT: name,
      });
      // 데이터 처리 로직
      window.location.href = `http://openapi.seoul.go.kr:8088/${DATA_API_KEY}/xml/citydata/1/5/${res}`; // 이동할 URL 주소
    } catch (error) {
      console.error(error);
    }
  };
  return (
    <>
      <div className="main-card col" onClick={divName}>
        <img className="img" src={img}></img>
        <p className="seoul_end_point">{name}</p>
        <span>Seoul</span>
      </div>
    </>
  );
}

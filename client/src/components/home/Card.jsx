import React from "react";
import style from "../../styles/card.scss";

export default function Card({ name }) {
  return (
    <>
      <div className="main-card col">
        <div className="img"></div>
        <p className="seoul_end_point">{name}</p>
        <span>Gangnam-gu</span>
      </div>
    </>
  );
}

import React from "react";
import "../../styles/card.scss";

export default function Card({ name, img }) {
  return (
    <>
      <div className="main-card col">
        <img className="img" src={img}></img>
        <p className="seoul_end_point">{name}</p>
        <span>Seoul</span>
      </div>
    </>
  );
}

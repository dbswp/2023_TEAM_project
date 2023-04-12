import React from "react";
import "../../styles/card.scss";

export default function Card({ name }) {
  return (
    <>
      {name.map((el, idx) => {
        <div className="main-card col">
          <div className="img" style={{ "min-width": "200px" }}></div>
          <p className="seoul_end_point">{el}</p>
          <span>Seoul</span>
        </div>;
      })}
    </>
  );
}

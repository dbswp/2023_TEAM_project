import React, { useEffect, useState } from "react";
import "../../styles/card.scss";

export default function CategoryCard({ name, img }) {
  return (
    <>
      {name.map((el, idx) => {
        return (
          <div className="main-card col" key={idx}>
            <img className="img" src={name[2]}></img>
            <p className="seoul_end_point">{el[1]}</p>
            <span>Seoul</span>
          </div>
        );
      })}
    </>
  );
}

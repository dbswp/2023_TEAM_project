import React, { useEffect, useRef, useState } from "react";
import "../../styles/main-tabs-button.scss";
import MainCard from "./MainCard";
import Card from "./Card";
import axios from "axios";

export default function MainTabsButton() {
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/nameData");
    if (res.status !== 200) alert("데이터 수신 실패");
    const allData = res.data;
    console.log(allData);
  };

  useEffect(() => {
    getData();
  }, []);

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };
  return (
    <>
      <div className="container main-tab-wrap">
        <div className="row">
          <ul className="tab-list">
            <li className="tab-item">
              <button
                className={toggleState === 1 ? "nav-link active" : "nav-link"}
                onClick={() => {
                  toggleTab(1);
                }}
              >
                전체보기
              </button>
            </li>
            <li className="tab-item">
              <button
                className={toggleState === 2 ? "nav-link active" : "nav-link"}
                onClick={() => {
                  toggleTab(2);
                }}
              >
                특구
              </button>
            </li>
            <li className="tab-item">
              <button
                className={toggleState === 3 ? "nav-link active" : "nav-link"}
                onClick={() => {
                  toggleTab(3);
                }}
              >
                공원
              </button>
            </li>
            <li className="tab-item">
              <button
                className={toggleState === 4 ? "nav-link active" : "nav-link"}
                onClick={() => {
                  toggleTab(4);
                }}
              >
                지하철
              </button>
            </li>
          </ul>
        </div>
        <div className="row" style={{ height: "500px" }}>
          <div className="tab-contents">
            <div className={toggleState === 1 ? "tab-content1" : "tab-content"}>
              1
            </div>
            <div className={toggleState === 2 ? "tab-content2" : "tab-content"}>
              2
            </div>
            <div className={toggleState === 3 ? "tab-content3" : "tab-content"}>
              3
            </div>
            <div className={toggleState === 4 ? "tab-content4" : "tab-content"}>
              4
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

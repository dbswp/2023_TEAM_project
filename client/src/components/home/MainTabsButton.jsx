import React, { useEffect, useRef, useState } from "react";
import "../../styles/main-tabs-button.scss";
import MainCard from "./MainCard";
import Card from "./Card";
import axios from "axios";
import CategoryCard from "./CategoryCard";

export default function MainTabsButton() {
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/nameData");
    if (res.status !== 200) alert("데이터 수신 실패");
    //지역 분류 데이터
    const allData = res.data.Arr;
    //전체 이름이 들어간 데이터
    const indexData = res.data.dataIndex;
    //이미지 링크가 들어간 데이터
    const srcImgData = res.data.Arr;
    console.log(allData);

    setIndexData((cur) => indexData);
    setAllData((cur) => allData);
    setImgData((cur) => srcImgData);
  };

  useEffect(() => {
    getData();
  }, []);

  const [allData, setAllData] = useState();

  const [toggleState, setToggleState] = useState(1);
  const toggleTab = (index) => {
    setToggleState(index);
  };

  function dataName() {
    for (let item of allData) {
      if (item.id === 1) {
        let a = item.name;
        a.map((el, idx) => <CategoryCard name={el} key={idx} />);
      }
    }
  }

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
                지하철
              </button>
            </li>
            <li className="tab-item">
              <button
                className={toggleState === 4 ? "nav-link active" : "nav-link"}
                onClick={() => {
                  toggleTab(4);
                }}
              >
                공원
              </button>
            </li>
          </ul>
        </div>
        <div className="row" style={{ height: "500px" }}>
          <div className="tab-contents-wrap">
            <div className={toggleState === 1 ? "tab-content1" : "tab-content"}>
              {indexData?.map((el, idx) => {
                return <Card name={el} key={idx} img={el} />;
              })}
            </div>
            <div className={toggleState === 2 ? "tab-content2" : "tab-content"}>
              {allData?.map((el, idx) => {
                if (el.id === 2)
                  return <CategoryCard key={idx} name={el.name} img={el.img} />;
              })}
            </div>
            <div className={toggleState === 3 ? "tab-content3" : "tab-content"}>
              {allData?.map((el, idx) => {
                if (el.id === 3)
                  return <CategoryCard key={idx} name={el.name} img={el.img} />;
              })}
            </div>
            <div className={toggleState === 4 ? "tab-content4" : "tab-content"}>
              {allData?.map((el, idx) => {
                if (el.id === 4)
                  return <CategoryCard key={idx} name={el.name} img={el.img} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

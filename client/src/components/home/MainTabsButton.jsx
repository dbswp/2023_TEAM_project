import React, { useState } from "react";
import style from "../../styles/main-tabs-button.scss";

export default function MainTabsButton() {
  const [defaultBtn, setDefaultBtn] = useState();
  // const tabsArr = [
  //   { tab: all, content: "tab 1" },
  //   { tab: area, content: "tab 2" },
  //   { tab: park, content: "tab 3" },
  //   { tab: subway, content: "tab 4" },
  // ];
  return (
    <>
      {/* {tabsArr.map(() => {})} */}
      {/* <div className="container main-tab-wrap">
        <div className="row">
          <ul className="tab-list">
            <li className="tab-item">
              <button className="nav-link active">전체보기</button>
            </li>
            <li className="tab-item">
              <button className="nav-link">특구</button>
            </li>
            <li className="tab-item">
              <button className="nav-link">공원</button>
            </li>
            <li className="tab-item">
              <button className="nav-link">전체보기</button>
            </li>
          </ul>
        </div>
      </div> */}
      {/* // {menuArr.map((el,index) => (
      //         <li className={index === currentTab ? "submenu focused" : "submenu" }
      //         onClick={() => selectMenuHandler(index)}>{el.name}</li>
      //       ))} */}
    </>
  );
}

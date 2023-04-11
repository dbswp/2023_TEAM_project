import React from "react";
import mainBanner from "../../assets/mainBanner@2x.png";
import "../../styles/main_banner.scss";

export default function MainBanner() {
  return (
    <>
      <div className="main-banner container">
        <div className="row">
          <div className="col-md-6">
            <h2>
              서울시 인구 현황과 행정기관을 <br /> Balance Place에서
              <br />
              한번에 확인하자!
            </h2>
          </div>
          <div className="col-md-6">
            <img src={mainBanner} alt="" />
          </div>
        </div>
      </div>
    </>
  );
}

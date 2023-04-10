import React, { useRef, useState } from "react";
import style from "../../styles/main-tabs-button.scss";
import MainCard from "./MainCard";
import Card from "./Card";

const dataArr = [
  {
    id: 1,
    name: [
      "강남 MICE 관광특구",
      "동대문 관광특구",
      "명동 관광특구",
      "이태원 관광특구",
      "잠실 관광특구",
      "종로·청계 관광특구",
      "홍대 관광특구",
    ],
  },
  {
    id: 2,
    name: [
      "가산디지털단지역",
      "강남역",
      "건대입구역",
      "고속터미널역",
      "교대역",
      "구로디지털단지역",
      "서울역",
      "선릉역",
      "신도림역",
      "신림역",
      "신촌·이대역",
      "역삼역",
      "연신내역",
      "용산역",
      "왕십리역",
    ],
  },
  {
    id: 3,
    name: [
      "낙산공원·이화마을",
      "국립중앙박물관·용산가족공원",
      "남산공원",
      "뚝섬한강공원",
      "망원한강공원",
      "반포한강공원",
      "북서울꿈의숲",
      "서울대공원",
      "서울숲공원",
      "월드컵공원",
      "이촌한강공원",
      "잠실한강공원",
    ],
  },
  {
    id: 4,
    name: [
      "경복궁·서촌마을",
      "광화문·덕수궁",
      "창덕궁·종묘",
      "DMC(디지털미디어시티)",
      "창동 신경제 중심지",
      "노량진",
      "북촌한옥마을",
      "가로수길",
      "성수카페거리",
      "수유리 먹자골목",
      "쌍문동 맛집거리",
      "압구정로데오거리",
      "여의도",
      "영등포 타임스퀘어",
      "인사동·익선동",
      "잠실종합운동장",
    ],
  },
];

export default function MainTabsButton() {
  const dataName = () => {
    dataArr.map((el, idx) => {
      if (el.id === 1) {
        return <Card name={"특구"} key={idx} />;
      } else if (el.id === 2) {
        return <Card name={"지하철"} key={idx} />;
      } else if (el.id === 3) {
        return <Card name={"공원"} key={idx} />;
      } else if (el.id === 4) {
        return <Card name={"관광명소"} key={idx} />;
      }
    });
  };

  return (
    <>
      <div className="container main-tab-wrap">
        <div className="row">
          <ul className="tab-list">
            <li className="tab-item tab-item1">
              <button className="nav-link active">전체보기</button>
            </li>
            <li className="tab-item">
              <button
                className="nav-link"
                onClick={() => {
                  dataName();
                }}
              >
                특구
              </button>
            </li>
            <li className="tab-item">
              <button className="nav-link">공원</button>
              {dataName()}
            </li>
            <li className="tab-item">
              <button className="nav-link">공원</button>
              {dataName()}
            </li>
          </ul>
        </div>
        <div className="row">
          <div className="tab-contents">
            <div className="tab-content tab-content1 show">전체보기 컨텐츠</div>
            <div className="tab-content tab-content2">특구 content</div>
            <div className="tab-content tab-content3">지하철 content</div>
            <div className="tab-content tab-content4">공원 content</div>
          </div>
        </div>
      </div>
    </>
  );
}

import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./Context";
import { FaBookmark, FaRegBookmark, FaTimes } from "react-icons/fa";
import styles from "../../styles/mp-sidebar.scss";
// import axios from 'axios';
import Loding from "./Lodin";
import { BiChevronRight } from "react-icons/bi";
import celsius from "../../../src/assets/celsius.png";
import snow from "../../../src/assets/snow.svg";
import rain from "../../../src/assets/rain.svg";
import clear from "../../../src/assets/clear.svg";

const Sidebar = ({ area, data, weather, isLoading }) => {
  const { isSidebarOpen, closeSidebar, sidebarCategory } = useGlobalContext();

  // const [area, setArea] = useState();
  // const [data, setData] = useState();
  // const [weather, setWeather] = useState();
  // const [isLoading, setIsLoading] = useState(true);
  const [timer, setTimer] = useState("00:00:00");
  const level = data?.AREA_CONGEST_LVL[0];
  const [bookMarkIcon, setbookMarkIcon] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);

  // const point = localStorage.getItem('END_POINT');
  // const getData = async () => {
  //   setIsLoading(true); // 로딩중임을 알림
  //   try {
  //     const res = await axios.post('http://localhost:4000/data/getdata', {
  //       point,
  //     });
  //     res.status === 200 ? console.log(res.status) : console.log(res.json());
  //     const allData = res.data;
  //     console.log(allData);
  //     setArea((cur) => allData.model.area_name);
  //     setData((cur) => allData.model.live_data);
  //     setWeather((cur) => allData.weatherModel);
  //     changeCongestLevel(allData.model.live_data.AREA_CONGEST_LVL[0]);
  //     console.log(congestLevel);
  //   } catch (err) {
  //     console.error(err);
  //   }
  //   setIsLoading(false); // 로딩 완료를 알림
  // };

  // useEffect(() => {
  //   getData();
  //   //10분마다 데이터 갱신 시키기
  //   const reNew = setInterval(() => {
  //     getData();
  //     console.log('데이터 갱신 완료');
  //   }, 600000);
  //   return () => clearInterval(reNew); // unmount 시 interval 해제
  // }, []);

  // 현재 시간 출력

  const currentTimer = () => {
    const date = new Date();
    const hours = String(date.getHours()).padStart(2, "0");
    const minutes = String(date.getMinutes()).padStart(2, "0");
    const seconds = String(date.getSeconds()).padStart(2, "0");
    setTimer(`${hours}:${minutes}:${seconds}`);
  };

  const startTimer = () => {
    setInterval(currentTimer, 1000);
  };
  startTimer();

  // 북마크
  const bookmarkClick = () => {
    setbookMarkIcon(!bookMarkIcon);
    setBookmarks([...bookmarks, { area, data, weather }]);
  };
  // 북마크 삭제
  const handleBookmarkDelete = (idx) => {
    const newBookmarks = [...bookmarks];
    newBookmarks.splice(idx, 1);
    setBookmarks(newBookmarks);
  };

  return (
    <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"} `}>
      {isLoading ? (
        <Loding /> // 로딩중인 동안 렌더링되는 로딩컴포넌트
      ) : (
        <div className="information-wrap">
          {sidebarCategory === "information" && (
            <div className="detail-content">
              <div className="sidebar-header">
                {/* 현재 시간 */}
                <p>
                  현재 시간 <span>{timer}</span> 기준
                </p>
                {/* 현재 위치 */}
                <h1>{area}</h1>
                {/* 닫기 버튼 */}
                <button className="close-btn" onClick={closeSidebar}>
                  <FaTimes />
                </button>
                {/* 북마크 */}
                <button className="bookmark-btn" onClick={bookmarkClick}>
                  {bookMarkIcon ? <FaBookmark /> : <FaRegBookmark />}
                </button>
              </div>
              <div className="detail-information">
                {/* 인구밀집도 */}
                <div className="report-population">
                  <h3>
                    실시간 인구 <BiChevronRight />
                  </h3>
                  <h2>
                    현재 인구 혼잡도는{" "}
                    <span // 붐빔도 레벨로 컬러 색상 지정
                      className={`report-crowded ${
                        data?.AREA_CONGEST_LVL[0] === "여유"
                          ? "green"
                          : data?.AREA_CONGEST_LVL[0] === "보통"
                          ? "yellow"
                          : data?.AREA_CONGEST_LVL[0] === "약간 붐빔"
                          ? "orange"
                          : "red"
                      }`}
                    >
                      {data?.AREA_CONGEST_LVL[0]}
                    </span>{" "}
                    입니다.
                  </h2>
                  <br />
                  <div className="report-crowded-msg">
                    <span>{data?.AREA_CONGEST_MSG[0]}</span>
                  </div>
                </div>

                {/* 날씨 데이터  */}
                <div className="report-weather">
                  <div className="report-live-weather">
                    <h3>
                      실시간 날씨 상황 <BiChevronRight />
                    </h3>
                  </div>
                  <div className="today-weather-wrap">
                    {weather?.pcp_msg === "눈" ? (
                      <img src={snow} alt="snow" />
                    ) : weather?.pcp_msg === "비" ? (
                      <img src={rain} alt="rain" />
                    ) : (
                      <div className="today-weather">
                        <img className="img" src={clear} alt="rain" />
                        <p>오늘의 날씨는 {weather?.pcp_msg}</p>
                      </div>
                    )}
                  </div>
                  <div className="today-weather-detail">
                    {/* 온도계 이미지 */}
                    <div className="temperature-img">
                      <img className="img" src={celsius} alt="temperature" />
                    </div>

                    {/* 최고,최저 기온 메세지 */}
                    {weather?.pcp_msg === "눈" ? (
                      <p>
                        오늘 최고 기온은 {weather?.max_temperature}도 <br />
                        최저 기온은 {weather?.min_temperature}도 이고, <br />
                        눈이 내리는 날씨에는 눈사람 만드는 건 어때요? 😊
                      </p>
                    ) : weather?.pcp_msg === "비" ? (
                      <p>
                        오늘 최고 기온은 {weather?.max_temperature}도 <br />
                        최저 기온은 {weather?.min_temperature}도 이고, <br />
                        우산 꼭 챙기세요! ☂️
                      </p>
                    ) : (
                      <p>
                        오늘 최고 기온은 {weather?.max_temperature}도 <br />
                        최저 기온은 {weather?.min_temperature}도 이고, <br />
                        맑은 하늘을 만나기 좋은 날씨네요! 😎
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </div>
          )}
          {sidebarCategory === "emergency" && (
            <div className="detail-emergency"></div>
          )}
          {sidebarCategory === "bookmark" && bookMarkIcon && (
            <div className="detail-bookmark">
              <h3>북마크된 지역</h3>
              {bookmarks.length > 0 ? (
                bookmarks.map((el, idx) => (
                  <ul key={idx}>
                    <li>{el?.area}</li>
                    <li>날씨: {el?.weather?.pcp_msg}</li>
                    <li>붐빔: {el?.data?.AREA_CONGEST_LVL[0]}</li>
                    <button onClick={() => handleBookmarkDelete(idx)}>
                      삭제
                    </button>
                  </ul>
                ))
              ) : (
                <ul>
                  <li>
                    <p className="text">북마크된 지역이 없습니다.</p>
                  </li>
                </ul>
              )}
            </div>
          )}
        </div>
      )}
    </aside>
  );
};

export default Sidebar;

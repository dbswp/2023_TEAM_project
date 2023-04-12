import React, { useState, useEffect } from "react";
import { useGlobalContext } from "./Context";
import { links } from "./Data";
import { FaTimes } from "react-icons/fa";
import styles from "../../styles/mp-sidebar.scss";
import axios from "axios";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar, sidebarCategory } = useGlobalContext();
  const { openSidebar } = useGlobalContext();
  const [area, setArea] = useState();
  const [data, setData] = useState();
  const [weather, setWeather] = useState();
  const [END_POINT, setEND_POINT] = useState("서울역");

  const getData = async () => {
    const res = await axios.post("http://localhost:4000/data/getdata", {
      END_POINT,
    });
    res.status === 200 ? console.log(res.status) : console.log(res.json());
    const allData = res.data;
    console.log(allData);
    setArea((cur) => allData.data[0].area_name);
    setData((cur) => allData.data[0].live_data);
    setWeather((cur) => allData.weather[0]);
  };

  useEffect(() => {
    console.log("!!!!!!!!!!!");
    getData();
    //10분마다 데이터 갱신 시키기
    const reNew = setInterval(() => {
      getData();
      console.log("데이터 갱신 완료");
    }, 600000);
  }, []);

  return (
    <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>
      <div className="detail-content">
        {sidebarCategory === "location" && (
          <div className="Deatil-location" onClick={closeSidebar}>
            <h1>{area}</h1>
          </div>
        )}
        {sidebarCategory === "population" && (
          <div className="Deatil-population" onClick={closeSidebar}>
            <h2>{data?.AREA_CONGEST_MSG[0]}</h2>
          </div>
        )}
        {sidebarCategory === "weather" && (
          <div className="Deatil-weather" onClick={closeSidebar}>
            <h3>
              오늘 최고 기온은 {weather?.max_temperature}도 <br />
              최저 기온은 {weather?.min_temperature}도 이고, <br />
              현재 체감 온도는 {weather?.sen_temperature}입니다.
            </h3>
          </div>
        )}
      </div>
    </aside>
  );
};

{
  /* <ul className="links">
        {links.map((link) => {
          const { id, url, icon, text } = link;
          return (
            <div key={id}>
              <p href={url}>
                {icon} {text}
              </p>
            </div>
          );
        })}
      </ul> */
}

export default Sidebar;

import React, { Component } from "react";
import { BiMap, BiMenu } from "react-icons/bi";
import { useGlobalContext } from "./Context";
import styles from "../../styles/mp-home.scss";
import { TiWeatherSunny } from "react-icons/ti";
import { IoIosPeople } from "react-icons/io";

const Home = () => {
  const { openSidebar } = useGlobalContext();

  return (
    <main>
      <div className="wrap-container">
        <div className="menubar">
          {/* <button className="sidebar-toggle" onClick={openSidebar} >
            <BiMenu />
          </button> */}
          <button
            className="sidebar-location"
            onClick={() => openSidebar("location")}
          >
            <BiMap />
          </button>
          <button
            className="sidebar-weather"
            onClick={() => openSidebar("weather")}
          >
            <TiWeatherSunny />
          </button>
          <button
            className="sidebar-population"
            onClick={() => openSidebar("population")}
          >
            <IoIosPeople />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;

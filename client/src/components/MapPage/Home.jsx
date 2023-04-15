import React, { Component, useEffect } from "react";
import { BiCurrentLocation, BiMap, BiMenu } from "react-icons/bi";
import { useGlobalContext } from "./Context";
import styles from "../../styles/mp-home.scss";
import { RiAlarmWarningLine } from "react-icons/ri";
import { FaBookmark } from "react-icons/fa";

const Home = () => {
  const { openSidebar, isNeedMyLocation } = useGlobalContext();

  useEffect(() => {
    openSidebar("information");
  }, []);

  return (
    <main>
      <div className="wrap-container">
        <div className="menubar">
          {/* <button className="sidebar-toggle" onClick={openSidebar} >
            <BiMenu />
          </button> */}
          <button
            className="sidebar-information"
            onClick={() => {
              openSidebar("information");
            }}
          >
            <BiMap />
          </button>
          <button
            className="sidebar-emergency"
            onClick={() => openSidebar("emergency")}
          >
            <RiAlarmWarningLine />
          </button>
          <button className="my-location" onClick={isNeedMyLocation}>
            <BiCurrentLocation />
          </button>
          <button
            className="sidebar-bookmark"
            onClick={() => openSidebar("bookmark")}
          >
            <FaBookmark />
          </button>
        </div>
      </div>
    </main>
  );
};

export default Home;

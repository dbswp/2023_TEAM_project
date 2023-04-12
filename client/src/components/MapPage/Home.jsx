import React, { Component } from "react";
import { BiMap, BiMenu } from "react-icons/bi";
import { useGlobalContext } from "./Context";
import styles from "../../styles/mp-home.scss";
import { RiAlarmWarningLine } from "react-icons/ri";

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
            className="sidebar-information"
            onClick={() => openSidebar("information")}
          >
            <BiMap />
          </button>
          <button
            className="sidebar-emergency"
            onClick={() => openSidebar("emergency")}
          >
            <RiAlarmWarningLine />
          </button>
          {/* <button
            className="sidebar-population"
            onClick={() => openSidebar("population")}
          >
            <IoIosPeople />
          </button> */}
        </div>
      </div>
    </main>
  );
};

export default Home;

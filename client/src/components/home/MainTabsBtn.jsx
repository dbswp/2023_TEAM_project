import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import style from "../../styles/main-tabs-wrap.scss";
import MainCard from "../home/MainCard";
import { useEffect, useState } from "react";
// import { useSelector } from "react-redux";
import axios from "axios";

export default function MainTabsBtn() {
  const getData = async () => {
    const res = await axios.get("http://localhost:4000/nameData");
    if (res.status !== 200) alert("데이터 수신 실패");
    const allData = res.data;
    console.log(allData);
  };
  useEffect(() => {
    getData();
  }, []);

  return (
    <div className="container main-tabs-wrap">
      <div className="row">
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="all" title="전체보기">
            <MainCard />
            <MainCard />
            <MainCard />
            <MainCard />
          </Tab>
          <Tab eventKey="area" title="특구">
            <MainCard />
          </Tab>
          <Tab eventKey="park" title="공원">
            <MainCard />
          </Tab>
          <Tab eventKey="station" title="지하철역">
            <MainCard />
          </Tab>

          {/* <Tab eventKey="contact" title="Contact" disabled>
            <Sonnet />
          </Tab> */}
        </Tabs>
      </div>
    </div>
  );
}

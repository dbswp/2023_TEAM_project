import React from "react";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import style from "../../styles/main-tabs-wrap.scss";
import MainCard from "../home/MainCard";

export default function MainTabsBtn() {
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

import React from 'react';
import Tab from 'react-bootstrap/Tab';
import Tabs from 'react-bootstrap/Tabs';
import style from '../../styles/main-tabs-wrap.scss';
import MainCard from '../home/MainCard';
import { useEffect, useState } from 'react';
// import { useSelector } from "react-redux";
import axios from 'axios';
import CategoryCard from './CategoryCard';
import Card from './Card';

export default function MainTabsBtn() {
  const getData = async () => {
    const res = await axios.get('http://localhost:4000/nameData');
    if (res.status !== 200) alert('데이터 수신 실패');
    //지역분류한 데이터
    const allData = res.data.Arr;
    //전체 이름이 들어간 데이터
    const indexData = res.data.dataIndex;
    // console.log(allData);
    setIndexData((cur) => indexData);
    setAllData((cur) => allData);
  };

  useEffect(() => {
    getData();
  }, []);

  const [allData, setAllData] = useState();
  const [indexData, setIndexData] = useState();

  function sibal() {
    for (let item of allData) {
      if (item.id === 2) {
        let a = item.name.dataNmae_STZ;
        a.map((el, idx) => <CategoryCard name={el} key={idx} />);
      }
    }
  }

  return (
    <div className="container main-tabs-wrap">
      <div className="row">
        <Tabs
          defaultActiveKey="profile"
          id="uncontrolled-tab-example"
          className="mb-3"
        >
          <Tab eventKey="all" title="전체보기">
            {indexData?.map((el, idx) => {
              return <Card name={el} key={idx} />;
            })}
          </Tab>
          <Tab eventKey="area" title="특구">
            {allData?.map((el, idx) => {
              if (el.id === 1) return <CategoryCard key={idx} name={el.name} />;
            })}
          </Tab>
          <Tab eventKey="park" title="공원" onClick={sibal}>
            {allData?.map((el, idx) => {
              if (el.id === 2) return <CategoryCard key={idx} name={el.name} />;
            })}
          </Tab>
          <Tab eventKey="station" title="지하철역">
            {allData?.map((el, idx) => {
              if (el.id === 3) return <CategoryCard key={idx} name={el.name} />;
            })}
          </Tab>

          {/* <Tab eventKey="contact" title="Contact" disabled>
            <Sonnet />
          </Tab> */}
        </Tabs>
      </div>
    </div>
  );
}

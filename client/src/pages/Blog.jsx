import React from "react";
import NaverMaps from "../components/MapPage/NaverMaps";
import { Container as MapDiv } from "react-naver-maps";
import Sidebar from "../components/MapPage/Sidebar";
import Detail from "../components/MapPage/Detail";
import Modal from "../components/MapPage/Modal";
import Home from "../components/MapPage/Home";
import styles from "../styles/mp-blog.scss";

export default function Blog() {
  return (
    <>
      <Home />
      <Modal />
      <Sidebar />
      <Detail />
      <MapDiv
        style={{
          width: "100%",
          height: "90vh",
        }}
      >
        <NaverMaps />
      </MapDiv>
    </>
  );
}

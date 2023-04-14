import React from "react";
import NaverMaps from "../components/MapPage/NaverMaps";
import { Container as MapDiv } from "react-naver-maps";
import Sidebar from "../components/MapPage/Sidebar";
import Home from "../components/MapPage/Home";
import "../styles/mp-blog.scss";

export default function Blog() {
  return (
    <>
      <MapDiv
        style={{
          width: "100%",
          height: "90vh",
        }}
      >
        <Home />
        <Sidebar />
        <NaverMaps />
      </MapDiv>
    </>
  );
}

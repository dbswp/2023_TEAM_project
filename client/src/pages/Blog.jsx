import React from "react";
import NaverMaps from "../components/MapPage/NaverMaps";
import { Container as MapDiv } from "react-naver-maps";
import Sidebar from "../components/MapPage/Sidebar";
import Detail from "../components/MapPage/Detail";

export default function Blog() {
  return (
    <>
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

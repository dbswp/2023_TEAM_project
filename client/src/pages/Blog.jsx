import React from "react";
import NaverMaps from "../components/MapPage/NaverMaps";
import { Container as MapDiv } from "react-naver-maps";

export default function Blog() {
  return (
    <>
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

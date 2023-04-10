import React from "react";
import { BiMap } from "react-icons/bi";
import { TiWeatherSunny } from "react-icons/ti";
import { IoIosPeople } from "react-icons/io";

export const links = [
  {
    id: 1,
    url: "/",
    text: "실시간",
    icon: <BiMap />,
  },
  {
    id: 2,
    url: "/projects",
    text: "XXX 날씨 정보",
    icon: <TiWeatherSunny />,
  },
  {
    id: 3,
    url: "/calendar",
    text: "실시간 인구혼잡도",
    icon: <IoIosPeople />,
  },
];

import React from "react";
import MainBanner from "../components/home/MainBanner";
import MainTabsButton from "../components/home/MainTabsButton";
import Header from "../components/common/Header/Header";

export default function Home() {
  return (
    <>
      <Header name="container" />
      <MainBanner />
      <MainTabsButton />
    </>
  );
}

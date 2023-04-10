import React from "react";
import { BiMenu } from "react-icons/bi";
import { useGlobalContext } from "./Context";
import styles from "../../styles/mp-home.scss";

const Home = () => {
  const { openSidebar, openModal } = useGlobalContext();

  return (
    <main>
      <div className="wrap-container">
        <button className="sidebar-toggle" onClick={openSidebar}>
          <BiMenu />
        </button>
        <button className="btn" onClick={openModal}></button>
      </div>
    </main>
  );
};

export default Home;

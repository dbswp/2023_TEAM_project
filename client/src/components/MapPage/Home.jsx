import React from "react";
import { BiMenu } from "react-icons/bi";
import { useGlobalContext } from "./Context";
import styles from "../../styles/mp-home.scss";

const Home = () => {
  const { openSidebar } = useGlobalContext();

  return (
    <main>
      <div className="wrap-container">
        <button className="sidebar-toggle" onClick={openSidebar}>
          <BiMenu />
        </button>
      </div>
    </main>
  );
};

export default Home;

import React from "react";
import { useGlobalContext } from "./Context";
import { links } from "./Data";
import { FaTimes } from "react-icons/fa";
import styles from "../../styles/mp-sidebar.scss";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>

      {/* <ul className="links">
        {links.map((link) => {
          const { id, url, icon, text } = link;
          return (
            <div key={id}>
              <p href={url}>
                {icon} {text}
              </p>
            </div>
          );
        })}
      </ul> */}
    </aside>
  );
};

export default Sidebar;

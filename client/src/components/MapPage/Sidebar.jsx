import React from "react";
import { useGlobalContext } from "./Context";
import { links } from "./Data";
import styles from "../../styles/mp-sidebar.scss";
import { FaTimes } from "react-icons/fa";

const Sidebar = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>

      <div className="links">
        {links.map((link) => {
          const { id, url, icon, text } = link;
          return (
            <div className="live-data" key={id}>
              <p href={url}>
                {icon} {text}
              </p>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

export default Sidebar;

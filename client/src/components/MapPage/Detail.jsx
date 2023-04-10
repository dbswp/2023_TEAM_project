import React from "react";
import { useGlobalContext } from "./Context";
import { FaTimes } from "react-icons/fa";
import { links } from "./Data";

const Detail = () => {
  const { isSidebarOpen, closeSidebar } = useGlobalContext();

  return (
    <aside className={`${isSidebarOpen ? "sidebar show-sidebar" : "sidebar"}`}>
      <div className="sidebar-header">
        <button className="close-btn" onClick={closeSidebar}>
          <FaTimes />
        </button>
      </div>

      {/* 사이드바 메뉴 목록 */}
      <ul className="links">
        {links.map((link) => {
          const { id, url, text } = link;
          return (
            <li key={id}>
              <a href={url}>{text}</a>
            </li>
          );
        })}
      </ul>
    </aside>
  );
};

export default Detail;

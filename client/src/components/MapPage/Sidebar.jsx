import React from "react";
import { BiMenu } from "react-icons/bi";
import styled from "styled-components";
import { useGlobalContext } from "./Context";

const Sidebar = () => {
  const { isModalOpen, closeModal } = useGlobalContext();

  return (
    <div
      className={`${
        isModalOpen ? "modal-overlay show-modal" : "modal-overlay"
      }`}
    >
      <div className="modal-container">
        <h3>modal content</h3>
        {/* 나기기 버튼 */}
        <button className="close-modal-btn" onClick={closeModal}>
          <BiMenu />
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

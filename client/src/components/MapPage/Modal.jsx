import React from "react";
import { BiMenu } from "react-icons/bi";
import { useGlobalContext } from "./Context";

export default function Modal() {
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
}

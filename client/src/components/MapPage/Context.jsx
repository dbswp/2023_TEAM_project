import React, { useContext, useState } from "react";

const AppContext = React.createContext();

// 여러 component에서 사용할 수 있는 Provider생성
const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openSidebar = () => {
    setIsSidebarOpen(true);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const openModal = () => {
    setIsModalOpen(true);
  };
  const closeModal = () => {
    setIsModalOpen(false);
  };

  return (
    <AppContext.Provider
      value={{
        isModalOpen,
        isSidebarOpen,
        openModal,
        openSidebar,
        closeModal,
        closeSidebar,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
// custom hook
// 다른 component에서 매번 useContext(AppContext)를
// 사용하지 않고 useGlobalContext으로 사용하기 (앞에 use를 사용하지 않으면 error)
export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

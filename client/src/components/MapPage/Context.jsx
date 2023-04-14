import React, { useContext, useState } from 'react';

const AppContext = React.createContext();

const AppProvider = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [sidebarCategory, setSidebarCategory] = useState();
  const [wantMyLocation, setWantMyLocation] = useState(false);

  const openSidebar = (sidebarCategory) => {
    setIsSidebarOpen(true);
    setSidebarCategory(sidebarCategory);
  };
  const closeSidebar = () => {
    setIsSidebarOpen(false);
  };

  const isNeedMyLocation = () => {
    setWantMyLocation((cur) => !cur);
  };
  return (
    <AppContext.Provider
      value={{
        isSidebarOpen,
        sidebarCategory,
        openSidebar,
        closeSidebar,
        wantMyLocation,
        isNeedMyLocation,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useGlobalContext = () => {
  return useContext(AppContext);
};

export { AppContext, AppProvider };

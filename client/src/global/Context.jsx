import React, { createContext, useState } from "react";
export const StockContext = createContext();

const StockContextProvider = ({ children }) => {



  return (
    <StockContext.Provider
      value={{}}
    >
      {children}
    </StockContext.Provider>
  );
};

export default StockContextProvider;
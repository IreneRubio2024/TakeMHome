import React, { createContext, useState, useContext } from "react";
const WhishesContext = createContext();

export function WhishesProvider({ children }) {
  const [whishes, setWhishes] = useState([]);
  const addWhish = (whish) => {
    setWhishes((prev) => [...prev, whish]);
  };

  return (
    <WhishesContext.Provider value={{ whishes, addWhish }}>
      {children}
    </WhishesContext.Provider>
  );
}

export function useWhishesContext() {
  return useContext(WhishesContext);
}

export { WhishesContext };

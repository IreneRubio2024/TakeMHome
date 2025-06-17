import React, { createContext, useState, useContext } from "react";
import cykel from "../assets/images/cykel.png";
import byro from "../assets/images/byro.png";
import minions from "../assets/images/minions.jpg";
import piano from "../assets/images/piano.png";

const GiftContext = createContext();

export function GiftProvider({ children }) {
  const [gifts, setGifts] = useState([
    {
      id: 1,
      name: "Cykel",
      description: "Häftig damm cykel, mycket mer att ge. Först till kvar!",
      image: cykel,
    },
    {
      id: 2,
      name: "Minions",
      description: "tre styck Minios figurer",
      image: minions,
    },
    {
      id: 3,
      name: "Äldre byrå",
      description: "lite gammal men helt fungerande",
      image: byro,
    },
    {
      id: 3,
      name: "Piano",
      description: "söker en ny hem",
      image: piano,
    },
  ]);

  const addGift = (gift) => {
    setGifts((prev) => [...prev, gift]);
  };

  return (
    <GiftContext.Provider value={{ gifts, addGift }}>
      {children}
    </GiftContext.Provider>
  );
}

export function useGiftContext() {
  return useContext(GiftContext);
}

export { GiftContext };

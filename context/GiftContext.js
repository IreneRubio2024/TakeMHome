import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import cykel from "../assets/images/cykel.png";
import byro from "../assets/images/byro.png";
import minions from "../assets/images/minions.jpg";
import piano from "../assets/images/piano.png";

const GiftContext = createContext();
const GIFTS_STORAGE_KEY = "take-me-home:gifts";

const initialGifts = [
  {
    id: 1,
    name: "Cykel",
    description: "Haftig damm cykel, mycket mer att ge. Forst till kvar!",
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
    name: "Aldre byra",
    description: "lite gammal men helt fungerande",
    image: byro,
  },
  {
    id: 4,
    name: "Piano",
    description: "soker en ny hem",
    image: piano,
  },
];

export function GiftProvider({ children }) {
  const [gifts, setGifts] = useState(initialGifts);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadGifts = async () => {
      try {
        const raw = await AsyncStorage.getItem(GIFTS_STORAGE_KEY);
        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setGifts(parsed);
        }
      } catch (error) {
        console.warn("Failed to load gifts from storage", error);
      } finally {
        setIsHydrated(true);
      }
    };

    loadGifts();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const saveGifts = async () => {
      try {
        await AsyncStorage.setItem(GIFTS_STORAGE_KEY, JSON.stringify(gifts));
      } catch (error) {
        console.warn("Failed to save gifts in storage", error);
      }
    };

    saveGifts();
  }, [gifts, isHydrated]);

  const addGift = (gift) => {
    setGifts((prev) => [...prev, gift]);
  };

  const removeGift = (giftId) => {
    if (giftId == null) {
      return false;
    }

    let removed = false;
    setGifts((prev) => {
      const next = prev.filter((gift) => gift.id !== giftId);
      removed = next.length !== prev.length;
      return next;
    });

    return removed;
  };

  return (
    <GiftContext.Provider value={{ gifts, addGift, removeGift }}>
      {children}
    </GiftContext.Provider>
  );
}

export function useGiftContext() {
  return useContext(GiftContext);
}

export { GiftContext };

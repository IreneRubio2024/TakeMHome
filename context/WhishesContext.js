import React, { createContext, useEffect, useState, useContext } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
const WhishesContext = createContext();
const WHISHES_STORAGE_KEY = "take-me-home:whishes";

export function WhishesProvider({ children }) {
  const [whishes, setWhishes] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadWhishes = async () => {
      try {
        const raw = await AsyncStorage.getItem(WHISHES_STORAGE_KEY);
        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setWhishes(parsed);
        }
      } catch (error) {
        console.warn("Failed to load whishes from storage", error);
      } finally {
        setIsHydrated(true);
      }
    };

    loadWhishes();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const saveWhishes = async () => {
      try {
        await AsyncStorage.setItem(
          WHISHES_STORAGE_KEY,
          JSON.stringify(whishes),
        );
      } catch (error) {
        console.warn("Failed to save whishes in storage", error);
      }
    };

    saveWhishes();
  }, [isHydrated, whishes]);

  const addWhish = (whish) => {
    setWhishes((prev) => [...prev, whish]);
  };

  const reserveWhish = (whish) => {
    if (!whish || whish.id == null) {
      return;
    }

    setWhishes((prev) => {
      const alreadyReserved = prev.some((item) => item.id === whish.id);
      if (alreadyReserved) {
        return prev;
      }

      return [...prev, whish];
    });
  };

  const removeWhish = (whishId) => {
    if (whishId == null) {
      return false;
    }

    let removed = false;
    setWhishes((prev) => {
      const next = prev.filter((item) => item.id !== whishId);
      removed = next.length !== prev.length;
      return next;
    });

    return removed;
  };

  return (
    <WhishesContext.Provider
      value={{ whishes, addWhish, reserveWhish, removeWhish }}
    >
      {children}
    </WhishesContext.Provider>
  );
}

export function useWhishesContext() {
  return useContext(WhishesContext);
}

export { WhishesContext };

import React, { createContext, useContext, useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";

const MessagesContext = createContext();
const MESSAGES_STORAGE_KEY = "take-me-home:messages";

export function MessagesProvider({ children }) {
  const [messages, setMessages] = useState([]);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    const loadMessages = async () => {
      try {
        const raw = await AsyncStorage.getItem(MESSAGES_STORAGE_KEY);
        if (!raw) {
          return;
        }

        const parsed = JSON.parse(raw);
        if (Array.isArray(parsed)) {
          setMessages(parsed);
        }
      } catch (error) {
        console.warn("Failed to load messages from storage", error);
      } finally {
        setIsHydrated(true);
      }
    };

    loadMessages();
  }, []);

  useEffect(() => {
    if (!isHydrated) {
      return;
    }

    const saveMessages = async () => {
      try {
        await AsyncStorage.setItem(
          MESSAGES_STORAGE_KEY,
          JSON.stringify(messages),
        );
      } catch (error) {
        console.warn("Failed to save messages in storage", error);
      }
    };

    saveMessages();
  }, [isHydrated, messages]);

  const sendMessage = ({ item, body }) => {
    const text = (body || "").trim();
    if (!text) {
      return false;
    }

    const outgoing = {
      id: Date.now(),
      type: "sent",
      subject: item?.name || "Gift request",
      body: text,
      itemId: item?.id ?? null,
      itemName: item?.name || "Unknown item",
      from: "You",
      to: "Owner",
      createdAt: new Date().toISOString(),
      read: true,
    };

    setMessages((prev) => [outgoing, ...prev]);
    return true;
  };

  const receiveMessage = ({
    subject,
    body,
    from,
    itemId = null,
    itemName = "General",
  }) => {
    const incoming = {
      id: Date.now(),
      type: "inbox",
      subject: subject || itemName,
      body: (body || "").trim(),
      itemId,
      itemName,
      from: from || "User",
      to: "You",
      createdAt: new Date().toISOString(),
      read: false,
    };

    setMessages((prev) => [incoming, ...prev]);
  };

  const createDemoIncoming = () => {
    receiveMessage({
      subject: "Interested in your gift",
      body: "Hi! I would like to pick this item up tomorrow afternoon. Is it still available?",
      from: "Anna R.",
      itemName: "Gift from your listings",
    });
  };

  const markAsRead = (id) => {
    setMessages((prev) =>
      prev.map((msg) => (msg.id === id ? { ...msg, read: true } : msg)),
    );
  };

  return (
    <MessagesContext.Provider
      value={{
        messages,
        sendMessage,
        receiveMessage,
        createDemoIncoming,
        markAsRead,
      }}
    >
      {children}
    </MessagesContext.Provider>
  );
}

export function useMessagesContext() {
  return useContext(MessagesContext);
}

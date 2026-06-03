import React from "react";
import { Text, View } from "react-native";

export default function AppToast({ visible, message, type = "success" }) {
  if (!visible || !message) {
    return null;
  }

  const toneClass =
    type === "error"
      ? "bg-rose-600 border-rose-700"
      : type === "warning"
        ? "bg-amber-500 border-amber-600"
        : "bg-emerald-600 border-emerald-700";

  return (
    <View
      className="absolute bottom-24 left-4 right-4 items-center"
      pointerEvents="none"
    >
      <View className={`max-w-[92%] px-4 py-3 rounded-2xl border ${toneClass}`}>
        <Text className="text-white text-center font-KronaOne text-xs">
          {message}
        </Text>
      </View>
    </View>
  );
}

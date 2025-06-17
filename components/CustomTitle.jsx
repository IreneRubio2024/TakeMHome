import { View, Text } from "react-native";

export default function CustomTitle() {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          color: "#1EFF00",
          fontFamily: "KronaOne",
        }}
      >
        TmH
      </Text>
      <Text
        style={{
          fontSize: 16,
          color: "#D9D9D9",
          fontStyle: "italic",
        }}
      >
        "grab it tightly release it lightly"
      </Text>
    </View>
  );
}

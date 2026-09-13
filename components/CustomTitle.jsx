import { View, Text } from "react-native";

export default function CustomTitle() {
  return (
    <View style={{ alignItems: "flex-start" }}>
      <Text
        style={{
          fontSize: 18,
          letterSpacing: 0.5,
          color: "#FFF7F3",
          fontFamily: "KronaOneRegular",
        }}
      >
        TAKE ME HOME
      </Text>
      <Text
        style={{
          marginTop: 4,
          fontSize: 10,
          color: "#FDD9CC",
          letterSpacing: 0.5,
        }}
      >
        GIVE MORE. WASTE LESS.
      </Text>
    </View>
  );
}

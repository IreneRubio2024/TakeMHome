import { View, Text } from "react-native";

export default function CustomTitle() {
  return (
    <View style={{ alignItems: "center" }}>
      <Text
        style={{
          fontSize: 24,
          letterSpacing: 1,
          color: "#FFF7F3",
          fontFamily: "KronaOneRegular",
        }}
      >
        TAKE ME HOME
      </Text>
      <Text
        style={{
          marginTop: 2,
          fontSize: 11,
          color: "#FDD9CC",
          letterSpacing: 0.5,
        }}
      >
        GIVE MORE. WASTE LESS.
      </Text>
    </View>
  );
}

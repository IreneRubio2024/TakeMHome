import React from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  ImageBackground,
  StyleSheet,
} from "react-native";

import "../global.css";
import { useRouter } from "expo-router";

export default function Home() {
  const router = useRouter();
  return (
    <ImageBackground
      source={require("../assets/images/fondoindex.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.content}>
        <View className="bg-white/30 p-10">
          <Text className="font-KronaOne" style={styles.textLine1}>
            Welcome to
          </Text>
          <Text className="font-KronaOne" style={styles.textLine}>
            TAKE
          </Text>
          <Text className="font-KronaOne" style={styles.textLine2}>
            me
          </Text>
          <Text className="font-KronaOne" style={styles.textLine}>
            HOME
          </Text>
        </View>
        <TextInput
          placeholder="Email"
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TextInput
          placeholder="Password"
          style={styles.input}
          placeholderTextColor="#888"
        />

        <TouchableOpacity
          style={styles.button}
          onPress={() => {
            router.replace("/(tabs)/home");
          }}
        >
          <Text className="font-KronaOne text-white p-1">Login</Text>
        </TouchableOpacity>

        <TouchableOpacity>
          <Text className="text-white" style={styles.linkText}>
            Don't have an account? Sign up
          </Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.googleButton}>
          <Text className="text-white" style={styles.googleText}>
            Sign in with Google
          </Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  background: {
    flex: 1,
    justifyContent: "center",
  },
  overlay: {
    ...StyleSheet.absoluteFillObject,
    backgroundColor: "rgba(30, 30, 30, 0.8)",
  },
  content: {
    alignItems: "center",
    padding: 20,
  },
  textContainer: {
    backgroundColor: "rgba (255, 99, 27, 0.8)",
    paddingHorizontal: 15,

    marginBottom: 30,
    alignItems: "center",
  },
  textLine: {
    fontSize: 38,

    color: "#1EFF00",

    paddingStart: 10,
  },
  textLine1: {
    fontSize: 20,
   
    color: "white",
  },
  textLine2: {
    fontSize: 20,
 
    color: "#1EFF00",

    paddingStart: 62,
  },
  input: {
    width: "60%",
    height: 40,
    backgroundColor: "#fff",
    marginVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
    fontFamily: "MontserratVariable",
  },
  button: {
    backgroundColor: "#005DFF",
    padding: 7,
    borderRadius: 20,
    marginTop: 10,
    width: "60%",
    alignItems: "center",
    height: 40,
  },
  buttonText: {
    color: "#fff",
    fontWeight: "40",
  },
  link: {
    marginTop: 12,
    textDecorationLine: "underline",
  },
});

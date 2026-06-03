import React, { useState } from "react";
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
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", password: "", form: "" });

  const validate = () => {
    const nextErrors = { email: "", password: "", form: "" };
    const emailValue = email.trim();

    if (!emailValue) {
      nextErrors.email = "Email is required.";
    } else if (!/^\S+@\S+\.\S+$/.test(emailValue)) {
      nextErrors.email = "Use a valid email format.";
    }

    if (!password) {
      nextErrors.password = "Password is required.";
    } else if (password.length < 6) {
      nextErrors.password = "Password must be at least 6 characters.";
    }

    if (nextErrors.email || nextErrors.password) {
      nextErrors.form = "Please review the fields above.";
      setErrors(nextErrors);
      return false;
    }

    setErrors(nextErrors);
    return true;
  };

  const handleLogin = () => {
    const isValid = validate();
    if (!isValid) {
      return;
    }

    router.replace("/(tabs)/home");
  };

  return (
    <ImageBackground
      source={require("../assets/images/fondoindex.png")}
      style={styles.background}
      resizeMode="cover"
    >
      <View style={styles.overlay} />

      <View style={styles.wrapper}>
        <View style={styles.brandBlock}>
          <Text style={styles.brandTop}>COMMUNITY MARKET</Text>
          <Text style={styles.brandTitle}>TAKE ME HOME</Text>
          <Text style={styles.brandSub}>
            Find local gifts and give things a second life.
          </Text>
        </View>

        <View style={styles.card}>
          <Text style={styles.cardTitle}>Welcome back</Text>
          <Text style={styles.cardSubtitle}>
            This login is demo-only for now.
          </Text>

          <TextInput
            placeholder="Email"
            style={[styles.input, errors.email ? styles.inputError : null]}
            placeholderTextColor="#94A3B8"
            keyboardType="email-address"
            autoCapitalize="none"
            value={email}
            onChangeText={(value) => {
              setEmail(value);
              if (errors.email || errors.form) {
                setErrors((prev) => ({ ...prev, email: "", form: "" }));
              }
            }}
          />
          {!!errors.email && (
            <Text style={styles.errorText}>{errors.email}</Text>
          )}

          <TextInput
            placeholder="Password"
            style={[styles.input, errors.password ? styles.inputError : null]}
            placeholderTextColor="#94A3B8"
            secureTextEntry
            value={password}
            onChangeText={(value) => {
              setPassword(value);
              if (errors.password || errors.form) {
                setErrors((prev) => ({ ...prev, password: "", form: "" }));
              }
            }}
          />
          {!!errors.password && (
            <Text style={styles.errorText}>{errors.password}</Text>
          )}

          {!!errors.form && <Text style={styles.formError}>{errors.form}</Text>}

          <TouchableOpacity style={styles.primaryButton} onPress={handleLogin}>
            <Text style={styles.primaryButtonText}>Enter app</Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.secondaryButton}>
            <Text style={styles.secondaryButtonText}>Continue with Google</Text>
          </TouchableOpacity>

          <TouchableOpacity>
            <Text style={styles.linkText}>No account yet? Create one</Text>
          </TouchableOpacity>
        </View>
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
    backgroundColor: "rgba(2, 6, 23, 0.62)",
  },
  wrapper: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 20,
    paddingVertical: 28,
  },
  brandBlock: {
    marginBottom: 20,
    alignItems: "center",
    maxWidth: 420,
    width: "100%",
  },
  brandTop: {
    color: "#E2E8F0",
    fontSize: 12,
    letterSpacing: 2,
    marginBottom: 8,
  },
  brandTitle: {
    color: "#F8FAFC",
    fontSize: 34,
    textAlign: "center",
    letterSpacing: 1,
    fontFamily: "KronaOneRegular",
  },
  brandSub: {
    color: "#E2E8F0",
    marginTop: 10,
    textAlign: "center",
    fontSize: 14,
    maxWidth: 320,
    lineHeight: 20,
  },
  card: {
    backgroundColor: "rgba(255, 248, 244, 0.95)",
    borderRadius: 24,
    padding: 20,
    borderWidth: 1,
    borderColor: "#E7D7CF",
    maxWidth: 420,
    width: "100%",
  },
  cardTitle: {
    color: "#0F172A",
    fontSize: 20,
    fontFamily: "KronaOneRegular",
  },
  cardSubtitle: {
    color: "#64748B",
    marginTop: 6,
    marginBottom: 14,
    fontSize: 13,
  },
  input: {
    backgroundColor: "#FFF8F4",
    borderRadius: 14,
    borderWidth: 1,
    borderColor: "#E7D7CF",
    height: 46,
    paddingHorizontal: 14,
    marginBottom: 10,
    color: "#0F172A",
  },
  inputError: {
    borderColor: "#DC2626",
  },
  errorText: {
    color: "#DC2626",
    fontSize: 12,
    marginBottom: 8,
    marginTop: -2,
  },
  formError: {
    color: "#991B1B",
    fontSize: 12,
    marginTop: -2,
    marginBottom: 6,
  },
  primaryButton: {
    backgroundColor: "#B85C38",
    borderRadius: 14,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    marginTop: 6,
  },
  primaryButtonText: {
    color: "#FFFFFF",
    fontFamily: "KronaOneRegular",
    fontSize: 12,
    letterSpacing: 0.5,
  },
  secondaryButton: {
    marginTop: 10,
    borderRadius: 14,
    height: 46,
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: "#DCC7BC",
    backgroundColor: "#FFF8F4",
  },
  secondaryButtonText: {
    color: "#334155",
    fontSize: 13,
    fontWeight: "600",
  },
  linkText: {
    marginTop: 14,
    color: "#475569",
    textAlign: "center",
    fontSize: 13,
  },
});

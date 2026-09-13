import {
  DarkTheme,
  DefaultTheme,
  ThemeProvider,
} from "@react-navigation/native";
import { useFonts } from "expo-font";
import * as SplashScreen from "expo-splash-screen";
import { useEffect, useState } from "react";
import { GluestackUIProvider } from "@/components/ui/gluestack-ui-provider";
import { useColorScheme } from "@/components/useColorScheme";
import { Slot } from "expo-router";
import Head from "expo-router/head";
import { GiftProvider } from "../context/GiftContext";
import "../global.css";
import { WhishesProvider } from "../context/WhishesContext";
import { MessagesProvider } from "../context/MessagesContext";

export {
  ErrorBoundary,
} from "expo-router";


SplashScreen.preventAutoHideAsync();

export default function RootLayout() {
  const [loaded, error] = useFonts({
    KronaOneRegular: require("../assets/fonts/KronaOne-Regular.ttf"),
  });

  const [styleLoaded, setStyleLoaded] = useState(false);
  
  useEffect(() => {
    if (error) throw error;
  }, [error]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
    }
  }, [loaded]);



  return <RootLayoutNav />;
}

function RootLayoutNav() {
  const colorScheme = useColorScheme();

  return (
    <MessagesProvider>
      <WhishesProvider>
        <GiftProvider>
          <GluestackUIProvider mode={colorScheme === "dark" ? "dark" : "light"}>
            <ThemeProvider
              value={colorScheme === "dark" ? DarkTheme : DefaultTheme}
            >
              <Head>
                <title>Take Me Home</title>
              </Head>
              <Slot />
            </ThemeProvider>
          </GluestackUIProvider>
        </GiftProvider>
      </WhishesProvider>
    </MessagesProvider>
  );
}

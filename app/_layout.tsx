import AuthContextProvider from "@/Context/AuthContext";
import MarvelApiProvider from "@/Context/marvelApiContext";
import { useFonts } from "expo-font";
import { Stack } from "expo-router";
import { StatusBar } from "expo-status-bar";
import "react-native-reanimated";
import { SafeAreaView } from "react-native-safe-area-context";
import "../global.css";

export default function RootLayout() {
  const [loaded] = useFonts({
    BebasNeue: require("../assets/fonts/BebasNeue-Regular.ttf"),
  });

  if (!loaded) {
    // Async font loading only occurs in development.
    return null;
  }

  return (
    <AuthContextProvider>
      <MarvelApiProvider>
        <SafeAreaView className="bg-marvelousRed h-full">
          <Stack>
            <Stack.Screen name="(stack)" options={{ headerShown: false }} />
          </Stack>
        </SafeAreaView>
        <StatusBar style="auto" />
      </MarvelApiProvider>
    </AuthContextProvider>
  );
}

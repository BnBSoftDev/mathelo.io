import { useFonts } from "expo-font";
import { SplashScreen, Stack } from "expo-router";
import { useEffect } from "react";

export default function RootLayout() {
  const [loaded, error] = useFonts({
    'Pix': require('../assets/fonts/kongtext.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
    if (error) {
      console.error('Error loading font:', error);
    }
  }, [loaded, error]);

  if (!loaded && !error) {
    return null;
  }

  return (
    <Stack>
      <Stack.Screen name="index" options={{
        title: "Home",
        headerShown: false,
      }} />
      <Stack.Screen name="loadingGame" options={{
        title: "Loading",
        headerShown: false,
      }} />
      <Stack.Screen name="game" options={{
        title: "Game",
        headerShown: false,
      }} />
    </Stack>
  );
}

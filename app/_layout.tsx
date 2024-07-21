import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={
        {
          title: "Home",
          headerShown: false
        }
      } />
      <Stack.Screen name="loadingGame" options={
        {
          title: "loading",
          headerShown: false
        }
      } />
      <Stack.Screen name="game" options={
        {
          title: "game",
          headerShown: false
        }
      } />
      
    </Stack>
  );
}

import { Stack } from "expo-router";
import React from "react";
import { COLORS } from "../constants/Theme";
import { TaskProvider } from "../context/TaskContext";

export default function RootLayout() {
  return (
    <TaskProvider>
      <Stack
        screenOptions={{
          headerStyle: {
            backgroundColor: COLORS.background,
          },
          headerTintColor: COLORS.text,
          headerTitleStyle: {
            fontWeight: "bold",
          },
          contentStyle: {
            backgroundColor: COLORS.background,
          },
        }}
      >
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
        <Stack.Screen name="+not-found" />
      </Stack>
    </TaskProvider>
  );
}

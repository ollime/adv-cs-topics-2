import React from "react";
// import { Text } from "react-native";
import { LinearGradient } from "expo-linear-gradient";

export default function Gradient({ children }: { children: JSX.Element }) {
  return (
    <LinearGradient
      start={{ x: 0, y: 0.75 }}
      end={{ x: 1, y: 0.25 }}
      colors={["#3210c9", "#7bd1ed"]}>
      {children}
    </LinearGradient>
  );
}

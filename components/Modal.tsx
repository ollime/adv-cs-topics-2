import React from "react";
import { Pressable, View, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

// TODO: If using this later, add in parameter for JSX content
// TODO: Move to components folder
export default function Modal({ childContent }: { childContent: JSX.Element }) {
  return (
    <Animated.View
      entering={FadeIn}
      style={{
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000040",
      }}>
      {/* Dismiss modal when pressing outside */}
      <Link href={"/"} asChild>
        <Pressable style={StyleSheet.absoluteFill} />
      </Link>
      <Animated.View
        entering={SlideInDown}
        style={{
          width: "80%",
          height: "80%",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "white",
          borderRadius: "0.75rem",
        }}>
        <View className="dark:bg-lightDark flex w-full flex-1 rounded-xl bg-background">
          {childContent}
        </View>
      </Animated.View>
    </Animated.View>
  );
}

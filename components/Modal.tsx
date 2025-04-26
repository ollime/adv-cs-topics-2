import React from "react";
import { Pressable, View, ScrollView, StyleSheet } from "react-native";
import { Link } from "expo-router";
import Animated, { FadeIn, SlideInDown } from "react-native-reanimated";

export default function Modal({ childContent }: { childContent: JSX.Element }) {
  return (
    <View className="flex w-full flex-1">
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
          <ScrollView
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}
            className="flex w-full flex-1 flex-wrap rounded-xl bg-background dark:bg-lightDark">
            {childContent}
          </ScrollView>
        </Animated.View>
      </Animated.View>
    </View>
  );
}

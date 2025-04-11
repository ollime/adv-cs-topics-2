import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";

export default function NavBar() {
  return (
    <>
      <View className="primary-gradient-r flex flex-row flex-wrap">
        <NavBarButton route={"/"} label={"test"}></NavBarButton>
        <NavBarButton route={"secondPage"}></NavBarButton>
        <NavBarButton route={"settings"}></NavBarButton>
      </View>
    </>
  );
}

function NavBarButton({ route, label }: { route: string; label?: string }) {
  return (
    <>
      <Link
        href={route}
        className="flex h-[60px] w-auto min-w-[100px] flex-1 items-center justify-center">
        <Text className="text-lg font-medium text-white">
          {label ? label : route}
        </Text>
      </Link>
    </>
  );
}

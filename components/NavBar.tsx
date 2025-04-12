/**
 * @overview Tab navigation bar
 */

import React from "react";
import { View, Text } from "react-native";
import { Link } from "expo-router";
import Gradient from "./Gradient";

/**
 * Navigation bar
 */
export default function NavBar() {
  return (
    <>
      <Gradient>
        <View className="flex flex-row flex-wrap">
          <NavBarButton route={"/"} label={"test"}></NavBarButton>
          <NavBarButton route={"secondPage"}></NavBarButton>
          <NavBarButton route={"settings"}></NavBarButton>
        </View>
      </Gradient>
    </>
  );
}

/**
 * Displays a Link with specified route.
 * @param route Route name
 * @param label Optional label if display text should be different than route
 */
function NavBarButton({ route, label }: { route: string; label?: string }) {
  return (
    <>
      <View className="flex-1">
        <Link
          href={route}
          // adjust the height of the navbar and min width of each button here
        >
          <View className="flex h-[60px] w-auto min-w-[100px] items-center justify-center">
            <Text className="text-lg font-medium text-white">
              {label ? label : route}
            </Text>
          </View>
        </Link>
      </View>
    </>
  );
}

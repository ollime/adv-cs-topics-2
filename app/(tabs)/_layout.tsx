/** @overview Main page tab layout with custom navbar */

import React from "react";
import { Tabs } from "expo-router";
import NavBar from "./../../components/NavBar";

export default function TabLayout() {
  return (
    <>
      <Tabs
        screenOptions={{
          animation: "fade",
          tabBarStyle: {
            // Hides default tab navigation
            display: "none",
          },
        }}>
        {/* This defines headers at the top of the page */}
        <Tabs.Screen
          name="(main)"
          options={{
            title: "events",
          }}></Tabs.Screen>
        <Tabs.Screen
          name="index"
          options={{
            title: "home",
          }}></Tabs.Screen>
      </Tabs>

      {/* Custom navbar */}
      <NavBar></NavBar>
    </>
  );
}

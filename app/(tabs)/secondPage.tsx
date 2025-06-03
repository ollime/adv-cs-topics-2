/** secondPage is a test page that loads the most basic
 * React Native page.
 *
 * This page is useful for debugging, as it can help determine
 * if an error is due to recently written code or React Native / Metro
 * config and setup. Its associated test file can also be used as a
 * template to write tests for other modules and files.
 *
 * It should be deleted for production builds.
 */

import React from "react";
import { View, Text } from "react-native";

export default function secondPage() {
  return (
    <View className="flex flex-1 bg-background dark:bg-backgroundDark">
      <Text>Test</Text>
    </View>
  );
}

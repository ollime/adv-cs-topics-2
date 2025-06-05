/** @overview Alert popup that closes when clicked on.
 *
 * This alert will show up in the page itself, and it
 * can be dismissed by clicking on the X button. However,
 * error handling code should be written so that the user
 * cannot bypass important alerts by having the alert show
 * up again until the problem is resolved.
 */

import React from "react";
import { View, Text, Pressable } from "react-native";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

export default function Alert({
  label,
  hidden,
  setHidden,
}: {
  label: string;
  hidden: boolean;
  setHidden: (hide: boolean) => void;
}) {
  const [hide, setHide] = React.useState<boolean>(hidden);
  const hideAlert = () => {
    setHidden(false);
    setHide(true);
  };

  React.useEffect(() => {
    if (hidden !== undefined && hidden !== hide) {
      setHide(hidden);
    }
  }, [hidden]);

  return (
    <>
      {!hide ? (
        <>
          <View className="m-5 mx-10 flex flex-row items-center justify-between rounded-lg border border-red-400 bg-red-100 p-4">
            <View className="flex flex-1 flex-row">
              <Text className="mr-1 font-bold text-red-500">WARNING: </Text>
              <Text className="text-red-500">{label}</Text>
            </View>
            <Pressable onPress={hideAlert}>
              <MaterialIcons name="close" size={24} color="red" />
            </Pressable>
          </View>
        </>
      ) : (
        ""
      )}
    </>
  );
}

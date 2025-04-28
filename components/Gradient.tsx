/** Container with a gradient.
 *
 * To size the gradient, change the size of the children elements. */

import React from "react";
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

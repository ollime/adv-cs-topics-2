/** @type {import('tailwindcss').Config} */

import nativewindPreset from "nativewind/preset"

export default {
  content: ["./App.{js,ts,tsx}", "./components/**/*.{js,ts,tsx}"],

  presets: [nativewindPreset],
  theme: {
    extend: {
      colors: {
        midnight: "#00171F",
        sky: "#00A7E1",
        offwhite: "#EBF7FF",
        primary: "#0a97c4",
        secondary: "#003459",
      },
    },
  },
  plugins: [],
};

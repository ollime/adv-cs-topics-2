import Gradient from "javascript-color-gradient";

type ColorKey =
  | "red-400"
  | "orange-400"
  | "green-400"
  | "blue-400"
  | "purple-400"
  | "primary"
  | "secondary";

const colors: Record<ColorKey, string> = {
  "red-400": "#f87171",
  "purple-400": "#a855f7",
  "orange-400": "#fb923c",
  "blue-400": "#60a5fa",
  "green-400": "#4ade80",
  primary: "#3210C9",
  secondary: "#7BD1ED",
};

export function getAdjacentColor(color: ColorKey) {
  if (colors[color]) {
    const keys = Object.keys(colors) as ColorKey[];
    const index = keys.indexOf(color);
    if (index === keys.length - 1) {
      return [colors["secondary"], colors["primary"]];
    } else {
      return [colors[color], colors[keys[index + 1]]];
    }
  }
}

export function getGradientColors(color: ColorKey) {
  const gradientArray = new Gradient()
    .setColorGradient(colors[color], getAdjacentColor(color)[1])
    .getColors();
  return gradientArray;
}

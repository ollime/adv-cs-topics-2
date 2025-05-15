import { Color } from "../types";

export function getSecondaryColor(color: Color) {
  let red = color[0];
  let green = color[1];
  let blue = color[2];
  const max = Math.max(red, green, blue);
}

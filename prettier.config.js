import { createRequire } from "node:module";
const require = createRequire(import.meta.url);
const modulePath = require.resolve("prettier-plugin-tailwindcss");

export default {
  printWidth: 80,
  tabWidth: 2,
  singleQuote: false,
  bracketSameLine: true,
  trailingComma: "es5",

  plugins: [modulePath],
  tailwindAttributes: ["className"],
};

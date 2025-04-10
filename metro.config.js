import expoConfig from "expo/metro-config"
import nativewindConfig from "nativewind/metro"

const { getDefaultConfig } = expoConfig;
const { withNativeWind } = nativewindConfig;

// eslint-disable-next-line no-undef
const config = getDefaultConfig(__dirname);

export default withNativeWind(config, { input: "./global.css" });

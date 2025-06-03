import AsyncStorage from "@react-native-async-storage/async-storage";

/**
 * Converts unix time to date string
 * @param unixTimestamp
 * @returns date string
 */
export async function convertUnixToDate(unixTimestamp: number) {
  const unformattedDate = new Date(unixTimestamp * 1000);
  const dateFormat = await getDateFormat();
  return formatDate(unformattedDate, dateFormat);
}

/**
 * Converts seconds to days.
 * @param time seconds
 * @returns time in days
 */
export function convertSecondsToDays(time: number) {
  return Math.floor(time / 60 / 60 / 24);
}

export function calculateTime(startTime?: number, endTime?: number) {
  if (startTime && endTime) {
    return convertSecondsToDays(endTime - startTime); // time elapsed
  } else if (startTime) {
    return convertSecondsToDays(Date.now() / 1000 - startTime); // time since
  } else if (endTime) {
    return convertSecondsToDays(endTime - Date.now() / 1000); // time until
  }
  return 0;
}

export function formatDate(date: Date, options: Intl.DateTimeFormatOptions) {
  return date.toLocaleDateString(undefined, options);
}

export async function getDateFormat() {
  const longYearFormat = await getData("longYearFormat");
  const monthFormat = await getData("monthFormat");
  const longDayFormat = await getData("longDayFormat");
  const options: Intl.DateTimeFormatOptions = {
    hour12: false,
    year: longYearFormat == "true" ? "numeric" : "2-digit",
    month: monthFormat as "2-digit" | "numeric" | "long" | "short" | "narrow",
    day: longDayFormat == "true" ? "2-digit" : "numeric",
  };
  return options;
}

const getData = async (key: string) => {
  try {
    const value = await AsyncStorage.getItem(key);
    if (value !== null) {
      return value;
    }
  } catch (e) {
    console.log(e);
  }
};

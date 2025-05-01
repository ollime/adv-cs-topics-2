/**
 * Converts unix time to date string
 * @param unixTimestamp
 * @returns date string
 */
export function convertUnixToDate(unixTimestamp: number) {
  return new Date(unixTimestamp * 1000).toLocaleDateString();
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

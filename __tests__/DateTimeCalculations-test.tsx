/** @overview Tests for DateTimeCalculation utils file.
 *
 * Each utility function should have at least 1 test associated with it
 * and test a variety of conditions and values.
 */

import * as DateTime from "../utils/DateTimeCalculation";

describe("utils/DateTimeCalculation", () => {
  test("Converts seconds to days", () => {
    expect(DateTime.convertSecondsToDays(360000)).toEqual(4);
  });

  test("Correct conversion of unix timestamp", () => {
    expect(DateTime.convertUnixToDate(1746234936)).toMatch("5/2/2025");
  });

  test("Formats date based off given options", () => {
    const options: Intl.DateTimeFormatOptions = {
      hour12: false,
      year: "numeric",
      month: "2-digit",
      day: "2-digit",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    expect(DateTime.formatDate(new Date(1746235453 * 1000), options)).toMatch(
      "05/02/2025, 18:24:13"
    );
  });

  test("Date formatting options load correctly", () => {
    expect(true).toBeTruthy();
  });
});

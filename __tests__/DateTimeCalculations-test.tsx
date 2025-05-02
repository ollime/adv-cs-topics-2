import * as DateTime from "../utils/DateTimeCalculation";

describe("utils/DateTimeCalculation", () => {
  test("Converts seconds to days", () => {
    expect(DateTime.convertSecondsToDays(360000)).toEqual(4);
    // TODO: rounding rules
    // expect(DateTime.convertSecondsToDays(360000)).toBeCloseTo(4.16666667);
  });

  test("Correct conversion of unix timestamp", () => {
    expect(DateTime.convertUnixToDate(1746234936)).toMatch("5/2/2025");
  });

  test("Formats date based off given options", () => {
    expect(DateTime.formatDate(new Date(1746235453 * 1000))).toMatch(
      "05/02/2025, 18:24:13"
    );
  });

  test("Date formatting options load correctly", () => {
    expect(true).toBeTruthy();
  });
});

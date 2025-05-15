/** Contains information about each event. */
export interface ListItem {
  key: string;
  color?: string;
  description?: string;
  type?: "since" | "until" | "elapsed" | string;
  // times stored as unix timestamp
  startTime?: number;
  endTime?: number;
}

/** RGB values stored as an array */
export type Color = [number, number, number];

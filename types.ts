export interface ListItem {
  key: string;
  color?: string;
  /** TODO: determine time formatting later */
  // TODO: delete time and calculate instead
  time?: number;
  description?: string;
  type?: "since" | "until" | "elapsed" | string;
  // times stored as unix timestamp
  startTime?: number;
  endTime?: number;
}

export interface ListItem {
  key: string;
  color?: string;
  type?: "since" | "until" | "elapsed" | string;
  /** TODO: determine time formatting later */
  time?: number;
  description?: string;
}

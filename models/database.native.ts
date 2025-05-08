import * as SQLite from "expo-sqlite";

export async function createDatabase() {
  const db = await SQLite.openDatabaseAsync("databaseName");
  return db;
}

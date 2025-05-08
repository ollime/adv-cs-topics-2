import * as SQLite from "expo-sqlite";
const db = await SQLite.openDatabaseAsync("databaseName");

export async function createDatabase() {
  await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS test
      (
        title TEXT PRIMARY KEY NOT NULL,
        color TEXT,
        description TEXT,
        type TEXT,
        startTime INTEGER,
        endTime INTEGER
      );
    INSERT INTO test (title, color, description, type, startTime, endTime) VALUES ('quarter','red','description','elapsed',0,0);
    `);
}

export async function getRow() {
  return await db.getFirstAsync("SELECT * FROM test;");
}

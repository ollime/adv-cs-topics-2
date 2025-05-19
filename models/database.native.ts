import * as SQLite from "expo-sqlite";

let db: SQLite.SQLiteDatabase | null = null;

async function initializeDatabase() {
  db = await SQLite.openDatabaseAsync("databaseName");
}

initializeDatabase()
  .then(async () => {
    await db.execAsync(`
    PRAGMA journal_mode = WAL;
    CREATE TABLE IF NOT EXISTS test (id INTEGER PRIMARY KEY NOT NULL, value TEXT NOT NULL, intValue INTEGER);
    INSERT INTO test (value, intValue) VALUES ('test1', 123);
    INSERT INTO test (value, intValue) VALUES ('test2', 456);
    INSERT INTO test (value, intValue) VALUES ('test3', 789);
    `);
  })
  .then(async () => {
    const result = await db.runAsync(
      "INSERT INTO test (value, intValue) VALUES (?, ?)",
      "aaa",
      100
    );
    alert(result.lastInsertRowId + result.changes);
  });

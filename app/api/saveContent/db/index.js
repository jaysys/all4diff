// db/index.js
const sqlite3 = require("sqlite3").verbose();
const db = new sqlite3.Database("./richtext.db");

db.serialize(() => {
  db.run(`
    CREATE TABLE IF NOT EXISTS content (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      data TEXT NOT NULL
    )
  `);
});

module.exports = db;

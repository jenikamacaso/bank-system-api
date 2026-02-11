import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.resolve(__dirname, '../../bank.db');

const db = new sqlite3.Database(dbPath, (err) => {
  if (err) {
    console.error('DB connection error:', err);
  } else {
    console.log('SQLite connected');
  }
});

/* Create tables automatically */
db.serialize(() => {
  // Accounts table
  db.run(`
    CREATE TABLE IF NOT EXISTS accounts (
      accountNumber TEXT PRIMARY KEY,
      customerName TEXT NOT NULL,
      accountType TEXT NOT NULL,
      accountStatus TEXT NOT NULL,
      dateCreated TEXT NOT NULL
    )
  `);

  // Users table
  db.run(`
    CREATE TABLE IF NOT EXISTS users (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      username TEXT UNIQUE,
      password TEXT NOT NULL
    )
  `);

  // Seed default users (admin / staff)
  const defaultUsers = [
    { username: 'admin', password: 'password123' },
    { username: 'staff', password: 'password456' },
  ];

  const stmt = db.prepare(`INSERT OR IGNORE INTO users (username, password) VALUES (?, ?)`);

  for (const user of defaultUsers) {
    stmt.run(user.username, user.password);
  }

  stmt.finalize(() => {
    console.log('Default users seeded (admin / staff)');
  });
});

export default db;

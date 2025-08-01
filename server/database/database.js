const sqlite3 = require('sqlite3').verbose();
const path = require('path');

// Check if we're in production (using PostgreSQL) or development (using SQLite)
const isProduction = process.env.NODE_ENV === 'production';
const usePostgres = process.env.DATABASE_URL && process.env.DATABASE_URL.startsWith('postgresql://');

let db;
let dbType;

if (usePostgres) {
  // Use PostgreSQL in production
  const { Pool } = require('pg');
  db = new Pool({
    connectionString: process.env.DATABASE_URL,
    ssl: process.env.NODE_ENV === 'production' ? { rejectUnauthorized: false } : false
  });
  dbType = 'postgresql';
  console.log('Connected to PostgreSQL database');
} else {
  // Use SQLite in development
  const dbPath = path.join(__dirname, '../../data/receipts.db');
  db = new sqlite3.Database(dbPath, (err) => {
    if (err) {
      console.error('Error opening database:', err.message);
    } else {
      console.log('Connected to SQLite database');
    }
  });
  dbType = 'sqlite';
}

// Initialize database tables
async function initDatabase() {
  if (dbType === 'postgresql') {
    await initPostgresTables();
  } else {
    initSqliteTables();
  }
}

// Initialize PostgreSQL tables
async function initPostgresTables() {
  try {
    // Create ledger table
    await db.query(`
      CREATE TABLE IF NOT EXISTS ledger (
        id SERIAL PRIMARY KEY,
        email_id TEXT,
        email_subject TEXT,
        email_date TEXT,
        merchant_name TEXT,
        amount DECIMAL(10,2),
        date TEXT,
        category TEXT,
        description TEXT,
        receipt_text TEXT,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Ledger table created or already exists');

    // Create email_processing_log table
    await db.query(`
      CREATE TABLE IF NOT EXISTS email_processing_log (
        id SERIAL PRIMARY KEY,
        email_id TEXT UNIQUE,
        processed_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        status TEXT,
        error_message TEXT
      )
    `);
    console.log('Email processing log table created or already exists');

    // Create reconciliation_history table
    await db.query(`
      CREATE TABLE IF NOT EXISTS reconciliation_history (
        id SERIAL PRIMARY KEY,
        total_matches INTEGER DEFAULT 0,
        total_ledger_only INTEGER DEFAULT 0,
        total_bank_only INTEGER DEFAULT 0,
        total_matched_amount DECIMAL(10,2) DEFAULT 0,
        total_ledger_amount DECIMAL(10,2) DEFAULT 0,
        total_bank_amount DECIMAL(10,2) DEFAULT 0,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log('Reconciliation history table created or already exists');
  } catch (error) {
    console.error('Error initializing PostgreSQL tables:', error);
  }
}

// Initialize SQLite tables
function initSqliteTables() {
  db.serialize(() => {
    // Create ledger table
    db.run(`
      CREATE TABLE IF NOT EXISTS ledger (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email_id TEXT,
        email_subject TEXT,
        email_date TEXT,
        merchant_name TEXT,
        amount DECIMAL(10,2),
        date TEXT,
        category TEXT,
        description TEXT,
        receipt_text TEXT,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating ledger table:', err.message);
      } else {
        console.log('Ledger table created or already exists');
      }
    });

    // Create email_processing_log table
    db.run(`
      CREATE TABLE IF NOT EXISTS email_processing_log (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        email_id TEXT UNIQUE,
        processed_at DATETIME DEFAULT CURRENT_TIMESTAMP,
        status TEXT,
        error_message TEXT
      )
    `, (err) => {
      if (err) {
        console.error('Error creating email_processing_log table:', err.message);
      } else {
        console.log('Email processing log table created or already exists');
      }
    });

    // Create reconciliation_history table
    db.run(`
      CREATE TABLE IF NOT EXISTS reconciliation_history (
        id INTEGER PRIMARY KEY AUTOINCREMENT,
        total_matches INTEGER DEFAULT 0,
        total_ledger_only INTEGER DEFAULT 0,
        total_bank_only INTEGER DEFAULT 0,
        total_matched_amount DECIMAL(10,2) DEFAULT 0,
        total_ledger_amount DECIMAL(10,2) DEFAULT 0,
        total_bank_amount DECIMAL(10,2) DEFAULT 0,
        created_at DATETIME DEFAULT CURRENT_TIMESTAMP
      )
    `, (err) => {
      if (err) {
        console.error('Error creating reconciliation_history table:', err.message);
      } else {
        console.log('Reconciliation history table created or already exists');
      }
    });
  });
}

// Helper function to run queries with promises
function runQuery(sql, params = []) {
  if (dbType === 'postgresql') {
    return db.query(sql, params);
  } else {
    return new Promise((resolve, reject) => {
      db.run(sql, params, function(err) {
        if (err) {
          reject(err);
        } else {
          resolve({ id: this.lastID, changes: this.changes });
        }
      });
    });
  }
}

// Helper function to get single row
function getRow(sql, params = []) {
  if (dbType === 'postgresql') {
    return db.query(sql, params).then(result => result.rows[0]);
  } else {
    return new Promise((resolve, reject) => {
      db.get(sql, params, (err, row) => {
        if (err) {
          reject(err);
        } else {
          resolve(row);
        }
      });
    });
  }
}

// Helper function to get multiple rows
function getAll(sql, params = []) {
  if (dbType === 'postgresql') {
    return db.query(sql, params).then(result => result.rows);
  } else {
    return new Promise((resolve, reject) => {
      db.all(sql, params, (err, rows) => {
        if (err) {
          reject(err);
        } else {
          resolve(rows);
        }
      });
    });
  }
}

module.exports = {
  db,
  runQuery,
  getRow,
  getAll,
  initDatabase
}; 
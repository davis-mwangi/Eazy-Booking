
// db.js
const { Pool } = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
  console.log('connected to the db');
});

/**
 * Create Hotels Table
 */
const createHotelsTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      hotels(
        id UUID PRIMARY KEY,
        name VARCHAR(100) NOT NULL,
        description VARCHAR(1000) NOT NULL,
        location VARCHAR (200) NOT NULL,
        conference_halls INT NOT NULL,
        capacity INT NOT NULL,
        owner_id UUID NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP,
        FOREIGN KEY (owner_id) REFERENCES users (id) ON DELETE CASCADE
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Create User Table
 */
const createUsersTable = () => {
  const queryText =
    `CREATE TABLE IF NOT EXISTS
      users(
        id UUID PRIMARY KEY,
        name VARCHAR(50) NOT NULL,
        phone_no VARCHAR(20) NULL,
        email VARCHAR(128) UNIQUE NOT NULL,
        password VARCHAR(128) NOT NULL,
        created_date TIMESTAMP,
        modified_date TIMESTAMP
      )`;

  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}

/**
 * Drop Reflection Table
 */
const dropHotelsTable = () => {
  const queryText = 'DROP TABLE IF EXISTS hotels returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
/**
 * Drop User Table
 */
const dropUsersTable = () => {
  const queryText = 'DROP TABLE IF EXISTS users returning *';
  pool.query(queryText)
    .then((res) => {
      console.log(res);
      pool.end();
    })
    .catch((err) => {
      console.log(err);
      pool.end();
    });
}
/**
 * Create All Tables
 */
const createAllTables = () => {
  createUsersTable();
  createHotelsTable();
}
/**
 * Drop All Tables
 */
const dropAllTables = () => {
  dropUsersTable();
  dropHotelsTable();
}

pool.on('remove', () => {
  console.log('client removed');
  process.exit(0);
});


module.exports = {
  createHotelsTable,
  createUsersTable,
  createAllTables,
  dropUsersTable,
  dropHotelsTable,
  dropAllTables
};

require('make-runnable');

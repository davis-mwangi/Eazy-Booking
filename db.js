const { Pool} = require('pg');
const dotenv = require('dotenv');

dotenv.config();

const pool =  new Pool({
    connectionString: process.env.DATABASE_URL
});

pool.on('connect', () => {
    console.log('Connected to the db');
});

/**
 * Create tables
 */
const createTables = () => {
    const queryText = 
        `CREATE TABLE  IF NOT EXISTS
        hotels(
            id UUID PRIMARY KEY,
            name VARCHAR(100) NOT NULL,
            description VARCHAR(1000) NOT NULL,
            location VARCHAR (200) NOT NULL,
            conference_halls INT NOT NULL,
            capacity INT NOT NULL,
            date_created TIMESTAMP,
            date_modified TIMESTAMP
        )`;
    pool.query(queryText)
      .then((res) => {
          console.log(res);
          pool.end();
      })
      .catch((err)=>{
          console.log(err);
          pool.end();
      });  
}

/**
 * Drop Tables
 */
const dropTables = () => {
    const queryText =  'DROP TABLE IF EXISTS hotels';
    pool.query(queryText)
      .then((res) => {
          console.log(res);
          pool.end();
      })
      .catch((err)=> {
          console.log(err);
          pool.end();
      });
}

pool.on('remove', () => {
    console.log('client removed');
    process.exit(0);
});

module.exports = {
    createTables,
    dropTables
};
require('make-runnable');
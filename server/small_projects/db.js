const { Pool } = require("pg");

const pool = new Pool({
  user: "postgres",         // your Postgres user
  host: "localhost",        // database server
  database: "node_learning",// database name
  password: "root",// your Postgres password
  port: 5432,               // default Postgres port
});

module.exports = pool;




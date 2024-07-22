const mysql = require("pg");

// Open the connection to MySQL server
const connection = mysql.createConnection({
  multipleStatements: true,
  host: "postgres.vribtpkclmbrfzhlqkru",
  user: "postgres.vribtpkclmbrfzhlqkru",
  database: "jobwork",
  port: 51609,
  password: "eBd45613Adcda3E5E2g1B6e6E4hdB1dg",
});

// const query = 'SELECT * FROM users'
// const query = 'SHOW TABLES'
// const query = 'CREATE DATABASE railway'
// const query = "USE jobwork; SELECT * FROM users;"
// const query = "USE jobwork; SELECT * FROM users;"
// const query = 'USE jobwork; DROP TABLE Uses;'
// const query = 'USE jobwork; SELECT * FROM Uses;'
// const query = 'USE jobwork; DESCRIBE Uses;'
const query= `SHOW DATABASES`
//SELECT * FROM User; SHOW TABLES  DROP TABLE users
connection.query(
  query,
  function (err, results) {
    console.log(results);
    console.log(err);
  }
);

// connection.query(
//     `DROP DATABASE YourDatabaseName`,
//     function (err, results) {
//       console.log(results);
//       console.log(err);
//     }
//   );

// connection.query(
//     `CREATE DATABASE jobwork`,
//     function (err, results) {
//       console.log(results);
//       console.log(err);
//     }
//   );

// Close the connection
connection.end();

import mysql from "mysql";

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
});

pool.query("CREATE DATABASE IF NOT EXISTS gymnastic", (err) => {
  if (err) {
    console.error("Error creating database:", err);
    return;
  }
  console.log("Database Created");

  //Connect to Database
  //   pool.query("", (err, results) => {
  //     if (err) {
  //       console.error("Error executing query:", err);
  //       return;
  //     }
  //   });

  //Create Table
  const createUserTableQuery = `
  USE gymnastic;
  
  CREATE TABLE IF NOT EXISTS users (
    id INT AUTO_INCREMENT PRIMARY KEY UNIQUE,
    firstName VARCHAR(255) NOT NULL,
    lastName VARCHAR(255) NOT NULL, 
    email VARCHAR(255) NOT NULL,
    password VARCHAR(255) NOT NULL
  );`;
  pool.query(createUserTableQuery, (err) => {
    if (err) {
      console.error("Error creating table:", err);
      return;
    }
    console.log("Table Created");
  });
});

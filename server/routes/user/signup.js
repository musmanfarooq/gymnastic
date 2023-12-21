import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../../index.js";

const router = express.Router();

router.post("/signup", async (req, res) => {
  const { firstName, lastName, email, password } = req.body;

  // Validate input
  if (!firstName || !lastName || !email || !password) {
    return res.status(400).json({ error: "Please fill all the fields" });
  }

  try {
    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Check if user already exists
    pool.query(
      "SELECT * FROM users WHERE email = ?",
      [email],
      (error, results) => {
        if (error) {
          console.error("Error during signup:", error);
          return res.status(500).json({ error: "Internal Server Error" });
        }
        if (results.length > 0) {
          return res.status(400).json({ error: "User already exists." });
        }
        // Insert the user into the database
        pool.query(
          "INSERT INTO users (firstName, lastName, email, password) VALUES (?, ?, ?, ?)",
          [firstName, lastName, email, hashedPassword],
          (error, results) => {
            if (error) {
              console.error("Error during signup:", error);
              return res.status(500).json({ error: "Internal Server Error" });
            }
            res.status(201).json({ message: "Account Created successfully." });
          }
        );
      }
    );
  } catch (error) {
    console.error("Error during password hashing:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
});

export default router;

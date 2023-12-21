import express from "express";
import bcrypt from "bcrypt";
import { pool } from "../../index.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.post("/signin", (req, res) => {
  const { email, password } = req.body;

  // Validate input
  if (!email || !password) {
    return res.status(400).json({ error: "email and password are required." });
  }
  // Check if the user exists
  pool.query(
    "SELECT * FROM users WHERE email = ?",
    [email],
    async (error, results) => {
      if (error) {
        console.error("Error during login:", error);
        return res.status(500).json({ error: "Internal Server Error" });
      }

      if (results.length === 0) {
        return res.status(401).json({ error: "User not found" });
      }

      // Compare the password
      const match = await bcrypt.compare(password, results[0].password);

      if (!match) {
        return res.status(401).json({ error: "Invalid email or password." });
      }
      // Create and send a JWT token
      const token = jwt.sign(
        {
          firstName: results[0].firstName,
          lastName: results[0].lastName,
          email: results[0].email,
        },
        process.env.SECRET_KEY,
        { expiresIn: "1h" }
      );
      res.json({ token });
    }
  );
});

export default router;

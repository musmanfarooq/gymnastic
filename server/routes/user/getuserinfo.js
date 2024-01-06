import express from "express";
import jwt from "jsonwebtoken";
import { pool } from "../../index.js";

const router = express.Router();

router.post("/getuserinfo", (req, res) => {
  const { token } = req.body;
  const userDetail = jwt.verify(token, process.env.SECRET_KEY);
  // Create Api to join two user tables and send data to frontend if found
  pool.query(
    "SELECT users.*, userinfo.* FROM users JOIN userinfo ON users.userId = userinfo.userId WHERE users.userId = ?",
    [userDetail.userId],
    (err, result) => {
      if (err) {
        res.status(500).json({ error: "User not found Please Try again." });
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

export default router;

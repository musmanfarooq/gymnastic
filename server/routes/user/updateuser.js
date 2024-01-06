import express from "express";
import { pool } from "../../index.js";
import jwt from "jsonwebtoken";

const router = express.Router();

router.put("/updateuserinfo", (req, res) => {
  const {
    token,
    firstName,
    lastName,
    email,
    age,
    gender,
    height_ft,
    height_in,
    phone_no,
    address,
    weight,
  } = req.body;
  const userDetail = jwt.verify(token, process.env.SECRET_KEY);
  const id = userDetail.userId;
  // Update the userinfo table based on id
  pool.query(
    "UPDATE userinfo SET age = ?, gender = ?, weight = ?,  height_ft = ?, height_in = ?, phone_no = ?, address = ? WHERE userId = ?",
    [age, gender, weight, height_ft, height_in, phone_no, address, id],
    async (err, result) => {
      if (err) {
        console.log(err);
        res.status(400).json({ err: "Error updating user info." });
      } else {
        pool.query(
          "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE userId = ?",
          [firstName, lastName, email, id],
          async (err, result) => {
            if (err) {
              console.log(err);
              res.status(400).json({ err: "Error updating user info." });
            } else {
              res.status(200).json({ message: "User info updated." });
            }
          }
        );
      }
    }
  );
});

export default router;

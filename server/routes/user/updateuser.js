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
  pool.getConnection((err, connection) => {
    if (err) {
      console.log(err);
      res.status(500).json({ err: "Error establishing database connection." });
      return;
    }

    connection.beginTransaction((err) => {
      if (err) {
        console.log(err);
        res.status(500).json({ err: "Error starting database transaction." });
        return connection.release();
      }

      // Update userinfo table
      connection.query(
        "UPDATE userinfo SET age = ?, gender = ?, weight = ?, height_ft = ?, height_in = ?, phone_no = ?, address = ? WHERE userId = ?",
        [age, gender, weight, height_ft, height_in, phone_no, address, id],
        (err, result) => {
          if (err) {
            console.log(err);
            return connection.rollback(() => {
              res.status(400).json({ err: "Error updating user info." });
              connection.release();
            });
          }

          // Update users table
          connection.query(
            "UPDATE users SET firstName = ?, lastName = ?, email = ? WHERE userId = ?",
            [firstName, lastName, email, id],
            (err, result) => {
              if (err) {
                console.log(err);
                return connection.rollback(() => {
                  res.status(400).json({ err: "Error updating user info." });
                  connection.release();
                });
              }

              // Commit the transaction if both updates were successful
              connection.commit((err) => {
                if (err) {
                  console.log(err);
                  return connection.rollback(() => {
                    res
                      .status(500)
                      .json({ err: "Error committing database transaction." });
                    connection.release();
                  });
                }

                res.status(200).json({ message: "User info updated." });
                connection.release();
              });
            }
          );
        }
      );
    });
  });
});

export default router;

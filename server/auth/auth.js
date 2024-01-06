import jwt from "jsonwebtoken";
import { pool } from "../index.js";

const authorization = async (req, res, next) => {
  try {
    const token = req.body.token;
    const decoded = jwt.verify(token, process.env.SECRET_KEY);
    const userId = decoded.userId;

    //Check if token is expires
    if (decoded.exp < Date.now() / 1000) {
      return res.status(401).json({
        error: "Unauthorized Token Expired",
      });
    }

    pool.query(
      "SELECT * FROM users WHERE userId = ?",
      [userId],
      (error, results) => {
        if (error) {
          throw error;
        }
        if (results.length === 0) {
          res.status(401).json({
            error: "Unauthorized",
          });
        } else {
          req.userId = userId;
          next();
        }
      }
    );
  } catch (error) {
    console.error("Error during authorization:", error);
    res.status(401).json({
      error: "Unauthorized",
    });
  }
};

export default authorization;

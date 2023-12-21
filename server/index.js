import express from "express";
import bodyParser from "body-parser";
import mysql from "mysql";
import cors from "cors";
import signup from "./routes/user/signup.js";
import signin from "./routes/user/signin.js";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

dotenv.config();

const app = express();
const port = process.env.PORT;

const corsOrigin = {
  origin: "http://localhost:3000",
  credentials: true,
  optionSuccessStatus: 200,
};

app.use(express.json());

app.use(cors(corsOrigin));

app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());

app.use(cookieParser());

export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  // password:""
  database: "gymnastic",
});

pool.getConnection((err, connection) => {
  if (err) {
    console.error("Error connecting to MySQL:", err);
    return;
  }
  console.log("Connected to MySQL database!");

  connection.release();
});

app.get("/", (req, res) => {
  res.send("Api is working fine");
});

app.post("/signup", signup);

app.post("/signin", signin);

app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});

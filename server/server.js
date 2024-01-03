import express from "express";
import cors from "cors";
import Database from "better-sqlite3";
const db = new Database("database.db");

const app = express();
app.use(express.json());
app.use(cors());

app.listen(8080, function () {
  console.log("Server listening at http://localhost:8080");
});

app.get("/", function (req, res) {
  res.json("You are in the root of the server");
});

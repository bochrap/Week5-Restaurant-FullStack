import express, { response } from "express";
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

app.get("/menu", function (req, res) {
  const menuItems = db.prepare(`SELECT * FROM menu`).all();
  res.json(menuItems);
});

app.get("/order", function (req, res) {
  const menuItems = db.prepare(`SELECT * FROM foodorder`).all();
  res.json(menuItems);
});

// app.post("/order", function (req, res) {
//   const name = req.body.name;
//   const price = req.body.price;

//   const newEntry = db
//     .prepare(`INSERT INTO foodorder (name, price) VALUES (?, ?)`)
//     .run(name, price);
//   res.json(newEntry);
// });

app.post("/order", function (req, res) {
  const name = req.body.name;
  const price = req.body.price;

  const newEntry = db
    .prepare(`INSERT INTO foodorder (name, price) VALUES (?, ?)`)
    .run(name, price);

  // Fetch the inserted item from the database
  const insertedItem = db
    .prepare(`SELECT * FROM foodorder WHERE id = ?`)
    .get(newEntry.lastInsertRowid);

  res.json(insertedItem);
});

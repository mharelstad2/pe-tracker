require("dotenv").config();
const express = require("express");
const path = require("path");
const { Pool } = require("pg");

require("dotenv").config();

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  ssl: {
    rejectUnauthorized: false,
  },
});

const app = express();
const PORT = process.env.PORT || 5163;

app
  .use(express.static(path.join(__dirname, "public")))
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .set("views", path.join(__dirname, "views"))
  .set("view engine", "ejs")
  .get("/", async (req, res) => {
    try {
      const client = await pool.connect();
      const buttonSql = "SELECT * FROM buttons ORDER BY id ASC;";
      const buttons = await client.query(buttonSql);
      const args = {
        buttons: buttons ? buttons.rows : null,
        time: Date.now(),
      };
      res.render("pages/index", args);
    } catch (err) {
      console.error(err);
      res.set({
        "Content-Type": "application/json",
      });
      res.json({
        error: err,
      });
    }
  })
  .post("/log", async (req, res) => {
    res.set({
      "Content-Type": "application/json",
    });

    try {
      const client = await pool.connect();
      const id = req.body.id;
      const insertSql = `INSERT INTO log (button_id, at) VALUES ($1, NOW()) RETURNING id AS new_id;`;

      const insert = await client.query(insertSql, [id]);

      const response = {
        newId: insert ? insert.rows[0] : null,
        when: { localtime: new Date() },
      };
      res.json(response); // Fixed the syntax error here
    } catch (err) {
      console.error(err);
      res.json({
        error: err,
      });
    }
  })
  .listen(PORT, () => console.log(`Listening on ${PORT}`));

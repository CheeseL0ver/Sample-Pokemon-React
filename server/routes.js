const express = require("express");
const router = express.Router();
const mysql = require("mysql");

const connection = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "Knex"
});

router.get("/", (req, res) => {
  res.json({
    message: "Hello world"
  });
});

router.get("/pokemon", (req, res) => {
  connection.query("SELECT * FROM Pokemon", (error, results, fields) => {
    res.json({ message: results });
  });
});

router.get("/pokemon/:id", (req, res) => {
  connection.query(
    `SELECT * FROM Pokemon INNER JOIN Pokemon_Flavor ON Pokemon.id=Pokemon_Flavor.species_id WHERE id='${req.params.id}'`,
    (error, results, fields) => {
      if (results.length === 0)
        results = `No results for pokemon with id ${req.params.id}`;
      res.json({ message: results });
    }
  );
});

router.get("/moves", (req, res) => {
  connection.query("SELECT * FROM Move", (error, results, fields) => {
    res.json({ message: results });
  });
});

router.get("/moves/:id", (req, res) => {
  connection.query(
    `SELECT * FROM Move WHERE id='${req.params.id}'`,
    (error, results, fields) => {
      if (results.length === 0)
        results = `No results for pokemon move with id ${req.params.id}`;
      res.json({ message: results });
    }
  );
});

router.get("/pokemon/moves/:id", (req, res) => {
  connection.query(
    `SELECT Pokemon_Moves.pokemon_id,Move.identifier,Move.id FROM Pokemon_Moves INNER JOIN Move ON Move.id=Pokemon_Moves.move_id WHERE pokemon_id='${req.params.id}'`,
    (error, results, fields) => {
      if (results.length === 0)
        results = `No results for pokemon with id ${req.params.id}`;
      res.json({ message: results });
    }
  );
});

module.exports = router;

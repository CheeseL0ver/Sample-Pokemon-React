const express = require("express");
const router = express.Router();

const knex = require('knex')({
	client: 'pg',
	connection: {
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'knex'
	}
});

const setupPaginator = require("knex-paginator");
setupPaginator(knex);

router.get("/", (req, res) => {
  res.json({
    message: "Hello world"
  });
});

/*router.get("/pokemon", (req, res) => {
	knex.select().from('Pokemon')
	.then(function(pokemon) {
		res.status(200);
		res.json({message:pokemon});
	});
});
*/

router.get("/pokemon", (req, res) => {
	knex.select().from('Pokemon')
	.paginate(15, req.query.page || 1, true)
	.then(function(pokemon) {
		res.status(200);
		res.json({message:pokemon});
	});
});

router.get("/pokemon/:id", (req, res) => {
	knex.select()
		.from('Pokemon')
		.innerJoin('Pokemon_Flavor','Pokemon.id'
			,'=','Pokemon_Flavor.species_id')
		.where('id',req.params.id)
		.then(function(flavor) {
			res.status(200);
			res.json({message:flavor});
		});
});

router.get("/moves", (req, res) => {
	knex.select().from('Move')
		.then(function(moves) {
			res.status(200);
			res.json({message:moves});
		});
});

router.get("/moves/:id", (req, res) => {
	knex.select()
		.from('Move')
		.where('id', req.params.id)
		.then(function(moves) {
			res.status(200);
			res.json({message:moves});
		});
});

router.get("/pokemon/moves/:id", (req, res) => {
	knex.select('Pokemon_Moves.pokemon_id','Move.identifier','Move.id')
	    .from('Pokemon_Moves')
	    .innerJoin('Move','Move.id', '=', 'Pokemon_Moves.move_id')
	    .where('pokemon_id',req.params.id)
	    .then(function(moves) {
		    res.json({message:moves});
	    });
});

module.exports = router;

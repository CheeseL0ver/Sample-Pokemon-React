const express = require("express");
const router = express.Router();
const knex = require("./connect");
const handler = require('./handler');
const middleware = require('./middleware');

router.use(express.json());


const setupPaginator = require("knex-paginator");
setupPaginator(knex);
/*
function verifyUser(username, password){
	knex.select().from('User')
		.where({username: username, password: password)})
		.then((user) => {
			if 
		});
};
*/
router.get("/", (req, res) => {
  res.json({
    message: "Hello world"
  });
});

router.get("/secured", middleware.checkToken, (req, res) => {
  res.json({
    message: "Hello world (SECURED)"
  });
});

router.post('/login', handler.login);

/*
router.post("/login", (req, res) => {
	let {username, password} = req.body;
	if (verifyUser(username, password)){
		res.body({'Message':'User exists!!!'});
		//verifyToken(username, password)
	}
	else{
		res.body({'Message':'User not found'});
	}
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
		.paginate(15, req.query.page || 1, true)
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
	    .paginate(15, req.query.page || 1, true)
	    .then(function(moves) {
		    res.json({message:moves});
	    });
});

module.exports = router;

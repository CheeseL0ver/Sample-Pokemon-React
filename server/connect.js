const knex = require('knex')({
	client: 'pg',
	connection:{
		host: 'localhost',
		user: 'root',
		password: 'password',
		database: 'knex'
	}
});

module.exports = knex;

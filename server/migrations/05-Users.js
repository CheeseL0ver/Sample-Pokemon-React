
exports.up = function(knex, Promise) {
	return knex.schema.createTable('User', (table) => {
		table.increments('id');
		table.text('username');
		table.text('password');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('User');
};

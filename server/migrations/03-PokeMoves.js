
exports.up = function(knex, Promise) {
	return knex.schema.createTable('Pokemon_Moves', (table) => {
		table.increments().primary();
		table.integer('pokemon_id');
		table.integer('move_id');
		table.foreign('pokemon_id').references('Pokemon.id');
		table.foreign('move_id').references('Move.id');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('Pokemon_Moves');
};

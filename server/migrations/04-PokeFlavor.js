
exports.up = function(knex, Promise) {
	return knex.schema.createTable('Pokemon_Flavor', (table) => {
		table.integer('species_id').primary();
		table.text('flavor_text');
		table.foreign('species_id').references('Pokemon.id');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('Pokemon_Flavor');
};


exports.up = function(knex, Promise) {
	return knex.schema.createTable('Pokemon', (table) => {
		table.integer('id').primary();
		table.text('identifier');
		table.integer('weight');
		table.integer('height');
		table.integer('order');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('Pokemon');
};

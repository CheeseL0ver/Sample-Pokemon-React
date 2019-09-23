
exports.up = function(knex, Promise) {
	return knex.schema.createTable('Move', (table) => {
		table.integer('id').primary();
		table.text('identifier');
		table.integer('type_id');
	});
};

exports.down = function(knex, Promise) {
	return knex.schema.dropTable('Move');
};

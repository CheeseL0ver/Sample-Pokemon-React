
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pokemon_Moves').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pokemon_Flavor').del();
    });
};

const flavors = require('../data/pokemon_flavor.js');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pokemon_Flavor').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pokemon_Flavor').insert(flavors);
    });
};

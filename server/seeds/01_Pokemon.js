const pokemon = require('../data/pokemon.js');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pokemon').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pokemon').insert(pokemon);
    });
};

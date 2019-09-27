const moves = require('../data/pokemon_moves.js');
//Split data, POSTGRES has an insert limit
var chunk0 = moves.slice(0, 32000);
var chunk1 = moves.slice(32000,50071);

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Pokemon_Moves').del()
    .then(function () {
      // Inserts seed entries
      return knex('Pokemon_Moves').insert(chunk0);
    }).then(function () { return knex('Pokemon_Moves').insert(chunk1)});
};

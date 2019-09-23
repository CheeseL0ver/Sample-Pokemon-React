const moves = require('../data/move.js');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('Move').del()
    .then(function () {
      // Inserts seed entries
      return knex('Move').insert(moves);
    });
};

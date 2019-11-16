const user = require('../data/user.js');

exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('User').del()
    .then(function () {
      // Inserts seed entries
      return knex('User').insert(user);
    });
};

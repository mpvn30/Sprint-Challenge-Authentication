
exports.seed = function(knex) {
  // Deletes ALL existing entries
  return knex('users').del().truncate()
    .then(function () {
      // Inserts seed entries
      return knex('users').insert([
        {username: 'Mike', password: "mike"},
        {username: 'Tim', password: "mike"},
        {username: 'John', password: "mike"}
      ]);
    });
};

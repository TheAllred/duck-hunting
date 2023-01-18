/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("ducks")
    .insert([
      { slug: 1, name: "Daffy" },
      { slug: 2, name: "Daisie" },
      { slug: 3, name: "Dillon" },
      { slug: 4, name: "Donald" },
      { slug: 5, name: "Hughey" },
    ])
    .onConflict("slug")
    .merge();
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  await knex("users")
    .insert([
      { email: "Kevin" },
      { email: "Kaylene" },
      { email: "Kyle" },
      { email: "Ynno" },
    ])
    .onConflict()
    .ignore();
};

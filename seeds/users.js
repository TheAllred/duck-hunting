/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.seed = async function (knex) {
  // Deletes ALL existing entries
  await knex("users").insert([
    { username: "Kevin", password: "asdfghjkl" },
    { username: "Kaylene", password: "asdfghjkl" },
    { username: "Kyle", password: "asdfghjkl" },
    { username: "Ynno", password: "asdfghjkl" },
  ]);
};

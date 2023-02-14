/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.schema.alterTable("users", (t) => {
    t.string("password").notNullable();
    t.string("avatar");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.alterTable("users", (t) => {
    t.dropColumn("password");
    t.dropColumn("avatar");
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = async function (knex) {
  await knex.raw("create extension if not exists citext");
  await knex.schema.createTable("users", (t) => {
    t.bigIncrements("id");
    t.specificType("username", "citext").notNullable().unique();
    t.string("password").notNullable();
    t.string("avatar");
  });
  await knex.schema.createTable("ducks", (t) => {
    t.bigIncrements("id");
    t.text("slug").unique().notNullable();
    t.text("name").notNullable();
  });
  await knex.schema.createTable("user_ducks", (t) => {
    t.bigIncrements("id");
    t.timestamp("found_at").notNullable().defaultTo(knex.raw("now()"));
    t.bigInteger("user_id")
      .notNullable()
      .references("id")
      .inTable("users")
      .onDelete("cascade");
    t.bigInteger("duck_id")
      .notNullable()
      .references("id")
      .inTable("ducks")
      .onDelete("cascade");
    // Make it so they cant find the same duck twice.
    t.unique(["user_id", "duck_id"]);
  });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = async function (knex) {
  await knex.schema.dropTable("user_ducks");
  await knex.schema.dropTable("ducks");
  await knex.schema.dropTable("users");
};

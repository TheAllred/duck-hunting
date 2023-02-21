require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  [process.env.NODE_ENV || "development"]: {
    client: "pg",
    connection: {
      host: 'localhost',
      port: 5432,
      user: 'postgres',
      password: '5ehsc44wno',
      database: 'duck_database'  
    },
    migrations: {
      tableName: "migrations",
    },
  },
};

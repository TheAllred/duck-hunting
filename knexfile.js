require("dotenv").config();

/**
 * @type { Object.<string, import("knex").Knex.Config> }
 */
module.exports = {
  [process.env.NODE_ENV || "development"]: {
    client: "pg",
    connection: {
      connectionString: process.env.DATABASE_URL,
      ssl: process.env.CA_CERT
        ? {
            rejectUnauthorized: true,
            ca: process.env.CA_CERT,
          }
        : undefined,
    },
    migrations: {
      tableName: "migrations",
    },
  },
};

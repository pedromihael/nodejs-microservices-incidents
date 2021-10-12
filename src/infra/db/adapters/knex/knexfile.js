// Update with your config settings.
const dotenv = require('dotenv');
dotenv.config();

module.exports = {
  development: {
    client: 'pg',
    connection: {
      username: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/infra/db/adapters/knex/migrations`,
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: `${__dirname}/src/infra/db/adapters/knex/seeds`,
    },
  },
  production: {
    client: 'pg',
    connection: {
      port: process.env.DB_PORT,
      host: process.env.DB_HOST,
      user: process.env.DB_USER,
      password: process.env.DB_PASS,
      database: process.env.DB_DATABASE,
      ssl: { rejectUnauthorized: false },
    },
    pool: {
      min: 2,
      max: 10,
    },
    migrations: {
      tableName: 'knex_migrations',
      directory: `${__dirname}/src/infra/db/adapters/knex/migrations`,
    },
    seeds: {
      tableName: 'knex_seeds',
      directory: `${__dirname}/src/infra/db/adapters/knex/seeds`,
    },
  },
};

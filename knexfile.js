import dotenv from "dotenv";
dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

console.log(process.env.DB_RW_HOST);
export default {
  development: {
    client: "mysql2",
    connection: {
      host: process.env.DB_RW_HOST,
      user: process.env.DB_RW_USER,
      password: process.env.DB_RW_PASS,
      database: process.env.DB_NAME,
    },
    pool: { min: 2, max: 10 },
    migrations: {
      directory: "./src/db/migrations",
      tableName: "knex_migrations",
    },
  },
};

import dotenv from "dotenv";
import knex from "knex";
import { Model } from "objection";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export const knexMaster = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_RW_HOST,
    user: process.env.DB_RW_USER,
    password: process.env.DB_RW_PASS,
    database: process.env.DB_NAME,
  },
  pool: { min: 2, max: 10 },
});

export const knexReplica = knex({
  client: "mysql2",
  connection: {
    host: process.env.DB_RO_HOST,
    user: process.env.DB_RO_USER,
    password: process.env.DB_RO_PASS,
    database: process.env.DB_NAME,
  },
  pool: { min: 2, max: 10 },
});

Model.knex(knexMaster);

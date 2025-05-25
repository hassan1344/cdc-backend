import dotenv from "dotenv";

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default {
  DB_URI: process.env.DB_URI,
};

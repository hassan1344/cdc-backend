import serverConfig from "./config/server.js";
import logger from "../src/utils/logger/logger.js";
import http from "http";

import { app } from "../src/app/app.js";

import { knexMaster, knexReplica } from "./config/db.js";

const verifyDbConnections = async () => {
  try {
    const [{ result: mResult }] = await knexMaster.raw("SELECT 1+1 AS result");
    logger.info(`Master DB OK (1+1=${mResult})`);

    const [{ result: rResult }] = await knexReplica.raw("SELECT 1+1 AS result");
    logger.info(`Replica DB OK (1+1=${rResult})`);
  } catch (err) {
    logger.error("DB connection failed:", err.message);
    process.exit(1);
  }
};

const startServer = async () => {
  await verifyDbConnections();

  http.createServer(app).listen(serverConfig.PORT, () => {
    logger.info(`Server listening at Port ${serverConfig.PORT}`);
  });
};

startServer().catch((err) => {
  logger.error("Failed to start server:", err);
  process.exit(1);
});

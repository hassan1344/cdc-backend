import serverConfig from "./config/server.js";
import logger from "../src/utils/logger/logger.js";
import http from "http";
import { app } from "../src/app/app.js";

http.createServer(app).listen(serverConfig.PORT, () => {
  logger.info(`Server listening at Port ${serverConfig.PORT}`);
});

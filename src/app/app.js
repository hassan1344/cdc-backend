import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import { ResHandler } from "../utils/customResponse/responseHandler.js";

const app = express();

app.use(bodyParser.json());
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.get("/", (req, res) => {
  return res.send("Service is available.");
});

//------------------Routes here------------------------------

//------------------------------------------------------------

app.use(ResHandler);

export { app };

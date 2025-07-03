import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import morganBody from "morgan-body";
import { ResHandler } from "../utils/customResponse/responseHandler.js";
import { AuthRouter } from "../routers/AuthRouter.js";
import { QuestionnaireRouter } from "../routers/QuestionnaireRouter.js";
import { PatientRouter } from "../routers/PatientRouter.js";

const app = express();
const APP_PREFIX = "/api/v1";
const AUTH_PREFIX = "/auth";
const QUESTIONNAIRE_PREFIX = "/questionnaire";
const PATIENT_PREFIX = "/patient";

app.use(bodyParser.json());

app.use(morgan("dev"));

morganBody(app, {
  prettify: true,
  logReqUserAgent: true,
  logReqDateTime: true,
});
app.use(helmet());
app.use((req, res, next) => {
  res.setHeader("X-XSS-Protection", "1; mode=block");
  next();
});

app.get("/api/", (req, res) => {
  return res.send("Service is available...");
});

//------------------Routes here------------------------------
app.use(APP_PREFIX + AUTH_PREFIX, AuthRouter);
app.use(APP_PREFIX + QUESTIONNAIRE_PREFIX, QuestionnaireRouter);
app.use(APP_PREFIX + PATIENT_PREFIX, PatientRouter);
//------------------------------------------------------------

app.use(ResHandler);

export { app };

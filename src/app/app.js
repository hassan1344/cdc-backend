import express from "express";
import bodyParser from "body-parser";
import helmet from "helmet";
import morgan from "morgan";
import cors from "cors";
import morganBody from "morgan-body";
import { ResHandler } from "../utils/customResponse/responseHandler.js";
import { AuthRouter } from "../routers/AuthRouter.js";
import { QuestionnaireRouter } from "../routers/QuestionnaireRouter.js";
import { PatientRouter } from "../routers/PatientRouter.js";
import { DiagnosesRouter } from "../routers/DiagnosesRouter.js";
import { DoctorRouter } from "../routers/DoctorRouter.js";

const app = express();
const APP_PREFIX = "/api/v1";
const AUTH_PREFIX = "/auth";
const QUESTIONNAIRE_PREFIX = "/questionnaire";
const PATIENT_PREFIX = "/patient";
const DIAGNOSES_PREFIX = "/diagnoses";
const DOCTOR_PREFIX = "/doctor";

app.use(bodyParser.json());

app.use(cors());

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
app.use(APP_PREFIX + DIAGNOSES_PREFIX, DiagnosesRouter);
app.use(APP_PREFIX + DOCTOR_PREFIX, DoctorRouter);

//------------------------------------------------------------

app.use(ResHandler);

export { app };

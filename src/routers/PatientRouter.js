import { Router } from "express";

import * as PatientController from "../controllers/PatientController.js";
export let PatientRouter = Router();

PatientRouter.route("/").post(PatientController.createPatient);

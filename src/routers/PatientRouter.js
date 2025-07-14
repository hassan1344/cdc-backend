import { Router } from "express";
import * as PatientController from "../controllers/PatientController.js";

export let PatientRouter = Router();

// Existing routes
PatientRouter.route("/")
  .post(PatientController.createPatient)
  .get(PatientController.getAllPatients);

// New routes for patient operations
PatientRouter.route("/:patientCode")
  .put(PatientController.updatePatient)
  .get(PatientController.getPatientByCode);
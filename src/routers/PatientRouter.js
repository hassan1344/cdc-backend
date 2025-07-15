import { Router } from "express";
import * as PatientController from "../controllers/PatientController.js";

export let PatientRouter = Router();

// Base routes for patients
PatientRouter.route("/")
  .post(PatientController.createPatient)  // POST /api/v1/patient - Create patient
  .get(PatientController.getAllPatients); // GET /api/v1/patient - Get all patients

// Routes with patient code parameter
PatientRouter.route("/:patientCode")
  .put(PatientController.updatePatient)    // PUT /api/v1/patient/:patientCode - Update patient
  .get(PatientController.getPatientByCode); // GET /api/v1/patient/:patientCode - Get patient by code
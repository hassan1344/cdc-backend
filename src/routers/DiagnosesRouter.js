import { Router } from "express";
import DiagnosesController from "../controllers/DiagnosesController.js";

export const DiagnosesRouter = Router();

// POST - Create diagnostic
DiagnosesRouter.post("/", DiagnosesController.createDiagnostic);

// GET - Get all diagnoses
DiagnosesRouter.get("/", DiagnosesController.getAllDiagnoses);

// GET - Get diagnoses by doctor
DiagnosesRouter.get("/doctor/:doctorId", DiagnosesController.getDiagnosesByDoctor);

// GET - Get diagnoses by patient code
DiagnosesRouter.get("/patient/:patientCode", DiagnosesController.getDiagnosesByPatient);
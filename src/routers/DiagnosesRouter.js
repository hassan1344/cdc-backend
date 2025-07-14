import { Router } from "express";

import DiagnosesController from "../controllers/DiagnosesController.js";

export const DiagnosesRouter = Router();

DiagnosesRouter.post("/", DiagnosesController.createDiagnostic);

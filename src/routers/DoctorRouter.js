import { Router } from "express";
import DoctorController from "../controllers/DoctorController.js";

export const DoctorRouter = Router();

// PUT - Update doctor by doctor ID
DoctorRouter.put("/:doctorId", DoctorController.updateDoctor);

// GET - Get doctor by doctor ID
DoctorRouter.get("/:doctorId", DoctorController.getDoctorById);

// GET - Get all doctors
DoctorRouter.get("/", DoctorController.getAllDoctors);
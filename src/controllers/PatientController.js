import Patient from "../models/Patient.js";

import CustomError from "../utils/customResponse/customError.js";
import CustomSuccess from "../utils/customResponse/customSuccess.js";

import { createPatientValidator } from "../utils/validators/PatientValidator.js";

export const createPatient = async (req, res, next) => {
  const { user_id, name, gender, diabetes_type, mrba_status, risk_group } =
    req.body;

  try {
    await createPatientValidator.validateAsync(req.body).catch((err) => {
      return CustomError.validation(err.message);
    });

    const newPatient = await Patient.query().insert({
      user_id,
      name,
      gender,
      diabetes_type,
      mrba_status,
      risk_group,
    });

    return next(
      CustomSuccess.createSuccess(
        newPatient.user_id,
        "Patient profile created successfully",
        200
      )
    );
  } catch (err) {
    next(err);
  }
};
export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.query();
    return next(
      CustomSuccess.createSuccess(
        patients,
        "Patients retrieved successfully",
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

import Patient from "../models/Patient.js";
import CustomError from "../utils/customResponse/customError.js";
import CustomSuccess from "../utils/customResponse/customSuccess.js";
import { createPatientValidator } from "../utils/validators/PatientValidator.js";

// CREATE PATIENT API (Your existing code)
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

// GET ALL PATIENTS API (Your existing code)
export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.query();
    // .withGraphFetched("auth")
    // .select("patients.*", "auths.email as email", "auths.role as role")
    // .leftJoin("auths", "patients.user_id", "auths.id");

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

// UPDATE PATIENT API (New code)
export const updatePatient = async (req, res, next) => {
  try {
    const { patientCode } = req.params;
    const { name, gender, diabetes_type, mrba_status, risk_group } = req.body;
    
    // Validate required fields
    if (!name || name.trim().length === 0) {
      return next(CustomError.createError("Name is required", 400));
    }
    
    if (name.length > 255) {
      return next(CustomError.createError("Name cannot exceed 255 characters", 400));
    }
    
    // Validate gender enum
    const validGenders = ["male", "female", "other"];
    if (gender && !validGenders.includes(gender)) {
      return next(CustomError.createError("Gender must be one of: male, female, other", 400));
    }
    
    // Validate diabetes_type enum
    const validDiabetesTypes = ["Type 1", "Type 2", "Other"];
    if (diabetes_type && !validDiabetesTypes.includes(diabetes_type)) {
      return next(CustomError.createError("Diabetes type must be one of: Type 1, Type 2, Other", 400));
    }
    
    // Find patient by patientencode
    const existingPatient = await Patient.query()
      .where('patientencode', patientCode)
      .first();
    
    if (!existingPatient) {
      return next(CustomError.createError(`Patient with code ${patientCode} not found`, 404));
    }
    
    // Update patient data
    const updateData = {
      name: name.trim(),
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    
    // Add optional fields only if they are provided
    if (gender) updateData.gender = gender;
    if (diabetes_type) updateData.diabetes_type = diabetes_type;
    if (mrba_status) updateData.mrba_status = mrba_status;
    if (risk_group) updateData.risk_group = risk_group;
    
    const updatedPatient = await Patient.query()
      .where('patientencode', patientCode)
      .update(updateData)
      .returning('*');
    
    // Get the updated patient data
    const patientData = await Patient.query()
      .where('patientencode', patientCode)
      .first();
    
    return next(
      CustomSuccess.createSuccess(
        patientData,
        `Patient ${patientCode} updated successfully`,
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

// GET PATIENT BY CODE API (New code)
export const getPatientByCode = async (req, res, next) => {
  try {
    const { patientCode } = req.params;
    
    const patient = await Patient.query()
      .where('patientencode', patientCode)
      .first();
    
    if (!patient) {
      return next(CustomError.createError(`Patient with code ${patientCode} not found`, 404));
    }
    
    return next(
      CustomSuccess.createSuccess(
        patient,
        `Patient ${patientCode} retrieved successfully`,
        200
      )
    );
  } catch (error) {
    next(error);
  }
};
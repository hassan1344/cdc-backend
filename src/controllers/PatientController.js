import Patient from "../models/Patient.js";
import CustomError from "../utils/customResponse/customError.js";
import CustomSuccess from "../utils/customResponse/customSuccess.js";
import { createPatientValidator, updatePatientValidator } from "../utils/validators/PatientValidator.js";

// CREATE PATIENT API (Fixed to include all required fields)
export const createPatient = async (req, res, next) => {
  const { 
    user_id, 
    name, 
    gender, 
    diabetes_type, 
    mrba_status, 
    risk_group,
    patientencode,
    befundbogenID,
    partnerID
  } = req.body;

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
      patientencode,
      befundbogenID: befundbogenID || 1, // Default to 1 if not provided
      partnerID: partnerID || 1, // Default to 1 if not provided
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    });

    return next(
      CustomSuccess.createSuccess(
        newPatient,
        "Patient profile created successfully",
        200
      )
    );
  } catch (err) {
    next(err);
  }
};

// GET ALL PATIENTS API
export const getAllPatients = async (req, res, next) => {
  try {
    const patients = await Patient.query()
      .orderBy('created_at', 'desc');

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

// UPDATE PATIENT API (Fixed with proper validation)
export const updatePatient = async (req, res, next) => {
  console.log("=== UPDATE PATIENT FUNCTION CALLED ===");
  console.log("Request params:", req.params);
  console.log("Request body:", req.body);
  
  try {
    const { patientCode } = req.params;
    const { name, gender, diabetes_type, mrba_status, risk_group } = req.body;
    
    console.log("Extracted patientCode:", patientCode);
    console.log("Extracted fields:", { name, gender, diabetes_type, mrba_status, risk_group });
    
    // Use the update validator instead of create validator
    await updatePatientValidator.validateAsync(req.body).catch((err) => {
      console.log("Validation error:", err.message);
      throw CustomError.validation(err.message);
    });
    
    console.log("Validation passed successfully");
    
    // Find patient by patientencode
    console.log("Looking for patient with code:", patientCode);
    const existingPatient = await Patient.query()
      .where('patientencode', patientCode)
      .first();
    
    console.log("Found patient:", existingPatient ? "YES" : "NO");
    
    if (!existingPatient) {
      console.log("Patient not found, returning 404");
      return next(CustomError.createError(`Patient with code ${patientCode} not found`, 404));
    }
    
    // Build update data object with only provided fields
    const updateData = {
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    };
    
    // Only add fields that are provided in the request
    if (name) updateData.name = name.trim();
    if (gender) updateData.gender = gender;
    if (diabetes_type) updateData.diabetes_type = diabetes_type;
    if (mrba_status) updateData.mrba_status = mrba_status;
    if (risk_group) updateData.risk_group = risk_group;
    
    console.log("Update data to be applied:", updateData);
    
    // Update the patient
    console.log("Updating patient in database...");
    await Patient.query()
      .where('patientencode', patientCode)
      .update(updateData);
    
    console.log("Update completed, fetching updated patient...");
    
    // Get the updated patient data
    const patientData = await Patient.query()
      .where('patientencode', patientCode)
      .first();
    
    console.log("Returning success response with patient data");
    
    return next(
      CustomSuccess.createSuccess(
        patientData,
        `Patient ${patientCode} updated successfully`,
        200
      )
    );
  } catch (error) {
    console.log("=== ERROR IN UPDATE PATIENT ===");
    console.log("Error:", error);
    console.log("Error message:", error.message);
    next(error);
  }
};

// GET PATIENT BY CODE API
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
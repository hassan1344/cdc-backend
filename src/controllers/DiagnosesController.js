import bcrypt from "bcrypt";
import MedizinischeDaten from "../models/medizinische_daten.js";
import Auth from "../models/Auth.js";
import CustomSuccess from "../utils/customResponse/customSuccess.js";
import Patient from "../models/Patient.js";

function generateRandomPassword(length = 12) {
  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[]{}|;:,.<>?";
  let password = "";
  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * chars.length);
    password += chars[randomIndex];
  }
  return password;
}

const createDiagnostic = async (req, res, next) => {
  try {
    const existingUser = await Auth.query().findOne({
      email: req.body.patientencode,
    });
    if (!existingUser) {
      const password = generateRandomPassword();
      const hashedPassword = await bcrypt.hash(password, 10);
      const email = Math.floor(Math.random() * 900000000) + 100000000;
      const auth = await Auth.query().insert({
        email: email.toString(),
        password: hashedPassword,
        role: "patient",
      });

      const data = await MedizinischeDaten.query().insert({
        ...req.body,
        patientencode:
          req.body.patientencode != "" ? req.body.patientencode : email,
        befundbogenID: 1,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      });
      await Patient.query().insert({
        user_id: auth.id,
        name: req.body.name ? req.body.name : "Patient" + Date.now(),
        diabetes_type: req.body.diabetes_type ? req.body.diabetes_type : null,
        mrba_status: req.body.mrba_status ? req.body.mrba_status : null,
        risk_group: req.body.risk_group ? req.body.risk_group : null,
        patientencode: email,
        befundbogenID: 1,
        partnerID: req.body.partnerID,
        created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
        updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      });

      return next(
        CustomSuccess.createSuccess(
          { user: { email: auth.email, password }, data },
          "Diagnostic form created and new user generated",
          200
        )
      );
    }
    const result = await MedizinischeDaten.query()
      .where({
        patientencode: req.body.patientencode,
        partnerID: req.body.partnerID,
      })
      .orderBy("created_at", "desc")
      .first();
    console.log(result.befundbogenID);

    const data = await MedizinischeDaten.query().insert({
      ...req.body,
      befundbogenID: result ? result.befundbogenID + 1 : 1,
      created_at: new Date().toISOString().slice(0, 19).replace("T", " "),
      updated_at: new Date().toISOString().slice(0, 19).replace("T", " "),
    });
    return next(
      CustomSuccess.createSuccess({ data }, "Diagnostic form created", 200)
    );
  } catch (error) {
    next(error);
  }
};

// GET API - Get All Diagnoses
const getAllDiagnoses = async (req, res, next) => {
  try {
    const diagnoses = await MedizinischeDaten.query()
      .orderBy('created_at', 'desc');
    
    return next(
      CustomSuccess.createSuccess(
        { diagnoses, count: diagnoses.length },
        "All diagnoses retrieved successfully",
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

// GET API - Get Diagnoses by Doctor (Partner ID)
const getDiagnosesByDoctor = async (req, res, next) => {
  try {
    const { doctorId } = req.params;
    
    // Convert doctorId to number for comparison
    const partnerId = parseInt(doctorId);
    
    const diagnoses = await MedizinischeDaten.query()
      .where('partnerID', partnerId)
      .orderBy('created_at', 'desc');
    
    return next(
      CustomSuccess.createSuccess(
        { 
          diagnoses, 
          count: diagnoses.length,
          doctorId: partnerId 
        },
        `Diagnoses for doctor ID ${partnerId} retrieved successfully`,
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

// GET API - Get All Diagnoses by Patient
const getDiagnosesByPatient = async (req, res, next) => {
  try {
    const { patientCode } = req.params;
    
    const diagnoses = await MedizinischeDaten.query()
      .where('patientencode', patientCode)
      .orderBy('created_at', 'desc');
    
    if (diagnoses.length === 0) {
      return next(
        CustomSuccess.createSuccess(
          { diagnoses: [], count: 0 },
          `No diagnoses found for patient code ${patientCode}`,
          200
        )
      );
    }
    
    return next(
      CustomSuccess.createSuccess(
        { 
          diagnoses, 
          count: diagnoses.length,
          patientCode 
        },
        `Diagnoses for patient ${patientCode} retrieved successfully`,
        200
      )
    );
  } catch (error) {
    next(error);
  }
};

const DiagnosesController = {
  createDiagnostic,
  getAllDiagnoses,
  getDiagnosesByDoctor,
  getDiagnosesByPatient,
};

export default DiagnosesController;
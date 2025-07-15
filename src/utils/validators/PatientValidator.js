import joi from "joi";

// CREATE PATIENT VALIDATOR - All fields required for creation
export const createPatientValidator = joi.object({
  user_id: joi.number().integer().required(),
  name: joi.string().min(1).max(255).required(),
  gender: joi.string().valid("male", "female", "other").required(),
  diabetes_type: joi.string().valid("Type 1", "Type 2", "Other").required(),
  mrba_status: joi.string().required(),
  risk_group: joi.string().required(),
  patientencode: joi.number().integer().required(),
  befundbogenID: joi.number().integer().optional(),
  partnerID: joi.number().integer().optional(),
});

// UPDATE PATIENT VALIDATOR - All fields optional for updates
export const updatePatientValidator = joi.object({
  user_id: joi.number().integer().optional(),
  name: joi.string().min(1).max(255).optional(),
  gender: joi.string().valid("male", "female", "other").optional(),
  diabetes_type: joi.string().valid("Type 1", "Type 2", "Other").optional(),
  mrba_status: joi.string().optional(),
  risk_group: joi.string().optional(),
  patientencode: joi.number().integer().optional(),
  befundbogenID: joi.number().integer().optional(),
  partnerID: joi.number().integer().optional(),
});
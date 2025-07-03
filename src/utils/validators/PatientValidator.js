import joi from "joi";

export const createPatientValidator = joi.object({
  user_id: joi.number().integer().required(),
  name: joi.string().min(1).max(255).required(),
  gender: joi.string().valid("male", "female", "other").required(),
  diabetes_type: joi.string().valid("Type 1", "Type 2", "Other").required(),
  mrba_status: joi.string().required(),
  risk_group: joi.string().required(),
});

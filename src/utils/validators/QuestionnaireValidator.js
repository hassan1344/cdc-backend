import joi from "joi";

export const addQuestionnaireValidator = joi.object({
  patient_id: joi.number().integer().required(),
  type: joi.string().valid("pre", "post").required(),
  responses: joi.array().items(joi.object().required()),
  date: joi.date().iso().required(),
});

export const getQuestionnaireByPatientValidator = joi.object({
  patient_id: joi.number().integer().required(),
});

export const updateQuestionnaireValidator = joi.object({
  questionnaire_id: joi.number().integer().required(),

  patient_id: joi.number().integer().required(),
  responses: joi.array().items(joi.object().required()),
});

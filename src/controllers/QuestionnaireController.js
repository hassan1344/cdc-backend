import Patient from "../models/Patient.js";
import Questionnaire from "../models/Questionnaire.js";

import CustomError from "../utils/customResponse/customError.js";
import CustomSuccess from "../utils/customResponse/customSuccess.js";
import logger from "../utils/logger/logger.js";

import {
  addQuestionnaireValidator,
  getQuestionnaireByPatientValidator,
} from "../utils/validators/QuestionnaireValidator.js";

export const addQuestionnaire = async (req, res, next) => {
  const { patient_id, type, responses, date } = req.body;

  try {
    await addQuestionnaireValidator.validateAsync(req.body).catch((err) => {
      throw CustomError.validation(err.message);
    });

    const patient = await Patient.query().findOne({ user_id: patient_id });

    if (!patient) {
      throw CustomError.notFound("Patient not found with this id");
    }

    const insertedRecord = await Questionnaire.query().insert({
      patient_id,
      type,
      responses,
      date,
    });

    return next(
      CustomSuccess.createSuccess(
        insertedRecord,
        "Questionnaire added successfully",
        200
      )
    );
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

export const getQuestionnaireByPatientId = async (req, res, next) => {
  const { patient_id } = req.params;

  try {
    await getQuestionnaireByPatientValidator
      .validateAsync(req.params)
      .catch((err) => {
        throw CustomError.validation(err.message);
      });

    const questionnaire = await Questionnaire.query().findOne({ patient_id });

    if (!questionnaire) {
      throw CustomError.notFound(
        `No questionnaire found for patient with ID ${patient_id}`
      );
    }

    return next(
      CustomSuccess.createSuccess(
        questionnaire,
        "Questionnaire retrieved successfully",
        200
      )
    );
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

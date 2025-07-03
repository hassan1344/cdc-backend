import { knexMaster } from "../config/db.js";
import Patient from "../models/Patient.js";
import Questionnaire from "../models/Questionnaire.js";

import CustomError from "../utils/customResponse/customError.js";
import CustomSuccess from "../utils/customResponse/customSuccess.js";
import logger from "../utils/logger/logger.js";

import {
  addQuestionnaireValidator,
  getQuestionnaireByPatientValidator,
  updateQuestionnaireValidator,
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

    if (type === "pre") {
      const existingPreRecord = await Questionnaire.query().findOne({
        patient_id,
        type: "pre",
      });

      if (existingPreRecord) {
        throw CustomError.badRequest(
          "A 'pre' questionnaire already exists for this patient"
        );
      }
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

    const questionnaire = await Questionnaire.query().where({ patient_id });

    if (questionnaire.length == 0) {
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

export const updateQuestionnaire = async (req, res, next) => {
  const { questionnaire_id } = req.params;
  const { patient_id, responses } = req.body;

  try {
    await updateQuestionnaireValidator
      .validateAsync({
        questionnaire_id,
        patient_id,
        responses,
      })
      .catch((err) => {
        throw CustomError.validation(err.message);
      });

    const questionnaire = await Questionnaire.query().findById(
      questionnaire_id
    );

    if (!questionnaire) {
      throw CustomError.notFound("Questionnaire not found.");
    }

    if (questionnaire.patient_id !== patient_id) {
      throw CustomError.validation(
        "Patient ID does not match the questionnaire's owner."
      );
    }

    const updatedRecord = await Questionnaire.query().patchAndFetchById(
      questionnaire_id,
      {
        patient_id,
        responses,
        updated_at: knexMaster.fn.now(),
      }
    );

    return next(
      CustomSuccess.createSuccess(
        updatedRecord,
        "Questionnaire updated successfully",
        200
      )
    );
  } catch (err) {
    logger.error(err.message);
    next(err);
  }
};

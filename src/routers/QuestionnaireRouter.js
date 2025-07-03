import { Router } from "express";

import * as QuestionnaireController from "../controllers/QuestionnaireController.js";

export const QuestionnaireRouter = Router();

QuestionnaireRouter.post("/", QuestionnaireController.addQuestionnaire);

QuestionnaireRouter.get(
  "/:patient_id",
  QuestionnaireController.getQuestionnaireByPatientId
);

QuestionnaireRouter.put(
  "/:questionnaire_id",
  QuestionnaireController.updateQuestionnaire
);

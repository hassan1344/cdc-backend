import { Model } from "objection";

export default class Questionnaire extends Model {
  static tableName = "questionnaires";

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["patient_id", "type", "responses", "date"],

      properties: {
        id: { type: "integer" },
        patient_id: { type: "integer" },
        type: { type: "string", enum: ["pre", "post"] }, // pre = vorerhebung, post = erfolgskontrolle
        date: { type: "string", format: "date-time" }, // Date of the questionnaire completion
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
        responses: {
          type: "array",
          items: {
            type: "object",
            properties: {
              questionNumber: { type: "integer" },
              questionId: { type: "string" },
              sectionId: { type: "string" },
              responseType: { type: "string" },
              icfCode: { type: "string" },
              selectedOption: { type: "integer" },
              selectedOptions: {
                type: "array",
                items: { type: "string" },
              },
              selectedValue: { type: "string" },
              scaleValue: { type: "integer" },
            },
            required: ["questionNumber", "questionId", "responseType"],
          },
        },
      },
    };
  }

  static get relationMappings() {
    return {
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: "Patient.js",
        join: {
          from: "questionnaires.patient_id",
          to: "patient.user_id",
        },
      },
      diagnosis: {
        relation: Model.HasOneRelation,
        modelClass: "Diagnosis.js",
        join: {
          from: "questionnaires.id",
          to: "diagnoses.questionnaire_id",
        },
      },
    };
  }
}

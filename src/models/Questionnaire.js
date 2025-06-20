import { Model } from "objection";

export default class Questionnaire extends Model {
  static tableName = "questionnaire";

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
        type: { type: "string", enum: ["pre", "post"] }, // part 1 or part 2
        responses: { type: "object" }, // json fields from the form
        date: { type: "string", format: "date-time" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
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
          to: "patients.id",
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

import { Model } from "objection";

export default class Diagnosis extends Model {
  static tableName = "diagnoses";

  static get idColumn() {
    return "id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["questionnaire_id", "doctor_id", "status", "diagnosis_date"],

      properties: {
        id: { type: "integer" },
        questionnaire_id: { type: "integer" },
        doctor_id: { type: "integer" },
        diabetes_type: { type: "string", enum: ["Type 1", "Type 2", "Other"] },
        mrsa_status: { type: "string", enum: ["yes", "no", "unknown"] },
        foot_risk_group: { type: "string" }, // eg "Type IIa", "Type III"....
        amputation_status: { type: "string" },
        ulcer_status: { type: "string" }, // eg "healed", "acute", "no"
        dorsiflexion_limit: { type: "boolean" },
        vibration_sensation: { type: "boolean" },
        microfilament_loss: { type: "boolean" },
        podiatric_treatment: { type: "boolean" },
        additional_findings: { type: "string" },
        orthopedic_care_type: { type: "string" }, // eg "custom-made shoe", "immobilization"..
        drawing_reference: { type: "string" }, // can be file or image
        status: { type: "string", enum: ["Pending", "Diagnosed"] },
        diagnosis_date: { type: "string", format: "date-time" },
        notes: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      questionnaire: {
        relation: Model.BelongsToOneRelation,
        modelClass: "Questionnaire.js",
        join: {
          from: "diagnoses.questionnaire_id",
          to: "questionnaires.id",
        },
      },
      doctor: {
        relation: Model.BelongsToOneRelation,
        modelClass: "Doctor.js",
        join: {
          from: "diagnoses.doctor_id",
          to: "doctor.user_id",
        },
      },
    };
  }
}

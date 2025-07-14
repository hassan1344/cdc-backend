// models/MedizinischeDaten.js
import { Model } from "objection";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";

class MedizinischeDaten extends Model {
  static get tableName() {
    return "medizinische_daten";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["patientencode", "befundbogenID", "partnerID"],
      properties: {
        patientencode: { type: "integer" },
        befundbogenID: { type: "integer" },
        partnerID: { type: "integer" },
        allgemeineDaten: { type: "object" },
        klinischerBefund: { type: "object" },
        fussstatus: { type: "object" },
        fussstatusGrafik: { type: "object" },
        kriterien: { type: "object" },
        kategorisierung: { type: "object" },
        schuhversorgung: { type: "object" },
        funktionelleTests: { type: "object" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }
  static get relationMappings() {
    return {
      patient: {
        relation: Model.BelongsToOneRelation,
        modelClass: Patient,
        join: {
          from: "medizinische_daten.patientencode",
          to: "patients.patientencode",
        },
      },
      doctor: {
        relation: Model.BelongsToOneRelation,
        modelClass: Doctor,
        join: {
          from: "medizinische_daten.partnerID",
          to: "doctors.user_id",
        },
      },
    };
  }
}

export default MedizinischeDaten;

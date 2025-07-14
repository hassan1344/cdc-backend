import { Model } from "objection";
import Auth from "./Auth.js";

export default class Patient extends Model {
  static get tableName() {
    return "patients"; // Use plural if your DB table is plural
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["user_id", "patientencode"],

      properties: {
        user_id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        gender: { type: "string", enum: ["male", "female", "other"] },
        diabetes_type: { type: "string", enum: ["Type 1", "Type 2", "Other"] },
        mrba_status: { type: "string" },
        risk_group: { type: "string" },
        patientencode: { type: "integer" }, // Assuming this is an integer, adjust if needed
        befundbogenID: { type: "integer" }, // Assuming this is an integer, adjust if needed
        partnerID: { type: "integer" }, // Assuming this is an integer, adjust if needed

        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      auth: {
        relation: Model.BelongsToOneRelation,
        modelClass: Auth,
        join: {
          from: "patients.user_id",
          to: "auths.id",
        },
      },
    };
  }
}

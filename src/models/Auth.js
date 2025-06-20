// models/User.js
import { Model } from "objection";
import Patient from "./Patient.js";
import Doctor from "./Doctor.js";

class Auth extends Model {
  static get tableName() {
    return "auths";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["email", "password", "role"],
      properties: {
        id: { type: "integer" },
        email: { type: "string", format: "email" },
        password: { type: "string" },
        role: { type: "string", enum: ["patient", "doctor"] },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }

  static get relationMappings() {
    return {
      patient: {
        relation: Model.HasOneRelation,
        modelClass: Patient,
        join: {
          from: "users.id",
          to: "patients.user_id",
        },
      },
      doctor: {
        relation: Model.HasOneRelation,
        modelClass: Doctor,
        join: {
          from: "users.id",
          to: "doctors.user_id",
        },
      },
    };
  }
}

export default Auth;

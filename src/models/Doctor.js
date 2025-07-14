import { Model } from "objection";
import Auth from "./Auth.js";

export default class Doctor extends Model {
  static get tableName() {
    return "doctors"; // plural if your DB table is plural
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: ["name"],

      properties: {
        user_id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
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
          from: "doctors.user_id",
          to: "auths.id",
        },
      },
    };
  }
}

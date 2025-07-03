import { Model } from "objection";

export default class Doctor extends Model {
  static tableName = "doctor";

  static get userIdColumn() {
    return "user_id";
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
}

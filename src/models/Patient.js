import { Model } from "objection";

export default class Patient extends Model {
  static tableName = "patient";

  static get userIdColumn() {
    return "user_id";
  }

  static get jsonSchema() {
    return {
      type: "object",
      required: [
        "name",
        "gender",
        "diabetes_type",
        "mrba_status",
        "risk_group",
      ],

      properties: {
        user_id: { type: "integer" },
        name: { type: "string", minLength: 1, maxLength: 255 },
        gender: { type: "string", enum: ["male", "female", "other"] },
        diabetes_type: { type: "string", enum: ["Type 1", "Type 2", "Other"] },
        mrba_status: { type: "string" },
        risk_group: { type: "string" },
        created_at: { type: "string", format: "date-time" },
        updated_at: { type: "string", format: "date-time" },
      },
    };
  }
}

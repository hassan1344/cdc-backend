export async function up(knex) {
  await knex.schema.createTable("diagnoses", (table) => {
    table.increments("id").primary();
    table
      .integer("questionnaire_id")
      .unsigned()
      .references("id")
      .inTable("questionnaires")
      .onDelete("CASCADE");
    table
      .integer("doctor_id")
      .unsigned()
      .references("user_id")
      .inTable("doctor")
      .onDelete("SET NULL");

    table.string("diabetes_type");
    table.enu("mrsa_status", ["yes", "no", "unknown"]);
    table.string("foot_risk_group");
    table.string("amputation_status");
    table.string("ulcer_status");
    table.boolean("dorsiflexion_limit");
    table.boolean("vibration_sensation");
    table.boolean("microfilament_loss");
    table.boolean("podiatric_treatment");
    table.text("additional_findings");
    table.string("orthopedic_care_type");
    table.string("drawing_reference");
    table.enu("status", ["Pending", "Diagnosed"]).notNullable();
    table.datetime("diagnosis_date").notNullable();
    table.text("notes");

    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("diagnoses");
}

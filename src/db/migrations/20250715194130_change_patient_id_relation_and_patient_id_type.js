export async function up(knex) {
  await knex.schema.alterTable("questionnaires", (table) => {
    table
      .foreign("patient_id")
      .references("patientencode")
      .inTable("patients")
      .onDelete("CASCADE");
  });
}

export async function down(knex) {
  await knex.schema.alterTable("questionnaires", (table) => {
    table.dropForeign("patient_id");
  });

  await knex.schema.alterTable("questionnaires", (table) => {
    table.integer("patient_id").alter();
  });

  await knex.schema.alterTable("questionnaires", (table) => {
    table
      .foreign("patient_id")
      .references("user_id") // original reference
      .inTable("patients")
      .onDelete("CASCADE");
  });
}

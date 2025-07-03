export async function up(knex) {
  await knex.schema.createTable("patient", (table) => {
    table.increments("user_id").primary();
    table.string("name").notNullable();
    table.string("gender");
    table.string("diabetes_type");
    table.string("mrba_status");
    table.string("risk_group");
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("patients");
}

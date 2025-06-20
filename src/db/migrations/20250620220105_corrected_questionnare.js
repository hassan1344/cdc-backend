export async function up(knex) {
  await knex.schema.createTable("questionnaires", (table) => {
    table.increments("id").primary();
    table
      .integer("patient_id")
      .unsigned()
      .references("user_id")
      .inTable("patient")
      .onDelete("CASCADE");
    table.enu("type", ["pre", "post"]).notNullable();
    table.json("responses").notNullable();
    table.datetime("date").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("questionnaires");
}

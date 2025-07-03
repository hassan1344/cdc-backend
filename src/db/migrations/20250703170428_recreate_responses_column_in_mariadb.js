export async function up(knex) {
  // Drop the 'responses' column
  await knex.schema.table("questionnaires", (table) => {
    table.dropColumn("responses");
  });

  await knex.schema.table("questionnaires", (table) => {
    table.longtext("responses").notNullable();
  });
}

export async function down(knex) {
  await knex.schema.table("questionnaires", (table) => {
    table.dropColumn("responses");
  });

  await knex.schema.table("questionnaires", (table) => {
    table.longtext("responses").notNullable();
  });
}

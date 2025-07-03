// 20250703154123_reset_responses_column.js
export async function up(knex) {
  await knex.schema.table("questionnaires", (table) => {
    // Drop the 'responses' column
    table.dropColumn("responses");
  });

  // Recreate the 'responses' column with the correct type (JSON for MySQL)
  await knex.schema.table("questionnaires", (table) => {
    table.json("responses").notNullable(); // For MySQL, use 'json'
  });
}

export async function down(knex) {
  // Rollback by dropping the newly created 'responses' column
  await knex.schema.table("questionnaires", (table) => {
    table.dropColumn("responses");
  });

  // Rollback by recreating the 'responses' column as LONGTEXT if necessary
  await knex.schema.table("questionnaires", (table) => {
    table.longtext("responses").notNullable(); // For MySQL, revert to LONGTEXT
  });
}

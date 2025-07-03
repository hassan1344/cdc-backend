export async function up(knex) {
  await knex.schema.table("questionnaires", (table) => {
    // If the column already exists, alter it instead of adding it
    table.json("responses").alter(); // If 'responses' exists, this will change its type
  });
}

export async function down(knex) {
  await knex.schema.table("questionnaires", (table) => {
    table.dropColumn("responses"); // Rollback by dropping the column
  });
}

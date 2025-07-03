// 20250703154123_recreate_responses_column.js
export async function up(knex) {
  await knex.schema.table("questionnaires", (table) => {
    table.json("responses").nullable();
  });
}

export async function down(knex) {
  await knex.schema.table("questionnaires", (table) => {
    table.dropColumn("responses");
  });
}

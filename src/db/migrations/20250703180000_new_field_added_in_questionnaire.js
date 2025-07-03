export async function up(knex) {
  await knex.schema.table("questionnaires", (table) => {
    table.longtext("responses").nullable().alter();
  });
}

export async function down(knex) {
  await knex.schema.table("questionnaires", (table) => {
    table.text("responses").notNullable().alter();
  });
}

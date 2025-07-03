export async function up(knex) {
  await knex.schema.createTable("doctor", (table) => {
    table.increments("user_id").primary();
    table.string("name").notNullable();
    table.timestamps(true, true);
  });
}

export async function down(knex) {
  await knex.schema.dropTableIfExists("doctors");
}

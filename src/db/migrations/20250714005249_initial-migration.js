export async function up(knex) {
  // Reverse the above if necessary

  await knex.schema.alterTable("patients", (table) => {
    table
      .foreign(["patientencode", "befundbogenID", "partnerID"])
      .references(["patientencode", "befundbogenID", "partnerID"])
      .inTable("medizinische_daten")
      .onDelete("CASCADE");
  });
}
export async function down(knex) {
  // Reverse the above if necessary
  await knex.schema.alterTable("medizinische_daten", (table) => {
    table.dropForeign("patientencode");
    table.dropPrimary();
    table.primary(["patientencode", "befundbogenID", "partnerID"]);
  });
  await knex.schema.alterTable("patients", (table) => {
    table.dropPrimary();
    // table.unique(['patientencode']);
  });
}

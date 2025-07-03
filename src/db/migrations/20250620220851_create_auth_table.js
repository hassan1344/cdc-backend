// migrations/YYYYMMDD_create_auths_table.js
export function up(knex) {
  return knex.schema.createTable('auths', (table) => {
    table.increments('id').primary();
    table.string('email').notNullable().unique();
    table.string('password').notNullable();
    table.enu('role', ['patient', 'doctor']).notNullable();
    table.timestamp('created_at').defaultTo(knex.fn.now());
    table.timestamp('updated_at').defaultTo(knex.fn.now());
  });
}

export function down(knex) {
  return knex.schema.dropTableIfExists('auths');
}

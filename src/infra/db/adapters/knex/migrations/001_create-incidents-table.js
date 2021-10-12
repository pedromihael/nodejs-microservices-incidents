exports.up = function (knex) {
  return knex.schema
    .createTable('incident', (table) => {
      table.string('id', { primaryKey: true }).notNullable();
      table.string('description').notNullable();
      table.timestamps(true, true);
      table
        .integer('fk_severity')
        .unsigned()
        .notNullable();
      table
        .integer('fk_project')
        .unsigned()
        .notNullable();
    })
    .alterTable('incident', (table) => {
      table.unique('id');
    })
};

exports.down = function (knex) {
  return knex.schema
    .dropTableIfExists('incident')
};

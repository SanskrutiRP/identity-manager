exports.up = async function (knex) {
  await knex.schema.createTable('contact', (table) => {
    table.increments('id').primary().unsigned();
    table.string('phone_number').notNull();
    table.string('email').notNull();
    table.integer('linked_id');
    table
      .enum('link_precedence', ['primary', 'secondary'])
      .defaultTo('primary');
    table.dateTime('deleted_at');
    table.unique(['email', 'phone_number']);
    table.timestamps(true, true);
  });
};

exports.down = async function (knex) {
  await knex.schema.dropTable('contact');
};

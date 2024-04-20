// migrations/YYYYMMDDHHMMSS_create_tasks_table.js

exports.up = function(knex) {
    return knex.schema.createTable('tasks', function(table) {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.string('type').notNullable();
        table.enum('status', ['pending', 'done']).defaultTo('pending');
        table.integer('user_id').unsigned().references('id').inTable('users');
        table.timestamps(true, true);
    });
};

exports.down = function(knex) {
    return knex.schema.dropTableIfExists('tasks');
};

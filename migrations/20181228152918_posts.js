exports.up = function(knex) {
    return knex.schema.createTable('posts', function(table) {
        table.increments();

        table.string('username').notNullable();
        table.string('text').notNullable();

        table.timestamps();
    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('posts');
};

// knex migrate:make posts
// knex migrate:latest

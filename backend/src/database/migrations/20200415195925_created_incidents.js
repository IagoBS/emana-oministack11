exports.up = function(knex) {
    return knex.schema.createTable('incidents', function(table) {
        table.increments('id');
        table.string('title').notNullable();
        table.string('descripition').notNullable();
        table.decimal('value').notNullable();

        table.string('ong_id').notNullable();
        table.foreign('ong_id').references('id').inTable('ongs');


    });
};

exports.down = function(knex) {
    return knex.schema.dropTable('incidents');
};
const knex = require("knex")({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: '../notesdb.db',
    }
});

async function setupDatabase() {


  try {
    await knex.schema.hasTable("notes").then( async(hasNotesTable) => {
      if (hasNotesTable) return console.log("Notes Already exists");
      else {
        await knex.schema.createTable('notes', (table) => {
            table.increments("id");
            table.string("title");
            table.text("content");
            table.timestamps({useTimestamps: true,  useCamelCase: false});
          });
        return;
      }
    });


    await knex.schema.hasTable("tags").then(async (hasTagsTable) => {
      if (hasTagsTable) return console.log("Tags table already exists. Skip ...");
      else {
        await knex.schema.createTable('tags', (table) => {
          table.increments("id");
          table.string("name").notNullable().unique();
          table.timestamps({useTimestamps: true, useCamelCase: false});
          table.string("color");
          table.string("icon");
        });
        return;
      }
    });


    await knex.schema.hasTable("many_notes_have_many_tags").then(async (tableExists) => {
      if (tableExists) return console.log("many_notes_have_many_tags table already exists. Skip ...");
      else {
        await knex.schema.createTable('many_notes_have_many_tags', (table) => {
          table.increments("id");
          table.integer("note").notNullable().references("notes.id");
          table.integer("tag").notNullable().references("tags.id");
        });
        return;
      }
    });

  }
  catch (e) {
    console.log(e);
    return;
  }

}

module.exports = {setupDatabase, knex};

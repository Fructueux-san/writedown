import { seedNotes } from "./seeder";
export const knex = require("knex")({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './notes.db',
    }
});

export async function setupDatabase() {


  try {
    await knex.schema.hasTable("notebooks").then(async (hasNotebooksTable) => {
      if (hasNotebooksTable) return console.log("notebooks table already exists. Skip...");
      else {
        console.log("Creating notebooks table");
        await knex.schema.createTable("notebooks", (table) => {
          table.increments("id");
          table.string("name").notNullable();
          table.string("description");
          table.enu('status', ["NORMAL", "TRASH"]).defaultTo("NORMAL");
          table.timestamp("created_at");
          table.timestamp("updated_at");
        });
      }
    });

    await knex.schema.hasTable("notes").then( async(hasNotesTable) => {
      if (hasNotesTable) return console.log("Notes Already exists");
      else {
        await knex.schema.createTable('notes', (table) => {
            table.increments("id");
            table.string("title");
            table.text("content");
            table.boolean("pinned").defaultTo(false);
            table.enu('status', ["NORMAL", "TRASH", "PINNED"]).defaultTo("NORMAL");
            table.timestamps({useTimestamps: true,  useCamelCase: false});
            table.integer("notebook").references("notebood.id");
          });
        console.log('notes table creation... Done. ');
      }
      return;
    });

    // await knex.schema.hasTable("notebook_has_notes").then( async (hasTable) => {
    //   if (hasTable) console.log("notebook_has_notes table already exists. Skip");
    //   else {
    //     await knex.schema.createTable("notebook_has_notes", (table) => {
    //       table.increments("id");
    //       table.integer("notebook").references("notebooks.id");
    //       table.integer("note").references("notes.id");
    //       table.timestamp("added_at");
    //     });
    //     console.log("notebook_has_notes table creation ... done !");
    //   }
    //   return;
    // });

    await knex.schema.hasTable("tags").then(async (hasTagsTable) => {
      if (hasTagsTable) return console.log("Tags table already exists. Skip ...");
      else {
        await knex.schema.createTable('tags', (table) => {
          table.increments("id");
          table.string("name").notNullable().unique();
          table.timestamps({useTimestamps: true, useCamelCase: false});
          table.string("color");
        });
        console.log("tags table creation... Done.");
        return;
      }
    });


    await knex.schema.hasTable("notes_have_tags").then(async (tableExists) => {
      if (tableExists) return console.log("notes_have_tags table already exists. Skip ...");
      else {
        await knex.schema.createTable('notes_have_tags', (table) => {
          table.increments("id");
          table.integer("note").notNullable().references("notes.id");
          table.integer("tag").notNullable().references("tags.id");
        });
        console.log("notes_have_tags table creation ... Done");
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

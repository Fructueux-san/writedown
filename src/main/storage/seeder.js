const db = require("./note.db.js");
const { setupDatabase } = require("./storage.js");

async function seedNotes() {
  let notes = [
    {
      content: "# This is some note. Good stuffs are comming",
      title: "The first note",
      created_at: Date.now(),
      updated_at: Date.now()
    },
    {
      content: "# This is some note. Good stuffs are comming. __hoohoooo__, kjznfjngjksnjs. ",
      title: "Illegal uses of Python",
      created_at: Date.now(),
      updated_at: Date.now()
    },
    {
      content: "## The Pinnapple notes. So many things are done here. ",
      title: "Pinnapple use for healthcare.",
      created_at: Date.now(),
      updated_at: Date.now(),
    },
    {
      content: "# Reconnaisser que Dieu nous a laisser l'intelligence et l'intellect pour transcender. ",
      title: "Identification à la personnalité",
      created_at: Date.now(),
      updated_at: Date.now(),
    }

  ];

  // notes.forEach(async (note) => await db.createNote(note));
  // await db.createNote({
  //   "title" : `# This is the note title.`,
  //   "content": `# This is the content of the note.`,
  //   "created_at": "2024-05-03 01:15:00",
  //   "updated_at": "2024-05-03 01:15:00"
  // });
  // console.log("Notes seed done ! ");
  console.log(await db.getAllNotes());
}

// setupDatabase();
seedNotes();

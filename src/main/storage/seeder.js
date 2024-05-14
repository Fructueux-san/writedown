// const db = require("./note.db.js");
import { createNote, getAllNotes, createNotebook, createTag } from "./note.db.js";
import { notes } from "../../renderer/src/utils/constants.js";

export async function seedNotes() {

  var notebook = await createNotebook({name: "Passions", created_at: Date.now(), updated_at: Date.now(), description: "First notebook"});

  notes.forEach(async (note) => {
    note.notebook = notebook[0].id;
    await createNote(note)
  });
  console.log("Notes seed done ! ");
  console.log(await getAllNotes());
  console.log("Trash notes creation ...");
  for (let i=0; i<6; i++) {
    await createNote({
      "title" : `Title ${i}`,
      "content": `# This is the content of the note number ${i}.`,
      "created_at": Date.now(),
      "updated_at": Date.now(),
      "status": "TRASH"
    });
  }
  console.log("Trash notes creation done...");
  console.log("PINNED NOTE CREATION ...")
  for (let i=0; i<6; i++) {
    await createNote({
      "title" : `Title ${i}`,
      "content": `# This is the content of pinned note number ${i}.`,
      "created_at": Date.now(),
      "updated_at": Date.now(),
      "status": "PINNED",
    });
  }
  console.log("PINNED NOTE CREATION DONE...")

  console.log("TAGS CREATION ...");
  await createTag({
    name: "dev",
    color: "#3584E4",
    created_at: Date.now(),
    updated_at: Date.now()
  });
  await createTag({
    name: "hack",
    color: "#33D17A",
    created_at: Date.now(),
    updated_at: Date.now()
  });
  await createTag({
    name: "AI",
    color: "#E66100",
    created_at: Date.now(),
    updated_at: Date.now()
  });
  console.log("TAGS CREATION DONE...");

}


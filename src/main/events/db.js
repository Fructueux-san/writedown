// const notes = require("../storage/note.db");
import { getNoteInfo, deleteNote, updateNote, getAllNotes, createNote, createNotebook, allNotebooks, allTags, notebookNotes } from "../storage/note.db";

export const notesEvents = (ipcMain) => {
  ipcMain.on("get-all-notes", async (event, message) => {
    var data = await getAllNotes();
    event.sender.send("all-notes", data)
  });

  ipcMain.on("new-note", async (event, data) => {
    try {
      console.log("New note creation ");
      var result = await createNote(data);
      event.sender.send("new-note", { data: result, message:"Note successfully created"});
    }catch (err){
      event.sender.send("new-note-error", "An error occur when trying to execute this operation.");
    }
  });

  ipcMain.on("get-one-note", async (event, id) => {
    event.sender.send("one-note", await getNoteInfo(id));
  });

  ipcMain.on("save-note", async (event, data) => {
    // console.log("WE WANT TO SAVE NOTE ", data);
    await updateNote(data['id'], data['note']);
    event.sender.send("success", "Note successfully saved in database.");
  });

  ipcMain.on("delete-note", async (event, noteId) => {
    await deleteNote(noteId);
    event.sender.send("deletion-successful", "Note successfully deleted.");
  });

  ipcMain.on("pinned-notes", async(event, message) => {
    let notes = await getAllNotes();
    let pinned = [];
    notes.forEach(element => {
      if (element.status == "PINNED") {
        pinned.push(element)
      }
    });
    event.sender.send("pinned-notes-success", pinned);
  });



  // Notebook events
  ipcMain.on("new-notebook", async (event, notebook) => {
    console.log("New notebook creation start. ");
    try{
      let all = await createNotebook(notebook);
      event.sender.send("success", {"message": "Notebook successfully created! ", data: all});
    }
    catch (err) {
      console.log(err);
      event.sender.send("back-error", {"message" :"Error creating notebook", "error": err});
    }
  });

  ipcMain.on("all-notebooks", async (event, data) => {
      let notebooks = await allNotebooks();
      for (let i=0; i< notebooks.length; i++) {
        let notes = await notebookNotes(notebooks[i].id);
        notebooks[i].notes_count = notes.length;
        console.log(notebooks[i]);
      }
      event.sender.send("all-notebooks-success", notebooks);
  });


  // Tag events
  ipcMain.on("all-tags", async (event, message) => {
    try {
      let tags = await allTags();
      event.sender.send("tags-success", tags);
    }catch (err) {
      console.log(err);
      event.sender.send("all-tags-error", {message: "Error when retrieve all tags. ", error: err});
    }
  });
}


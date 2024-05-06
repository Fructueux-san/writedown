// const notes = require("../storage/note.db");
import { getNoteInfo, deleteNote, updateNote, getAllNotes, createNote } from "../storage/note.db";

export const notesEvents = (ipcMain) => {
  ipcMain.on("get-all-notes", async (event, message) => {
    var data = await getAllNotes();
    event.sender.send("all-notes", data)
  });

  ipcMain.on("new-note", async (event, data) => {
    try {
      console.log("New note creation ");
      var result = await createNote(data);
      event.sender.send("new-note", "Note successfully created");
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
}


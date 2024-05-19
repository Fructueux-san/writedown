// const notes = require("../storage/note.db");
import { getNoteInfo, deleteNote, updateNote, getAllNotes, createNote, createNotebook, allNotebooks, allTags, notebookNotes, allTrashedNotes, getPinnedNotes, getNotebookInfo, addTagToNote, getNoteTags, createTag } from "../storage/note.db";

export const notesEvents = (ipcMain) => {
  ipcMain.on("get-all-notes", async (event, message) => {
    var data = await getAllNotes();
    event.sender.send("all-notes", data)
  });

  ipcMain.on("new-note", async (event, data) => {
    try {
      console.log("New note creation with ", data);
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

  ipcMain.on("move-to-trash", async (event, id) => {
    let new_state = {
      status: "TRASH"
    }
    console.log("Moving to trash", new_state);
    let data = await updateNote(id, new_state);
    event.sender.send("move-to-trash-success", "successfully moved to trash.");
    console.log("Move to trash db log", data);
  });

  ipcMain.on("pinned-notes", async(event, message) => {
    let notes = await getPinnedNotes();
    event.sender.send("pinned-notes-success", notes);
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
      }
      event.sender.send("all-notebooks-success", notebooks);
  });

  ipcMain.on("notebook-notes", async (event, id) => {
    let notes = await notebookNotes(id);
    event.sender.send("notebook-notes-success", notes);
  });

  ipcMain.on("all-in-trash", async (event, message) => {
    let notes = await allTrashedNotes();
    // console.log(notes);
    event.sender.send("all-in-trash", notes);
  });

  ipcMain.on("notebook-info", async (event, id) => {
    let notebooks = await getNotebookInfo(id);
    console.log(notebooks);
    event.sender.send("notebook-info", notebooks);
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

  ipcMain.on("add-tag-to-note", async (event, data) => {
    let tags = await addTagToNote(data.tagId, data.noteId);
    event.sender.send("add-tag-to-note-success", tags);
  });

  ipcMain.on("get-note-tags", async (event, noteId) => {
    let tags = await getNoteTags(noteId);
    event.sender.send("note-tags", tags);
  });

  ipcMain.on("new-tag", async (event, data) => {
      await createTag(data);
      let tags = await allTags();
      event.sender.send("tags-success", tags);
  });
}


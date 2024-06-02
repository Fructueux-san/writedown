const database = require("knex")({
    client: 'sqlite3',
    useNullAsDefault: true,
    connection: {
      filename: './notes.db',
    }
});

export async function getAllNotes() {
  var result = await database("notes").select("id", "title", "notebook", "status", "created_at", "updated_at").where("status", "NORMAL").orWhere("status", "PINNED").orderByRaw("created_at DESC");
  return result;
}

export function createNote(note) {
  return database("notes").insert(note).returning("*");
}

export function deleteNote(id) {
  return database("notes").where("id", id).del();
}

export function getNoteInfo(id) {
  return database("notes").where("id", id).first();
}

export function updateNote(id, note) {
  return database("notes").where("id", id).update(note);
}

export function allTrashedNotes() {
  return database("notes").where("status", "TRASH").select("id", "title", "notebook", "status", "created_at", "updated_at");
}

export function getPinnedNotes() {
  return database("notes").select("id", "title", "notebook", "status", "created_at", "updated_at").where("status", "PINNED");
}

/**NOTEBOOKS**/
export function allNotebooks() {
  return database("notebooks").select("*").where("status", "NORMAL").orderByRaw("created_at DESC");
}
export function createNotebook(notebook) {
  return database("notebooks").insert(notebook).returning("*");
}

export function deleteNotebook(id) {
  return database("notebooks").where("id", id).del({returning: "*"});
}

export function updateNotebook(id, notebook){
  return database("notebooks").where("id", id).update(notebook).returning("*");
}

export function getNotebookInfo(id) {
  return database("notebooks").where("id", id).first();
}

/***NOTEBOOKS HAS NOTES***/
export function addNoteToNotebook(notebookId, noteId) {
  return database("notes").where("id", noteId).update({notebook: notebookId}).returning("*");
}

export async function notebookNotes(notebookId) {
  return await database("notes").where("notebook", notebookId).andWhere("status", "NORMAL").select("*");
}

export function notebookNotesCount(notebookId) {
  return database("notes").where("notebook", notebookId).count();
}

/****TAGS*****/
export function createTag(tag) {
  return database("tags").insert(tag).returning("*");
}
export function allTags(){
  return database("tags").select("*");
}
export function deleteTag(id) {
  return database("tags").where("id", id).del();
}

export function updateTag(id, tagData) {
  return database("tags").where("id", id).update(tagData).returning("*");
}

export function tagInfo(id) {
  return database("tags").where("id", id).first;
}

export function addTagToNote(tagId, noteId) {
  return database("notes_have_tags").insert({tag: tagId, note: noteId}).returning("*");
}

export function getNoteTags(noteId) {
  return database("tags").join("notes_have_tags", "tags.id", "notes_have_tags.tag").where({note: noteId});
}

export function deleteNoteTag(noteId, tagId) {
  return database("notes_have_tags").where("note", noteId).andWhere("tag", tagId).del();
}

module.exports = {
  getAllNotes,
  createNote,
  deleteNote,
  getNoteInfo,
  updateNote,
  allTrashedNotes,
  getPinnedNotes,
  allNotebooks,
  createNotebook,
  deleteNotebook,
  updateNotebook,
  getNotebookInfo,
  addNoteToNotebook,
  notebookNotes,
  notebookNotesCount,
  createTag,
  updateTag,
  deleteTag,
  tagInfo,
  allTags,
  addTagToNote,
  deleteNoteTag,
  getNoteTags
};

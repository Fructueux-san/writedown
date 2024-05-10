
// var knex = require("./storage").knex;
import { knex } from "./storage";

export async function getAllNotes() {
  var result = await knex("notes").select("id", "title", "created_at", "updated_at").orderByRaw("created_at DESC");
  return result;
}

export function createNote(note) {
  return knex("notes").insert(note).returning("*");
}

export function deleteNote(id) {
  return knex("notes").where("id", id).del();
}

export function getNoteInfo(id) {
  return knex("notes").where("id", id).first();
}

export function updateNote(id, note) {
  return knex("notes").where("id", id).update(note);
}

/**NOTEBOOKS**/
export function allNotebooks() {
  return knex("notebooks").select("*").orderByRaw("created_at DESC");
}
export function createNotebook(note) {
  return knex("notebooks").insert(note).returning("*");
}

export function deleteNotebook(id) {
  return knex("notebooks").where("id", id).del({returning: "*"});
}

export function updateNotebook(id, notebook){
  return knex("notebooks").where("id", id).update(notebook).returning("*");
}

export function getNotebookInfo(id) {
  return knex("notebooks").where("id", id).first();
}

/***NOTEBOOKS HAS NOTES***/
export function addNoteToNotebook(notebookId, noteId) {
  return knex("notes").where("id", noteId).update({notebook: notebookId}).returning("*");
}

export function notebookNotes(notebookId) {
  return knex("notes").where("notebook", notebookId).select("*");
}

export function notebookNotesCount(notebookId) {
  return knex("notes").where("notebook", notebookId).count();
}

/****TAGS*****/
export function createTag(tag) {
  return knex("tags").insert(tag).returning("*");
}

export function deleteTag(id) {
  return knex("tags").where("id", id).del();
}

export function updateTag(id, tagData) {
  return knex("tags").where("id", id).update(tagData).returning("*");
}

export function tagInfo(id) {
  return knex("tags").where("id", id).first;
}

export function addTagToNote(tagId, noteId) {
  return knex("notes_have_tags").insert({tag: tagId, note: noteId}).returning("*");
}

export function getNoteTags(noteId) {
  return knex("notes").join("notes_have_tags", "notes.id", "notes_have_tags.note").where({note: noteId});
}

module.exports = {
  getAllNotes,
  createNote,
  deleteNote,
  getNoteInfo,
  updateNote,
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
  addTagToNote,
  getNoteTags
};

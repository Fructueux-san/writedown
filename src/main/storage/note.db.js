
// var knex = require("./storage").knex;
import { knex } from "./storage";

export async function getAllNotes() {
  var result = await knex("notes").select("id", "title", "created_at", "updated_at").orderByRaw("created_at DESC");
  return result;
}

export function createNote(note) {
  return knex("notes").insert(note);
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


module.exports = {
  getAllNotes,
  createNote,
  deleteNote,
  getNoteInfo,
  updateNote
};

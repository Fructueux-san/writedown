
// var knex = require("./storage").knex;
import { knex } from "./storage";

export function getAllNotes() {
  var result = knex("notes").select("*");
  // Remove the content from the list
  // result.map(({content, ...rest}) => rest);
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

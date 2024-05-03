
var knex = require("./storage").knex;

 function getAllNotes() {
  var result = knex("notes").select("*");
  // Remove the content from the list
  // result.map(({content, ...rest}) => rest);
  return result;
}

 function createNote(note) {
  return knex("notes").insert(note);
}

 function deleteNote(id) {
  return knex("notes").where("id", id).del();
}

 function getNoteInfo(id) {
  return knex("notes").where("id", id).first();
}

 function updateNote(id, note) {
  return knex("notes").where("id", id).update(note);
}


module.exports = {
  getAllNotes,
  createNote,
  deleteNote,
  getNoteInfo,
  updateNote
};

import { contextBridge, ipcRenderer } from 'electron'
import { electronAPI } from '@electron-toolkit/preload'

// Custom APIs for renderer
const api = {}
const db = {
  allNotes: () => ipcRenderer.send("get-all-notes", null),
  oneNote: (id) => ipcRenderer.send("get-one-note", id),
  deleteOne: (id) => ipcRenderer.send("delete-one", id),
  saveNote: (data) => ipcRenderer.send("save-note", data),
}
// Use `contextBridge` APIs to expose Electron APIs to
// renderer only if context isolation is enabled, otherwise
// just add to the DOM global.
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld('electron', electronAPI)
    contextBridge.exposeInMainWorld('api', api)
    contextBridge.exposeInMainWorld('db', db);
  } catch (error) {
    console.error(error)
  }
} else {
  // window.electron = electronAPI
  window.api = api;
  window.db = db;
}

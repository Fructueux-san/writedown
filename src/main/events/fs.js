import { dialog } from "electron";
import * as fs from "fs";
export const fsEvents = (ipcMain) => {

  ipcMain.on("pdf-on-fs", async (event, message) => {
    const {filePath, canceled} = await dialog.showSaveDialog({
      defaultPath: `${message.title}.pdf`,
      filters: [{name: "pdf", extensions: "pdf"}]
    });

    if (filePath && !canceled) {
      fs.writeFile(filePath, message.data, (err) => {
        if (err) throw err;
          console.log("The pdf has been saved !");
      });
    }
  });

  ipcMain.on("md-on-fs", async (event, message) => {
    const {filePath, canceled} = await dialog.showSaveDialog(
      {
        defaultPath: `${message.title}.md`,
        filters: [{name: "markdown", extensions: "md"}]
      }
    );
    if (filePath && !canceled) {
      fs.writeFile(filePath, message.data, (err) => {
        if (err) throw err;
          console.log("The markdown file has been saved !");
      });
    }
  });
}

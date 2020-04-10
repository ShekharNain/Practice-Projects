import { app, BrowserWindow, ipcMain } from "electron";

let mainWindow: BrowserWindow;
app.on("ready", () => {
    mainWindow = new BrowserWindow({
        title: "hello-world-renderer"
    });
    mainWindow.loadFile(`${__dirname}/index.html`)
});
console.log("hello world");

ipcMain.on("file-selected", (_, file) => {
    console.log(file);
})
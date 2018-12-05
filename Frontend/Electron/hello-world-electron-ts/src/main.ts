import { app, BrowserWindow } from "electron";

app.on("ready", () => {
    const mainWindow: BrowserWindow = new BrowserWindow({
        title: "hello-world-renderer"
    });
});
console.log("hello world");
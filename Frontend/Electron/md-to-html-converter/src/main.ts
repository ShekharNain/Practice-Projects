import { app, BrowserWindow } from "electron";

app.on("ready", () => {
    const mainRenderer: BrowserWindow = new BrowserWindow({
        title: "md-to-html",
        show: false // by default don't show the window until it's ready
    });
    mainRenderer.loadURL(`file://${__dirname}/index.html`);

    // show window once it is ready
    mainRenderer.once("ready-to-show", () => {
        mainRenderer.show();
    });
});
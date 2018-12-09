import { app, BrowserWindow, dialog } from "electron";
import * as fs from "fs";

// This declared here so that mainRenderer will not get garbage collected,
// once the ready callback finish executing, we want to mae it grbage collected once the window gets closed,
// that's why added a even listener on 'close' as shown below.
let mainRenderer: BrowserWindow;
app.on("ready", () => {
    mainRenderer = new BrowserWindow({
        title: "md-to-html",
        show: false // by default don't show the window until it's ready
    });
    mainRenderer.loadURL(`file://${__dirname}/index.html`);

    // show window once it is ready
    mainRenderer.once("ready-to-show", () => {
        mainRenderer.show();
    });

    mainRenderer.on("close", () => {
        mainRenderer = null;
    })
});

export const getFileFromUserSelection = () => {
    const files = dialog.showOpenDialog({
        properties: ["openFile"],
        filters: [
            { name: "Markdown files", extensions: ["md", "markdown"] },
            { name: "Text files", extensions: ["txt"] }
        ]
    });
    if(!files) return;
    const file = files[0];
    const content = fs.readFileSync(file).toString();
    return content;
}
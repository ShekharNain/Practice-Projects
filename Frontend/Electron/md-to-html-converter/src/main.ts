import { app, BrowserWindow, dialog } from "electron";
import * as fs from "fs";

interface IFile {
    path: string;
    content: string;
}

// this declared here so that mainRenderer will not get garbage collected,
// once the ready callback finish executing, we want to mae it grbage collected once the window gets closed,
// that's why added a even listener on 'close' as shown below.
app.on("ready", () => {
    createWindow();
});

export function getFileFromUserSelection(targetWindow: BrowserWindow): string {
    const files: string[] = dialog.showOpenDialog(targetWindow, {
        properties: ["openFile"],
        filters: [
            { name: "Markdown files", extensions: ["md", "markdown"] },
            { name: "Text files", extensions: ["txt"] }
        ]
    });
    if(!files) { return; }
    return files[0];
}

export function openFile(targetWindow: BrowserWindow, filePath?: string): IFile {
    filePath = filePath || getFileFromUserSelection(targetWindow);
    const content: string = fs.readFileSync(filePath).toString().replace(/\r\n/g, "\n");
    console.log(content.charAt(15));
    targetWindow.setTitle(`${filePath} - md2Html`);
    targetWindow.webContents.send("file-opened", filePath, content);
    targetWindow.setRepresentedFilename(filePath);
    return { path: filePath, content };
}

const windows: Set<BrowserWindow> = new Set();

export function createWindow(): void {
    let newWindow: BrowserWindow = new BrowserWindow({
        title: "md-to-html",
        show: false // by default don't show the window until it's ready
    });
    windows.add(newWindow);
    newWindow.loadURL(`file://${__dirname}/index.html`);

    // show window once it is ready
    newWindow.once("ready-to-show", () => {
        newWindow.show();
    });

    // event triggered just before closing a window
    newWindow.on("close", (event) => {
        if (newWindow.isDocumentEdited()) {
            event.preventDefault();
            const result: number = dialog.showMessageBox(newWindow, {
                type: "warning",
                title: "Quit with unsaved changes",
                message: "your changes will be lost if you don't save the changes",
                buttons: [
                    "Quit anyway",
                    "cancel"
                ],
                defaultId: 0,
                cancelId: 1
            });
            if(result === 0) { newWindow.destroy(); }
        }
    });

    newWindow.on("closed", () => {
        windows.delete(newWindow);
        newWindow = null;
    });
}
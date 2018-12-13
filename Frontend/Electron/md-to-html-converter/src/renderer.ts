// import  "./style.css";
import * as marked from "marked";
import { remote, BrowserWindow, ipcRenderer } from "electron";

interface IFile {
    path: string;
    content: string;
}

let openedFile: IFile = {
    path: "",
    content: ""
};
const { openFile, createWindow, IFile } = remote.require("./main");
const currentWindow: BrowserWindow = remote.getCurrentWindow();

const mdView: HTMLTextAreaElement = document.querySelector("#markdown-view");
const htmlView: HTMLElement = document.getElementById("html-view");
const openFileBtn: HTMLElement = document.getElementById("open-file");
const newFileBtn: HTMLElement = document.getElementById("new-file");

function renderMdToHtml(mdText: string): void {
    htmlView.innerHTML = marked(mdText, {sanitize: true});
}

function updateEditedState(isEdited: boolean): void {
    currentWindow.setDocumentEdited(isEdited);
    let title: string = "md2Html";
    if (openedFile && openedFile.path) {
        title = `${openedFile.path} - ${title}`;
    }
    if (isEdited) {
        title = `${title} (Edited)`;
    }
    currentWindow.setTitle(title);
}

mdView.addEventListener("keyup", (event) => {
    const currentContent: string = (event.target as any).value;
    renderMdToHtml(currentContent);
    updateEditedState(currentContent !== openedFile.content);
});

openFileBtn.addEventListener("click", () => {
    openFile(currentWindow);
    // if (file) {
    //     mdView.value = file.content;
    //     renderMdToHtml(file.content);
    //     openedFile = file;
    // }
});

ipcRenderer.on("file-opened", (event: any, file: string, content: string) => {
    openedFile.path = file;
    openedFile.content = content;

    mdView.value = content;
    renderMdToHtml(content);
    updateEditedState(false);
});

newFileBtn.addEventListener("click", () => {
    createWindow();
});
// import  "./style.css";
import * as marked from "marked";
import { remote } from "electron";
const { getFileFromUserSelection } = remote.require("./main");

const mdView = document.getElementById("markdown-view");
const htmlView = document.getElementById("html-view");
const openFileBtn = document.getElementById("open-file");

const renderMdToHtml = (mdText: string) => {
    htmlView.innerHTML = marked(mdText, {sanitize: true});
}

mdView.addEventListener("keyup", (event) => {
    renderMdToHtml((event.target as any).value);
});

openFileBtn.addEventListener("click", () => {
    const file = getFileFromUserSelection();
    mdView.innerHTML = file;
    renderMdToHtml(file);
})
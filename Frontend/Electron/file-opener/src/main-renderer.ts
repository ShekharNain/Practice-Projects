import * as marked from "marked";
import { ipcRenderer } from "electron";

let files: File[];
const markdownView = document.querySelector('#markdown');
const htmlView = document.querySelector('#html');
const newFileButton = document.querySelector('#new-file');
const openFileButton = document.querySelector('#open-file');
const saveMarkdownButton = document.querySelector('#save-markdown');
const revertButton = document.querySelector('#revert');
const saveHtmlButton = document.querySelector('#save-html');
const showFileButton = document.querySelector('#show-file');
const openInDefaultButton = document.querySelector('#open-in-default');
const fileElem = document.getElementById("fileElem");

const reader = new FileReader();

newFileButton.addEventListener("click", function (e) {
  if (fileElem) {
    fileElem.click();
  }
}, false);

fileElem.addEventListener("change", (event) => {
  handleFiles(event);
})

function handleFiles(event: Event) {
  files = (event.target as any).files;
  // reader.onload = (event) => {
  //   console.log(event);
  // }

  // reader.onprogress = (event) => {
  //   console.log(event);
  // }

  // reader.readAsText(files[0]);
  ipcRenderer.send("file-selected", (files[0] as any).stream());
}

const renderMarkdownToHtml = (markdown: any) => {
  htmlView.innerHTML = marked(markdown, { sanitize: true });
};

markdownView.addEventListener('keyup', event => {
  const currentContent = (event.target as any).value;
  renderMarkdownToHtml(currentContent);
});
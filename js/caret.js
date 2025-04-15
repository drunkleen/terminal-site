function $(elid) {
    return document.getElementById(elid);
  }
  
let cursor;
window.onload = init;

function init() {
  cursor = $("cursor");
  cursor.style.left = "0px";
}

function nl2br(txt) {
  return txt.replace(/\n/g, '');
}

function typeIt(from, e) {
  const fullText = from.value;
  const caretIndex = from.selectionStart;
  const textUpToCaret = fullText.slice(0, caretIndex);
  const typer = $("typer");
  const cursor = $("cursor");
  const prefix = document.querySelector(".prefix");

  if (!pw) {
    typer.innerHTML = nl2br(fullText);
  } 

  const prefixWidth = prefix.getBoundingClientRect().width;

  const span = document.createElement("span");
  span.style.visibility = "hidden";
  span.style.position = "absolute";
  span.style.whiteSpace = "pre";
  span.style.font = window.getComputedStyle(typer).font;
  span.textContent = textUpToCaret || " ";
  document.body.appendChild(span);

  const typedWidth = span.getBoundingClientRect().width;
  document.body.removeChild(span);

  const cursorOffset = -10; // offset 1 char left at start
  const total = prefixWidth + typedWidth + (fullText.length === 0 ? cursorOffset : 0);

  cursor.style.left = `${total}px`;
}


function alert(txt) {
  console.log(txt);
}
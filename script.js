//objekt för att skapa och lagra spelets innehåll
let content = {
  // currentScene: "scene1",
  scene1: {
    title: "The Wolf",
    text: `You step into the forrest, immediately meet a giant wolf. You don't see <br /> 
   any weapons nearby, and you need to make decision quickly. What do you do?`,
    image: "./images/wolf.jpg",
    options: [
      {
        text: "Scream loudly and run",
      },
      {
        text: "Wait for the wolf to make a move",
      },
      {
        text: "Ask the wolf for help",
      },
      {
        text: "Ignore the wolf, keep moving",
      },
    ],
  },
};

//anropar en callback till main när sidan har laddats
window.addEventListener("DOMContentLoaded", main);

// spelaren ska kunna plocka upp (lagre) och använda (ta bort) objekt under spelet
let backpack = {};

function main() {
  //variabler för de 2 knapparna på sidan från allra första början
  const btnHtml = document.querySelector(".btn");
  const startBtnHtml = document.getElementById("startBtn");
  //anropar em callback till funktionenn showInstructions när man klickar på rulesBtnHtml
  btnHtml.addEventListener("click", showInstructions);
  //anropar en callback till funktionen startGame när man klickar på startBtnHtml
  startBtnHtml.addEventListener("click", startGame);
}

function showInstructions() {}

function startGame() {
  clearContent();
  renderNewContent();
}

function clearContent() {
  const pageTitleHtml = document.querySelector(".page-title");
  const textHtml = document.querySelector(".page-text");
  const btnsHtml = document.querySelector(".btn-grid");

  pageTitleHtml.remove();
  textHtml.remove();
  btnsHtml.remove();
}

function renderNewContent() {
  const contentHtml = document.querySelector(".content");
  // const imageHtml = document.createElement("img");
  // imageHtml.id = "#content-image";
  // imageHtml.src = content.scene1.image;
  // contentHtml.append(imageHtml);

  const titleHtml = document.createElement("h2");
  titleHtml.className = "page-title";
  titleHtml.innerHTML = content.scene1.title;
  contentHtml.append(titleHtml);

  const paragraphHtml = document.createElement("p");
  paragraphHtml.className = "page-text";
  paragraphHtml.innerHTML = content.scene1.text;
  contentHtml.append(paragraphHtml);

  const btnGridHtml = document.createElement("div");
  btnGridHtml.className = "btn-grid";

  let btnHtml;
  for (let i = 0; i < content.scene1.options.length; i++) {
    btnHtml = document.createElement("button");
    btnHtml.className = "btn";
    btnHtml.innerHTML = content.scene1.options[i].text;
    btnGridHtml.append(btnHtml);
  }
  contentHtml.append(btnGridHtml);
}

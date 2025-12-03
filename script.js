//objekt för att skapa och lagra spelets innehåll
let content = {
  currentScene: "scene1",
  scene1: {
    title: "The Wolf",
    text: `You step into the forrest, immediately meet a giant wolf.<br /> 
      You don't see any weapons nearby. What do you do?`,
    image: "./images/wolf.jpg",
    options: [
      {
        text: "Run for your life",
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

function showInstructions() {
  clearContent();
}

function startGame() {
  clearContent();
  renderNewContent();
}

function clearContent() {
  //radera allt innehåll genom att radera containern
  const containertHtml = document.querySelector(".container");
  containertHtml.remove();
}

function renderNewContent() {
  //skapa en ny div (class = "container")
  const newContainerHtml = document.createElement("div");
  newContainerHtml.className = "container";

  //lägg till container till document.body med append()
  document.body.append(newContainerHtml);

  //skapa en ny bakgrundsbild (class = "bg-image")
  const newImageHtml = document.createElement("img");
  newImageHtml.id = "bg-image";

  //anger platsen för src, lägg till i container
  newImageHtml.src = content[content.currentScene].image;
  newContainerHtml.append(newImageHtml);

  const contentHtml = document.createElement("div");
  contentHtml.classList = "content";
  newContainerHtml.append(contentHtml);

  const titleHtml = document.createElement("h2");
  titleHtml.className = "page-title";

  titleHtml.innerHTML = content[content.currentScene].title;
  contentHtml.append(titleHtml);

  const paragraphHtml = document.createElement("p");
  paragraphHtml.className = "page-text";
  paragraphHtml.innerHTML = content[content.currentScene].text;
  contentHtml.append(paragraphHtml);

  const btnGridHtml = document.createElement("div");
  btnGridHtml.className = "btn-grid";

  let btnHtml;
  for (let i = 0; i < content[content.currentScene].options.length; i++) {
    btnHtml = document.createElement("button");
    btnHtml.className = "btn" + i;
    btnHtml.innerHTML = content[content.currentScene].options[i].text;
    btnGridHtml.append(btnHtml);
  }
  contentHtml.append(btnGridHtml);
}

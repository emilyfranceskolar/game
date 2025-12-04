//objekt för att skapa och lagra spelets innehåll
let content = {
  help: {
    title: "how to play",
    text: `To play this game it's simple, click on 1 of the buttons to make a decision based on the text. <br /> `,
    image: "./images/help.jpg",
    options: [
      {
        text: "Eh, I'm good",
      },
      {
        text: "Ok, let's play",
      },
    ],
  },
  wolf: {
    title: "The Wolf",
    text: `You step into the forrest, immediately meet a giant wolf.<br /> 
      You don't see any weapons nearby. What do you do?`,
    image: "./images/wolf.jpg",
    options: [
      {
        text: "ask the wolf for help",
      },
      {
        text: "run for your life",
      },
      {
        text: "look for a weapon",
      },
      {
        text: "quit game",
      },
    ],
  },
  cabin: {
    title: "The Cabin",
    text: `You see a cabin in the distance, you're not sure if the wolf is behind you or not. What do you do?`,
    image: "./images/cabin.jpg",
    options: [
      {
        text: "run to the cabin",
      },
      {
        text: "eh I'm good, quit game",
      },
      {
        text: "ignore the cabin",
      },
      {
        text: "scream for help",
      },
    ],
  },
  tent: {
    title: "The Campsite",
    text: `You've come to what looks like a tent in the distance. You're not sure if the wolf is behind you or not. What do you do?`,
    image: "./images/camper.jpg",
    options: [
      {
        text: "stop and listen for sounds",
      },
      {
        text: "call for help",
      },
      {
        text: "look for a weapon",
      },
      {
        text: "quit game",
      },
    ],
  },
};

//anropar en callback till main när sidan har laddats
window.addEventListener("DOMContentLoaded", main);

// spelaren ska kunna plocka upp (lagre) och använda (ta bort) objekt under spelet
let backpack = [];

// variabel för att lagra var spelare befinner sig i spelet
let currentScene = null;

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
  currentScene = content.help;
  clearContent();
  renderNewContent(currentScene);
}

function startGame() {
  currentScene = content.wolf;
  clearContent();
  renderNewContent(currentScene);
}

function clearContent() {
  //radera allt innehåll genom att radera containern
  const containertHtml = document.querySelector(".container");
  containertHtml.remove();
}

function renderNewContent(currentScene) {
  //skapa en ny div (class = "container")
  const newContainerHtml = document.createElement("div");
  newContainerHtml.className = "container";

  //lägg till container till document.body med append()
  document.body.append(newContainerHtml);

  //skapa en ny bakgrundsbild (class = "bg-image")
  const newImageHtml = document.createElement("img");
  newImageHtml.id = "bg-image";

  //anger platsen för src, lägg till i container
  newImageHtml.src = currentScene.image;

  newContainerHtml.append(newImageHtml);

  const contentHtml = document.createElement("div");
  contentHtml.classList = "content";
  newContainerHtml.append(contentHtml);

  const titleHtml = document.createElement("h2");
  titleHtml.className = "page-title";

  titleHtml.innerHTML = currentScene.title;
  contentHtml.append(titleHtml);

  const paragraphHtml = document.createElement("p");
  paragraphHtml.className = "page-text";
  paragraphHtml.innerHTML = currentScene.text;
  contentHtml.append(paragraphHtml);

  const btnGridHtml = document.createElement("div");
  btnGridHtml.className = "btn-grid";

  let btnHtml;
  for (let i = 0; i < currentScene.options.length; i++) {
    btnHtml = document.createElement("button");
    btnHtml.className = "btn" + i;
    btnHtml.innerHTML = currentScene.options[i].text;
    btnGridHtml.append(btnHtml);
  }
  contentHtml.append(btnGridHtml);
  console.log(Object.keys(content));

  getSelection();
}

function getSelection() {
  //en nodelist skapas när alla knappar hämtas
  const listOfButtons = document.querySelectorAll("button");
  // console.log(listOfButtons);

  //for varje knapp vill vi se vad den innehåller
  for (const button of listOfButtons) {
    console.log(button);
  }
}

function gameOver() {}

//objekt för att skapa och lagra spelets innehåll
let content = {
  help: {
    title: "how to play",
    text: `To play this game it's simple, click on 1 of the buttons to make a decision based on the text. <br /> `,
    image: "./images/help.jpg",
    options: [
      {
        text: "what is a rpg?",
      },
      {
        text: "Ok, let's play",
        nextScene: "wolf",
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
        text: "run for your life",
        nextScene: "cabin",
      },
      {
        text: "move slowly away",
        nextScene: "gameover",
      },
      {
        text: "ask the wolf for help",
      },
      {
        text: "look for weapons",
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
        text: "eh I'll pass, quit game",
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
  gameOver: {
    title: "game terminated!",
    text: `Better luck next time! Do you want to try again?`,
    image: "./images/bye.jpg",
    options: [
      {
        text: "play again",
      },
      {
        text: "what is rpg?",
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

  // skapa en div
  const exitBtnContainer = document.createElement("div");
  exitBtnContainer.className = "exitBtnContainer";

  // knapp för att avsluta spelet
  const exitBtnHtml = document.createElement("button");
  exitBtnHtml.id = "exitBtn";
  exitBtnHtml.innerText = "exit game";

  // lägg till avslut-knappen i sin div
  exitBtnContainer.append(exitBtnHtml);

  // lägg till nya bakgrundsbilden i en container
  newContainerHtml.append(newImageHtml, exitBtnContainer);

  const contentHtml = document.createElement("div");
  contentHtml.classList = "content";
  newContainerHtml.append(contentHtml);

  //skapa en ny titel
  const titleHtml = document.createElement("h2");
  titleHtml.className = "page-title";

  // lägg till respektiv title från objektet content
  titleHtml.innerHTML = currentScene.title;

  //skapa en ny paragraf
  const paragraphHtml = document.createElement("p");
  paragraphHtml.className = "page-text";

  // lägg till respektiv text från objektet {content}
  paragraphHtml.innerHTML = currentScene.text;

  // skapa en grid div/container för alla knappar
  const btnGridHtml = document.createElement("div");
  btnGridHtml.className = "btn-grid";

  //skapa alla knappar med info från  objektet {content}
  for (let i = 0; i < currentScene.options.length; i++) {
    btnHtml = document.createElement("button");
    btnHtml.className = "btn" + i;
    btnHtml.innerHTML = currentScene.options[i].text;
    console.log(btnHtml);
    btnHtml.onclick = () => loadNextScene(content.options[i].nextScene);
    btnGridHtml.append(btnHtml);
  }

  // lägg till alla nya element i content-div:en
  contentHtml.append(titleHtml, paragraphHtml, btnGridHtml);
  // console.log(Object.keys(content));
}

function loadNextScene() {
  currentScene = content.options.nextScene;
}

// function gameOver() {}

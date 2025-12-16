//objekt för att skapa och lagra spelets innehåll
let content = {
  start: {
    title: "Welcome to the Dark Forrest!",
    text: `In this game you need to find your way to the Majestic Mountain.
          Look for tools to use and watch out for enemies along the way!`,
    image: "./images/start.jpg",
    options: [
      {
        text: "how to play",
        nextScene: "help",
      },
      {
        text: "start game",
        nextScene: "wolf",
      },
    ],
  },
  help: {
    title: "how to play",
    text: `To play this game it's simple, click on 1 of the buttons to make a decision based on the text. <br /> `,
    image: "./images/help.jpg",
    options: [
      {
        text: "what is a rpg?",
        nextScene: "cabin",
      },
      {
        text: "ok, let's play",
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
        text: "back slowly away",
        nextScene: "wolfeat",
      },
      {
        text: "look for weapons",
        nextScene: "wolfeat",
      },
    ],
  },
  wolfeat: {
    title: "Game over!",
    text: `You didn't stand a chance against this hungry and giant wolf`,
    image: "./images/wolf2.jpg",
    options: [
      {
        text: "Try again?",
        nextScene: "start",
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
        nextScene: "game",
      },
      {
        text: "ignore the cabin, keep running",
        nextScene: "tent",
      },
      {
        text: "scream for help",
        nextScene: "game",
      },
    ],
  },
  tent: {
    title: "The Campsite",
    text: `You've come to what looks like a tent in the distance. You're not sure if the wolf is behind you or not. What do you do?`,
    image: "./images/camper.jpg",
    options: [
      {
        text: "call for help",
        nextScene: "terminate",
      },
      {
        text: "look for a weapon",
        nextScene: "terminate",
      },
    ],
  },
  terminate: {
    title: "game terminated!",
    text: `Better luck next time! Do you want to try again?`,
    image: "./images/bye.jpg",
    options: [
      {
        text: "play again",
        nextScene: "start",
      },
    ],
  },
};

//anropar en callback till main när sidan har laddats
window.addEventListener("DOMContentLoaded", main);

// spelaren ska kunna plocka upp (lagre) och använda (ta bort) objekt under spelet
let backpack = [];

// variabel för att lagra var spelare befinner sig i spelet
let scene = null;

function main() {
  scene = content.start;
  renderNewContent();
}

function clearContent() {
  //radera allt innehåll genom att radera containern
  const container = document.querySelector(".container");
  container.remove();
}

function renderNewContent() {

  //skapa en ny div (class = "container")
  const newContainer = document.createElement("div");
  newContainer.className = "container";

  //lägg till container till document.body med append()
  document.body.append(newContainer);

  //skapa en ny bakgrundsbild (class = "bg-image")
  const newImage = document.createElement("img");
  newImage.id = "bg-image";

  //anger platsen för src, lägg till i container
  newImage.src = scene.image;

  // skapa en div för nedanför knapp
  const exitBtnContainer = document.createElement("div");
  exitBtnContainer.className = "exitBtnContainer";

  // knapp för att avsluta spelet
  const exitBtn = document.createElement("button");
  exitBtn.id = "exitBtn";
  exitBtn.innerText = "exit game";

  // lägg till avslut-knappen i sin div
  exitBtnContainer.append(exitBtn);
  exitBtn.onclick = () => gameOver();

  // lägg till nya bakgrundsbilden i en container
  newContainer.append(newImage, exitBtnContainer);

  const content = document.createElement("div");
  content.classList = "content";
  newContainer.append(content);

  //skapa en ny titel
  const title = document.createElement("h2");
  title.className = "page-title";

  // lägg till respektiv title från objektet content
  title.innerHTML = scene.title;

  //skapa en ny paragraf
  const paragraph = document.createElement("p");
  paragraph.className = "page-text";

  // lägg till respektiv text från objektet {content}
  paragraph.innerHTML = scene.text;

  // skapa en grid div/container för alla knappar
  const btnGrid = document.createElement("div");
  btnGrid.className = "btn-grid";

  //skapa knappar med info från objektet {content} för varje gång i < c
  for (let i = 0; i < scene.options.length; i++) {
    btn = document.createElement("button");
    btn.className = "btn" + i;
    btn.innerHTML = scene.options[i].text;
    btnGrid.append(btn);
    btn.onclick = () => loadNextScene(scene.options[i].nextScene);
  }

  // lägg till alla nya element i content-div:en
  content.append(title, paragraph, btnGrid);
}

function loadNextScene(scene) {
  console.log(scene);
  
  clearContent();
  renderNewContent();
}

function gameOver() {
  scene = content.terminate;
  clearContent();
  renderNewContent(scene);
}

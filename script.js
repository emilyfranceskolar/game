//objekt för att skapa och lagra spelets innehåll
let content = {
  intro: {
    title: "Welcome to the Dark Forrest!",
    text: "You're alone and with nothing. You need to find a way out of the forrest.",
    image: "./images/start.jpg",
    options: [
      {
        text: "how to play",
        nextScene: "help",
      },
      {
        text: "play game",
        nextScene: "start",
      },
    ],
  },
  help: {
    title: "How to play",
    text: "In this RPG you will interact with fictional characters,<br>scenes. Take action by clicking on 1 of the buttons.",
    image: "./images/help.jpg",
    options: [
      {
        text: "what is rpg?",
        nextScene: "rpg",
      },
      {
        text: "start game",
        nextScene: "start",
      },
    ],
  },
  start: {
    title: "Starting point",
    text: "Not much here, what do you do?",
    image: "./images/clearing.jpg",
    options: [
      {
        text: "go left",
        nextScene: "creek",
      },
      {
        text: "go right",
        nextScene: "trail",
      },
    ],
  },
  trail: {
    title: "Wondering around",
    text: "Looks like there's a trail, what do you do?",
    image: "./images/path.jpg",
    options: [
      {
        text: "follow trail",
        nextScene: "cabin",
      },
      {
        text: "ignore trail",
        nextScene: "creek",
      },
    ],
  },
  creek: {
    title: "Water",
    text: "You've found a small creek. What do you do?",
    image: "./images/creek.jpg",
    options: [
      {
        text: "cross water",
        nextScene: "troll",
      },
      {
        text: "ignore, go right",
        nextScene: "cabin",
      },
    ],
  },
  troll: {
    title: "WTF!?",
    text: "You meet a giant troll. What do you do?",
    image: "./images/troll.jpg",
    options: [
      {
        text: "run away",
        nextScene: "kill",
      },
      {
        text: "talk to troll",
        nextScene: "troll2",
      },
    ],
  },
  kill: {
    title: "Game over",
    text: "You've been killed",
    image: "./images/kill.jpg",
    options: [
      {
        text: "play again",
        nextScene: "intro",
      },
    ],
  },
  troll2: {
    title: "Lost axe",
    text: "The troll tells you he's lost his axe and <br> wants help finding it. What do you do?",
    image: "./images/troll.jpg",
    options: [
      {
        text: "agree to help",
        nextScene: "cabin",
      },
      {
        text: "run for your life",
        nextScene: "kill",
      },
    ],
  },
  wolf: {
    title: "Uh oh...",
    text: "You meet a wolf, what do you do?",
    image: "./images/wolf.jpg",
    options: [
      {
        text: "back up slowly",
        nextScene: "kill",
      },
      {
        text: "run for your life",
        nextScene: "troll",
      },
    ],
  },
  cabin: {
    title: "The Cabin",
    text: "You see a cabin, the door is open. What do you do?",
    image: "./images/cabin.jpg",
    options: [
      {
        text: "go left",
        nextScene: "wolf",
      },
      {
        text: "go to cabin",
        nextScene: "inside",
      },
    ],
  },
  inside: {
    title: "Inside the cabin",
    text: "You enter and find an axe. What do you do?",
    image: "./images/inside.jpg",
    options: [
      {
        text: "ignore, leave cabin",
        nextScene: "wolf",
      },
      {
        text: "take the axe",
        nextScene: "axe",
      },
    ],
  },
  axe: {
    title: "Weapon added",
    text: "You leave the cabin with the weapon. What do you do?",
    image: "./images/axe.jpg",
    options: [
      {
        text: "go outside",
        nextScene: "cabin",
      },
      {
        text: "",
        nextScene: "attack",
      },
    ],
  },
  campsite: {
    title: "The Campsite",
    text: "You see a campsite in the distance. You're not <br>sure if it's empty or not. What do you do?",
    image: "./images/campsite.jpg",
    options: [
      {
        text: "scream for help",
        nextScene: "eaten",
      },
      {
        text: "ignore, keep running",
        nextScene: "cabin",
      },
    ],
  },
};
window.addEventListener("DOMContentLoaded", main);

// variabel för att lagra var spelare befinner sig i spelet
let scene = null;
let backpack = [];

function main() {
  scene = content.intro;
  renderNewContent();
}

function clearContent() {
  const container = document.querySelector(".container");
  container.remove();
}

function renderNewContent() {
  const newContainer = document.createElement("div");
  newContainer.className = "container";
  document.body.append(newContainer);

  const newImage = document.createElement("img");
  newImage.id = "bg-image";

  if (scene === content.eaten) {
    newImage.src = "./images/wolf2.jpg";
  } else {
    newImage.src = scene.image;
  }
  newContainer.append(newImage);

  if (
    scene !== content.intro &&
    scene !== content.kill &&
    scene !== content.help &&
    scene !== content.eaten
  ) {
    const exitBtnContainer = document.createElement("div");
    exitBtnContainer.className = "exitBtnContainer";
    const exitBtn = document.createElement("button");
    exitBtn.id = "exitBtn";
    exitBtn.innerText = "exit game";
    exitBtnContainer.append(exitBtn);
    newContainer.append(exitBtnContainer);
    exitBtn.onclick = () => resetGame();
  }

  const mainContent = document.createElement("div");
  mainContent.classList = "content";
  newContainer.append(mainContent);

  let bag = document.createElement("p");
  if (backpack.length !== 0) {
    bag.className = "backpack";
    bag.innerHTML = "inventory: " + backpack;
  }

  const title = document.createElement("h2");
  title.className = "page-title";

  if (scene === content.eaten) {
    title.innerHTML = "Game over";
  } else {
    title.innerHTML = scene.title;
  }

  const paragraph = document.createElement("p");
  paragraph.className = "page-text";
  if (scene === content.eaten) {
    paragraph.innerHTML = "You've been eaten by the wolf";
  } else {
    paragraph.innerHTML = scene.text;
  }

  const btnGrid = document.createElement("div");
  btnGrid.className = "btn-grid";

  if (scene === content.eaten) {
    btn = document.createElement("button");
    btn.className = "btn";
    btn.innerHTML = "play agin?";
    btnGrid.append(btn);
    btn.onclick = () => resetGame();
  } else {
    //skapa knappar med info från objektet {content}
    for (let i = 0; i < scene.options.length; i++) {
      btn = document.createElement("button");
      btn.className = "btn" + i;
      btn.innerHTML = scene.options[i].text;
      btnGrid.append(btn);
      btn.onclick = () => loadNextScene(scene.options[i].nextScene);

      if (scene.options[i].nextScene === "rpg") {
        btn.onclick = () => loadRpgScene();
      } else if (scene.options[i].nextScene === "reset") {
        btn.onclick = () => resetGame();
      }
    }
  }
  mainContent.append(bag, title, paragraph, btnGrid);
}

function loadNextScene(nextScene) {
  scene = content[nextScene];
  if (nextScene === "axe") {
    backpack.push("axe");
  }
  clearContent();
  renderNewContent();
}

function loadRpgScene() {
  window.open("https://en.wikipedia.org/wiki/Role-playing_game", "_blank");
}

function resetGame() {
  backpack = [];
  scene = content.intro;
  clearContent();
  renderNewContent();
}

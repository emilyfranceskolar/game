//objekt för att skapa och lagra spelets innehåll
let content = {
  intro: {
    image: "./images/start.jpg",
    title: "Welcome to the Dark Forrest!",
    text: "You're alone in a strange forrest. Try to find<br>  someone  to help you get out of the forrest.",
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
    image: "./images/help.jpg",
    title: "How to play",
    text: "In this RPG you will interact with fictional characters,<br>scenes. Take action by clicking on 1 of the buttons.",
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
    image: "./images/clearing.jpg",
    title: "Starting point",
    text: "You don't see or hear anything, what do you do?",
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
    image: "./images/path.jpg",
    title: "Wondering around",
    text: "Looks like there's a trail, what do you do?",
    options: [
      {
        text: "follow trail",
        nextScene: "cabin",
      },
      {
        text: "ignore trail",
        nextScene: "wolf",
      },
    ],
  },
  creek: {
    image: "./images/creek.jpg",
    title: "Water",
    text: "You see a small creek. What do you do?",
    options: [
      {
        text: "go left",
        nextScene: "troll",
      },
      {
        text: "go right",
        nextScene: "wolf",
      },
    ],
  },
  troll: {
    image: "./images/troll.jpg",
    title: "WTF!?",
    text: "A giant, angry troll appears. What do you do?",
    options: [
      {
        text: "run left",
        nextScene: "sandwich",
      },
      {
        text: "run right",
        nextScene: "trail",
      },
    ],
  },
  sandwich: {
    image: "./images/sandwich.jpg",
    title: "Game over",
    text: "The giant ate you like a juicy sandwich...",
    options: [
      {
        text: "play again",
        nextScene: "intro",
      },
    ],
  },
  wolf: {
    image: "./images/wolf.jpg",
    title: "Uh oh...",
    text: "You meet a wolf, what do you do?",
    options: [
      {
        text: "back up slowly",
        nextScene: "rip",
      },
      {
        text: "run for your life",
        nextScene: "cabin",
      },
    ],
  },
  cabin: {
    image: "./images/cabin.jpg",
    title: "The Cabin",
    text: "You see a cabin, the door is open. What do you do?",
    options: [
      {
        text: "ignore the cabin",
        nextScene: "stranger",
      },
      {
        text: "go inside cabin",
        nextScene: "inside",
      },
    ],
  },
  stranger: {
    image: "./images/stranger.jpg",
    title: "A stranger",
    text: "You meet someone with a torch. What do you do?",
    options: [
      {
        text: "talk to person",
        nextScene: "stranger2",
      },
      {
        text: "ignore person",
        nextScene: "wolf",
      },
    ],
  },
  stranger2: {
    image: "./images/stranger.jpg",
    title: "A stranger",
    text: "The person offers to help you. What do you do?",
    options: [
      {
        text: "trust and follow this person",
        nextScene: "exit",
      },
      {
        text: "uhm, go back to the cabin",
        nextScene: "wolf",
      },
    ],
  },
  inside: {
    image: "./images/inside.jpg",
    title: "Inside the cabin",
    text: "You enter and find an axe. What do you do?",
    options: [
      {
        text: "ignore, leave cabin",
        nextScene: "cabin",
      },
      {
        text: "pick up the axe",
        nextScene: "axe",
      },
    ],
  },
  axe: {
    image: "./images/axe.jpg",
    title: "Weapon added",
    text: "You leave the cabin with the weapon in your hand. What do you do?",
    options: [
      {
        text: "go left",
        nextScene: "witch",
      },
      {
        text: "go right",
        nextScene: "wolfpack",
      },
    ],
  },
  witch: {
    image: "./images/witch.jpg",
    title: "Black magic?",
    text: "You meet a woman dressed all black, doing witchcraft. What do you do?",
    options: [
      {
        text: "approach her",
        nextScene: "rip",
      },
      {
        text: "run from her",
        nextScene: "rip",
      },
    ],
  },
  wolfpack: {
    image: "./images/wolfpack.jpg",
    title: "Wolves, as in wolkpack",
    text: "You meet a pack of wolves, what do you do?",
    options: [
      {
        text: "run for your life",
        nextScene: "eaten",
      },
      {
        text: "fight the wolves",
        nextScene: "eaten",
      },
    ],
  },
  exit: {
    image: "./images/exit.jpg",
    title: "You found a way out",
    text: "Well done! The person knew exactly how to leave and will drive you home.",
    options: [
      {
        text: "play again?",
        nextScene: "start",
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

  if (scene === content.rip) {
    newImage.src = "./images/blood.jpg";
  } else {
    newImage.src = scene.image;
  }
  newContainer.append(newImage);

  if (
    scene !== content.intro &&
    scene !== content.help &&
    scene !== content.exit &&
    scene !== content.sandwich &&
    scene !== content.rip
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

  if (scene === content.rip) {
    title.innerHTML = "Game over";
  } else {
    title.innerHTML = scene.title;
  }

  const paragraph = document.createElement("p");
  paragraph.className = "page-text";
  if (scene === content.rip) {
    paragraph.innerHTML = "Wrong move! ";
  } else {
    paragraph.innerHTML = scene.text;
  }

  const btnGrid = document.createElement("div");
  btnGrid.className = "btn-grid";

  if (scene === content.rip) {
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

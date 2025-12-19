//objekt för att skapa och lagra spelets innehåll
let content = {
  start: {
    title: "Welcome to the Dark Forrest!",
    text: `In this game you need to find your way out of <br>the forrest. Watch out for enemies along the way!`,
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
        nextScene: "rpg",
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
        text: "slowly back away",
        nextScene: "wolfeat",
      },
      {
        text: "look for a weapon",
        nextScene: "terminate",
      },
    ],
  },
  cabin: {
    title: "The Cabin",
    text: `You see a cabin in the distance, you're not sure if the wolf is behind you or not. What do you do?`,
    image: "./images/cabin.jpg",
    options: [
      {
        text: "scream for help",
        nextScene: "game",
      },
      {
        text: "keep running",
        nextScene: "tent",
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
    title: "game terminated",
    text: `Better luck next time!`,
    image: "./images/bye.jpg",
    options: [
      {
        text: "play again",
        nextScene: "start",
      },
    ],
  },
};

window.addEventListener("DOMContentLoaded", main);

// variabel för att lagra var spelare befinner sig i spelet
let scene = null;

function main() {
  scene = content.start;
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

  if (scene === content.wolfeat) {
    newImage.src = "./images/wolf2.jpg";
  } else {
    newImage.src = scene.image;
  }
  newContainer.append(newImage);

  if (
    scene !== content.start &&
    scene !== content.terminate &&
    scene !== content.help &&
    scene !== content.wolfeat
  ) {
    const exitBtnContainer = document.createElement("div");
    exitBtnContainer.className = "exitBtnContainer";
    const exitBtn = document.createElement("button");
    exitBtn.id = "exitBtn";
    exitBtn.innerText = "exit game";
    exitBtnContainer.append(exitBtn);
    newContainer.append(exitBtnContainer);
    exitBtn.onclick = () => gameOver();
  }

  const mainContent = document.createElement("div");
  mainContent.classList = "content";
  newContainer.append(mainContent);

  const title = document.createElement("h2");
  title.className = "page-title";
  if (scene === content.wolfeat) {
    title.innerHTML = "You've been eaten";
  } else {
    title.innerHTML = scene.title;
  }

  const paragraph = document.createElement("p");
  paragraph.className = "page-text";

  if (scene === content.wolfeat) {
    paragraph.innerHTML = "You didn't stand a chance against the hungry wolf..";
  } else {
    paragraph.innerHTML = scene.text;
  }

  const btnGrid = document.createElement("div");
  btnGrid.className = "btn-grid";

  if (scene === content.wolfeat) {
    wolfButtons = ["Try again?", "No, I'm good"];
    wolfScenes = ["wolf", "start"];

    for (let i = 0; i < wolfButtons.length; i++) {
      btn = document.createElement("button");
      btn.className = "btn" + i;
      btn.innerHTML = wolfButtons[i];
      btnGrid.append(btn);
      btn.onclick = () => loadNextScene(wolfScenes[i]);
    }
  } else {
    //skapa knappar med info från objektet {content}
    for (let i = 0; i < scene.options.length; i++) {
      btn = document.createElement("button");
      btn.className = "btn" + i;
      btn.innerHTML = scene.options[i].text;
      btnGrid.append(btn);
      btn.onclick = () => loadNextScene(scene.options[i].nextScene);
      {
        if (scene.options[i].nextScene === "rpg") {
          console.log("hello");
          btn.onclick = () => loadRpgScene();
        }
      }
    }
  }
  mainContent.append(title, paragraph, btnGrid);
}

function loadNextScene(nextScene) {
  scene = content[nextScene];
  clearContent();
  renderNewContent();
}

function loadRpgScene() {
  window.open("https://en.wikipedia.org/wiki/Role-playing_game", "_blank");
}

function gameOver() {
  scene = content.terminate;
  clearContent();
  renderNewContent(scene);
}

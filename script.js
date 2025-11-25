//anropar en callback till main
window.addEventListener("DOMContentLoaded", main);

let rooms = ["", "The Mountain", "The Creek", "Hillside", ""];
const backpack = [];

const ruleBtnHtml = document.getElementById("rulesBtn");
const startBtnHtml = document.getElementById("startBtn");

function main() {
  rulesBtn.addEventListener("click", showRules); //call function to see instructions how to play
  startBtn.addEventListener("click", startGame); //call function to startGame
}

function showRules() {}
function startGame() {
  clearContent();
}

function clearContent() {
  const titleHtml = document.querySelector("h2");
  titleHtml.remove();
  changeImage();
}

function changeImage() {
  const containerHtml = document.querySelector(".container");

  let imageCount = 0;
  const images = ["./images/wolf.jpg", "./images/svamp2.jpg"];
  const imageHtml = document.querySelector("img");

  imageHtml.src = images[imageCount];
  containerHtml.innerHTML = " ";
  containerHtml.append(imageHtml);

  imageCount++;
  if (imageCount >= images.length) {
    imageCount = 0;
  }
  updatePage();
}

function updatePage() {
  const containerHtml = document.querySelector(".container");
  const headerHtml = document.querySelector("header");
  const newTitleHtml = document.createElement("h2");
  const newParagraphHtml = document.createElement("p");
  newParagraphHtml.className = "page-text";

  newTitleHtml.innerHTML = "The Wolf mother";
  headerHtml.append(newTitleHtml);

  newParagraphHtml.innerHTML = `You've stepped into the forrest and just like that you meet a giant wolf. <br /> 
      For some reason you get the feeling the wolf wants to tell you something.`;

  containerHtml.append(newParagraphHtml);
}

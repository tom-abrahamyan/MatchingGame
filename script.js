let game = {
  width: 4,
  height: 2,
  size: 80,
  dictionary: "abcdefghijklmnopqrstuvwxyz",
  waitingBox: undefined,
  animating: false,
  foundCount: 0
};

const container = document.querySelector("#container");
container.style.width = game.width * game.size + "px";
container.style.height = game.height * game.size + "px";

const boxCount = game.width * game.height;
for (let i = 0; i < boxCount; i++) {
  container.innerHTML += `<div class='box' style='width:${game.size}px; height:${game.size}px'></div>`;
}

if (boxCount % 2 == 0) {
  start();
} else {
  alert("Wrong Game Configuration");
}

function start() {
  prepare();
  bindEvents();
}

function prepare() {
  let numberArray = [];
  for (let i = 0; i < boxCount; i++) {
    numberArray.push(i);
  }

  for (let j = 0; j < boxCount / 2; j++) {
    let letter = game.dictionary[j];
    let index, boxIndex;

    index = getRandomInt(numberArray.length);
    boxIndex = numberArray[index];
    container.children[boxIndex].innerText = letter;
    numberArray.splice(index, 1);

    index = getRandomInt(numberArray.length);
    boxIndex = numberArray[index];
    container.children[boxIndex].innerText = letter;
    numberArray.splice(index, 1);
  }
}

function bindEvents() {
  for (const box of container.children) {
    box.addEventListener("click", () => {
      if (box.classList.contains("open") || game.animating) {
        return;
      }

      if (game.waitingBox) {
        box.classList.add("open")

        if (game.waitingBox.innerText === box.innerText) {
          game.waitingBox = undefined;
          game.foundCount++;
          if(game.foundCount === boxCount / 2){
            container.innerHTML = "<h2>Congratulations, you won!</h2>";

            setTimeout(() => {
              location.reload();
            },3000)
          }
        }
        else{
          game.animating = true;
          setTimeout(() => {
            box.classList.remove("open");
            game.waitingBox.classList.remove("open");
            game.waitingBox = undefined;

            game.animating = false;
          }, 1000);
        }
      } else {
        box.classList.add("open");
        game.waitingBox = box;
      }
    });
  }
}

function getRandomInt(max) {
  return Math.floor(Math.random() * max);
}

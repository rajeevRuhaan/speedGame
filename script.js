let username = prompt("Before start game, please enter your name:");
let dot = document.querySelectorAll(".dot");
let scoredisplay = document.querySelector("#score");
let overlay = document.getElementById("result");
let gameover = document.getElementById("gameover");
let start = document.getElementById("start");
let stop = document.getElementById("stop");
let close = document.getElementById("close");
let name = document.getElementById("Name");

let count = 0;
let active = 0;
let missed = 0;
var mySound;

/* dot.forEach(function (event) {
  dot.addEventListener("click", function () {
    count.push(event.innerHTML);
  });
}); */

/** finding dot position */
dot[0].onclick = function () {
  clicked(0);
};
dot[1].onclick = function () {
  clicked(1);
};
dot[2].onclick = function () {
  clicked(2);
};
dot[3].onclick = function () {
  clicked(3);
};

/** Count the click */
const clicked = (i) => {
  console.log("clicked:", i);
  count++;
  missed = 0;
  scoredisplay.textContent = `Your score is ${count}`;
  if (i != active) {
    return endgame();
  }
};

/** random no generator */
const getRandonInt = (min, max) => {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

/**** Sound constructor */
function sound(src) {
  this.sound = document.createElement("audio");
  this.sound.src = src;
  this.sound.setAttribute("preload", "auto");
  this.sound.setAttribute("controls", "none");
  this.sound.style.display = "none";
  document.body.appendChild(this.sound);
  this.play = function () {
    this.sound.play();
  };
  this.stop = function () {
    this.sound.pause();
  };
}
mySound = new sound("rockman9.mp3");
myStop = new sound("endGame.mp3");

/**Start game */
const startGame = () => {
  console.log("Game Started");
  console.log("missed:", missed);
  mySound.play();
  /***   pointer auto */
  for (let i = 0; i < dot.length; i++) {
    dot[i].style.pointerEvents = "auto";
  }

  let nextActive = pickNext(active);
  console.log(nextActive);

  //pointer event changes from none to auto.

  dot[nextActive].classList.add("active");
  dot[active].classList.remove("active");

  active = nextActive;
  console.log(active);

  if (count < 5) {
    timer = setTimeout(startGame, 1500);
  } else if (count < 10) {
    timer = setTimeout(startGame, 1300);
  } else if (count < 15) {
    timer = setTimeout(startGame, 1100);
  } else if (count < 20) {
    timer = setTimeout(startGame, 900);
  } else {
    timer = setTimeout(startGame, 800);
  }

  function pickNext(active) {
    let nextActive = getRandonInt(0, 3);
    if (nextActive != active) {
      return nextActive;
    } else {
      return pickNext(active);
    }
  }

  if (missed === 3) {
    return endgame();
  }
  missed++;
};
const endgame = () => {
  clearTimeout(timer);
  mySound.stop();
  myStop.play();
  console.log("game over");
  overlay.style.visibility = "visible";

  if (count < 5) {
    name.textContent = `${username}`;
    gameover.textContent = `Your score is ${count}. Practice more!!!`;
  } else if (count < 10) {
    gameover.textContent = `Your score is ${count}. You can do better`;
  } else if (count < 15) {
    gameover.textContent = `Well Played! Your score is ${count}. You can do better`;
  } else if (count < 15) {
    gameover.textContent = `Awesome! Your score is ${count}.`;
  } else {
    gameover.textContent = `You are Master! Your score is ${count}.`;
  }
};
const reloadGame = () => {
  console.log("close");
  window.location.reload();
};

const stopGame = () => {
  console.log("close");
  window.location.reload();
};

stop.addEventListener("click", reloadGame);
close.addEventListener("click", reloadGame);
start.addEventListener("click", startGame);

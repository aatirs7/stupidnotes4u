const startButton = document.getElementById("start");
const intro = document.getElementById("intro");
const poem = document.getElementById("poem");


const lockScreen = document.getElementById("lock-screen");
const content = document.getElementById("content");
const passwordInput = document.getElementById("password");
const lockText = document.getElementById("lock-text");
const feedback = document.getElementById("feedback");

const message = "for Payal’s eyes only…";
let index = 0;
function type() {
  if (index <= message.length) {
    lockText.textContent = message.slice(0, index);
    index++;
    setTimeout(type, 80);
  }
}

type();

function unlock() {
  if (passwordInput.value === "blue") {
    feedback.classList.add("hidden");
    lockScreen.classList.add("fade-out");

    content.classList.remove("hidden");
    content.classList.add("fade-in");
    document.body.classList.remove("locked");

    setTimeout(() => {
      lockScreen.classList.add("hidden");
    }, 500);
  } else {
    feedback.textContent = "not quite \ud83d\udcad";
    feedback.classList.remove("hidden");
    passwordInput.classList.add("shake");
    setTimeout(() => passwordInput.classList.remove("shake"), 300);
  }
}

passwordInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    unlock();
  }
});


startButton.addEventListener("click", () => {
  intro.classList.add("hidden");
  poem.classList.remove("hidden");
});

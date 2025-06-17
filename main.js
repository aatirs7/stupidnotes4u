const startButton = document.getElementById("start");
const intro = document.getElementById("intro");
const poem = document.getElementById("poem");

const lockScreen = document.getElementById("lock-screen");
const content = document.getElementById("content");
const passwordInput = document.getElementById("password");
const lockText = document.getElementById("lock-text");
const feedback = document.getElementById("feedback");
const hintElement = document.getElementById("hint");

const combos = [
  {
    passwords: [
      "itswhatsinside",
      "it’swhatsinside",
      "It’s Whats Inside",
      "Its Whats Inside",
      "ITSWHATSINSIDE",
    ],
    hint: "The creepy dinner party we tried solving.",
  },
  {
    passwords: ["waves", "Waves"],
    hint: "Your favorite — and it’s the name of a Kanye song.",
  },
  {
    passwords: ["zola", "Zola"],
    hint: "The Twitter stripper road trip.",
  },
  {
    passwords: [
      "thesubstance",
      "TheSubstance",
      "The Substance",
      "THE SUBSTANCE",
    ],
    hint: "That gross movie where a pill changed everything.",
  },
  {
    passwords: ["nosferatu", "Nosferatu"],
    hint: "What we watched together in the city that never sleeps.",
  },
  {
    passwords: ["carrie", "Carrie"],
    hint: "The horror movie with prom and blood.",
  },
  {
    passwords: ["deepwater", "DeepWater", "Deep Water"],
    hint: "The one where Ben killed her lovers.",
  },
  {
    passwords: ["anora", "Anora"],
    hint: "The stripper, the Russians, and the ring that didn’t fit.",
  },
  {
    passwords: ["themenu", "TheMenu", "The Menu", "THE MENU"],
    hint: "The dinner that turned into a deadly tasting menu.",
  },
];

const currentCombo = combos[Math.floor(Math.random() * combos.length)];
if (hintElement) {
  hintElement.textContent = `hint: ${currentCombo.hint}`;
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

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
  const entered = normalize(passwordInput.value);
  const isValid = currentCombo.passwords.some((p) => normalize(p) === entered);
  if (isValid) {
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

const startButton = document.getElementById("start");
const intro = document.getElementById("intro");
const poem = document.getElementById("poem");
const content = document.getElementById("content");
const lockScreen = document.getElementById("lock-screen");
const passwordInput = document.getElementById("password");
const lockText = document.getElementById("lock-text");
const feedback = document.getElementById("feedback");
const hintElement = document.getElementById("hint");
const butterflies = document.querySelectorAll(".butterfly");

const homeHeading = document.getElementById("home-heading"); // home page heading

butterflies.forEach((el, index) => {
  const delay = index * 500; // stagger by 500ms per butterfly

  setTimeout(() => {
    lottie.loadAnimation({
      container: el,
      renderer: "svg",
      loop: true,
      autoplay: true,
      path: "new butterfly animation.json",
    });
  }, delay);
});

const newButterflyContainer = document.getElementById("butterfly-new");
if (newButterflyContainer) {
  lottie.loadAnimation({
    container: newButterflyContainer,
    renderer: "svg",
    loop: true,
    autoplay: true,
    path: "1750191850501.json",
  });
}

const combos = [
  {
    passwords: [
      "itswhatsinside",
      "it’swhatsinside",
      "It’s Whats Inside",
      "Its Whats Inside",
      "ITSWHATSINSIDE",
    ],
    hint: "(Movie) The creepy dinner party we tried solving.",
  },
  {
    passwords: ["waves", "Waves"],
    hint: "(Movie) Your favorite — and it’s the name of a Kanye song.",
  },
  {
    passwords: ["zola", "Zola"],
    hint: "(Movie) The Twitter stripper road trip.",
  },
  {
    passwords: [
      "thesubstance",
      "TheSubstance",
      "The Substance",
      "THE SUBSTANCE",
      "substance",
      "Substance",
      "SUBSTANCE",
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
    passwords: ["themenu", "TheMenu", "The Menu", "THE MENU", "menu", "MENU"],
    hint: "(Movie) The dinner that turned into a deadly tasting menu.",
  },
  {
    passwords: ["anora", "Anora"],
    hint: "(Movie) The stripper, the Russians, and the ring that didn’t fit.",
  },
  {
    passwords: ["moxy", "moxy nyc", "the moxy", "MOXY NYC", "Moxy NYC"],
    hint: "The name of the hotel we stayed at in NYC.",
  },
  {
    passwords: ["october31", "October 31", "10/31", "halloween", "Halloween"],
    hint: 'The date of your "birthday" in Atlanta.',
  },
  {
    passwords: [
      "prometheus",
      "prometheous",
      "prometheos",
      "prometheus tomato",
      "heirloom",
      "heirloom tomato",
    ],
    hint: "The type of tomato I could never get right.",
  },
  {
    passwords: ["sharkattacktv", "shark attack tv", "sharkattack tv"],
    hint: "The name of your janky streaming site (what I called it).",
  },
];

const currentCombo = combos[Math.floor(Math.random() * combos.length)];
if (hintElement) {
  hintElement.textContent = `hint: ${currentCombo.hint}`;
}

function normalize(str) {
  return str.toLowerCase().replace(/[^a-z0-9]/gi, "");
}

const lockMessage = "for Payal’s eyes only…";
let lockIndex = 0;
function typeLock() {
  if (lockIndex <= lockMessage.length) {
    lockText.textContent = lockMessage.slice(0, lockIndex);
    lockIndex++;
    setTimeout(typeLock, 80);
  }
}
typeLock();

const homeMessage = "some stupid notes 4 u";
let homeIndex = 0;
function typeHome() {
  if (homeIndex <= homeMessage.length) {
    homeHeading.textContent = homeMessage.slice(0, homeIndex);
    homeIndex++;
    setTimeout(typeHome, 80);
  }
}

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
      typeHome();
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

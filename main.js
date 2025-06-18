const intro = document.getElementById("intro");
const poem = document.getElementById("poem");
const content = document.getElementById("content");
const lockScreen = document.getElementById("lock-screen");
const passwordInput = document.getElementById("password");
const lockText = document.getElementById("lock-text");
const feedback = document.getElementById("feedback");
const hintElement = document.getElementById("hint");
const butterflies = document.querySelectorAll(".butterfly");
const skipButton = document.getElementById("skip");

const homeHeading = document.getElementById("home-heading"); // home page heading
const poemTextEl = document.getElementById("poem-text");

let typingInterval;
let countdownInterval;
let nextCallback = null;
let currentPoemIndex = -1;

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

const homeMessage = "$ome $tupid Note$ 4u...";
let homeIndex = 0;
function typeHome() {
  if (homeIndex <= homeMessage.length) {
    homeHeading.textContent = homeMessage.slice(0, homeIndex);
    homeIndex++;
    setTimeout(typeHome, 80);
  }
}

const poemList = `An Anklet’s Chime

Field of Serenity

Lost in Atlanta

Act IV

Act V: Moxy NYC

In Fair Verona

Gentle Goodbye






these aren’t perfect...
 just quiet things
 I didn’t know how to say
 while you were still listening.
 so I wrote them down
 instead.

- Aatir`;

const poems = [
  `An Anklet’s Chime\n\nThe city keeps moving, the stars don’t mind,\nwe were for a moment, now left behind.\nWe met too soon or else too late,\na fleeting step, a twist of fate.\nPayal—just like an anklet’s chime,\nso soft, so ethereal, now lost with time.`,
  `Field of Serenity\n\nTo be seen is to be loved.\nYou float through noise with quiet grace,\nunshaken by the hurried pace.\n\nTo be loved is to be seen.\nNo need to ask, no need to sway—\nyou choose your heart and walk your way.\n\nTo be seen is to be loved.\nThe world may chase, but you just be,\na light the world can’t help but see.\n\nTo be loved is to be seen.\nAnd I see you — serene and kind,\nwith a heart that grew what few could find,\na rare flower I still carry within mine.`,
  `Lost in Atlanta\n\nAtlanta slowed down that night,\nthe lights felt soft, the air moved slow—\nlike the city sensed our shyness\nand held its breath.\nWe belonged anyway.\n\nThe night made space for us,\nroses in your lap,\na tiara catching light in soft display.\nThere was presence in your silence—\nnot needing to be seen, but to be felt.\nWe belonged anyway.\n\nIt was the kind of room,\nshimmering with elegance,\nwhere people walked with practiced ease,\nas if the world had always made room for them.\nWe hadn’t earned the room,\nyet we carried ourselves like we had.\nWe belonged anyway.\n\nWe smiled at things\nwe didn’t fully understand—\nquiet rituals, unspoken rules,\nthe choreography of a world not ours.\nWe shared glances when the world around us\nfelt a little too polished.\nBut nothing about us felt out of place.\nWe belonged anyway.\n\nWe didn’t blend in.\nWe didn’t need to.\nAnd somehow—\njust us,\njust then,\nwe belonged anyway.`,
  `Act IV\n\nWe stopped counting after a while—\nnot the hours,\nnot the movies,\njust let the nights blur into dialogue and light.\n\nWe’d cue the movie at the same time—\nnever perfectly,\nbut close enough for the story to hold us.\nThe streams were borrowed,\nthe method a little off,\nbut nothing about our connection ever felt that way.\n\nWe kept our faces hidden,\nand somehow, that made it softer.\nOnly the sound of your voice\nthreading through mine like it belonged there.\nYou stayed with me\nwithout having to appear.\n\nNot seeing you made it easier to fall into everything else—\nthe story,\nthe space between us,\nthe mystery we always tried to solve.\n\nThe movie faded to black.\nThe call stayed.\nAnd for a while,\nso did we.`,
  `Act V: Moxy NYC\n\nIt should’ve felt like more.\nThe city shimmered beneath us,\nManhattan stretched wide through the glass,\nlike we’d stepped into a scene—\nwhere even the quiet felt rehearsed.\n\nBut I kept checking the edges—\nstraightening the frame, measuring the moment\ninstead of living in it.\n\nWhile I adjusted every angle,\nafraid to let the moment breathe,\nyou just lived— the way you always do—\ngently, freely,\nuntouched by the weight I put on everything.\n\nAnd although we filled\nthe space with all the right things—\nglowing streets,\nrooms full of people I thought too much about,\nart that hung between us like silence.\n\nWe never truly found\nwhat came so easy\nin silence,\nin glowing screens,\nin the space between our voices.\n\nThe view faded,\nthe silence filled in,\nand on our way home,\nwe carried the same quiet question.`,
  `In Fair Verona\n\nIn Fair Verona,\n I wrote myself into a role\n Romeo himself would envy.\nI didn’t see you as a lesson,\n or a muse,\n or some beautiful, flawed heroine\n in a story that was always about me.\nI saw you more like a wildflower—\n just out of reach,\n soft in your silence,\n never asking to be held.\nWhatever this was,\n whatever it still is—\n you went from a stranger\n to something like home,\n to someone I once crossed paths with,\n in Fair Verona,\n and never quite forgot.\nI’ll leave it the way Romeo and Juliet once did:\n“Parting is such sweet sorrow, that I shall say good night till it be morrow.”`,
  `Gentle Goodbye\n\nYou said it gently,\nlike someone reaching the end\nof a story they loved but couldn’t finish.\n\nThat love, no matter how warm,\ncan’t live on distance alone.\n\nYou were tired,\nof holding hope like a secret\nof waiting for a closeness\nto arrive through a screen.\n\nI didn’t blame you.\nI heard it in your voice—\nthe weight of emotion stretched too thin\nacross a distance we couldn’t soften.\n\nMaybe you let go before I was ready to,\nbecause you knew what it would cost\nto keep holding on across a distance\nthat wouldn’t close.\n\nI just wish\nmy hand had been there\nwhen your heart let go.\nnot a voice,\nbut something you could hold.`,
];

function typeText(text, callback) {

  clearInterval(typingInterval);
  let i = 0;
  typingInterval = setInterval(() => {
    poemTextEl.textContent = text.slice(0, i);
    i++;
    if (i > text.length) {
      clearInterval(typingInterval);
      if (callback) callback();
    }
  }, 80);

}

function startCountdown(seconds, callback) {
  const timerEl = document.getElementById("timer");

  clearInterval(countdownInterval);
  timerEl.classList.remove("hidden");
  timerEl.textContent = seconds;
  let remaining = seconds;
  nextCallback = callback;
  countdownInterval = setInterval(() => {
    remaining--;
    timerEl.textContent = remaining;
    if (remaining <= 0) {
      clearInterval(countdownInterval);

      timerEl.classList.add("hidden");
      if (callback) callback();
    }
  }, 1000);
}

function showPoemList() {
  poem.classList.remove("hidden");
  typeText(poemList, () => startCountdown(8, () => startPoems(0)));
}

function startPoems(index) {

  currentPoemIndex = index;
  if (index >= poems.length) return;
  poemTextEl.textContent = "";
  typeText(poems[index], () => {
    startCountdown(8, () => startPoems(index + 1));
  });
}

function skipPoem() {
  clearInterval(typingInterval);
  clearInterval(countdownInterval);
  document.getElementById("timer").classList.add("hidden");
  if (nextCallback) {
    const cb = nextCallback;
    nextCallback = null;
    cb();
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
      setTimeout(showPoemList, 3000);
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

if (skipButton) {
  skipButton.addEventListener("click", skipPoem);
}

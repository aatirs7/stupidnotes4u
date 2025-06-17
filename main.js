const startButton = document.getElementById("start");
const intro = document.getElementById("intro");
const poem = document.getElementById("poem");

startButton.addEventListener("click", () => {
  intro.classList.add("hidden");
  poem.classList.remove("hidden");
});

const soundFiles = {
  rain: "rain.mp3",
  fire: "fire.mp3",
  wave: "wave.mp3",
  wind: "wind.mp3"
};

const players = {};
let hasStarted = false;

document.querySelectorAll(".sound-box").forEach(box => {
  const type = box.dataset.sound;
  const btn = box.querySelector(".sound-button");
  const slider = box.querySelector(".volume-slider");

  players[type] = new Tone.Player(soundFiles[type]).toDestination();
  players[type].volume.value = parseInt(slider.value);

  btn.addEventListener("click", async () => {
    if (!hasStarted) {
      await Tone.start();
      hasStarted = true;
    }
    const player = players[type];
    if (player.state !== "started") {
      player.loop = true;
      player.start();
    }
  });

  slider.addEventListener("input", () => {
    players[type].volume.value = parseInt(slider.value);
  });
});

document.getElementById("reset").addEventListener("click", () => {
  Object.values(players).forEach(player => player.stop());
  document.querySelectorAll(".volume-slider").forEach(slider => {
    slider.value = -24;
    const type = slider.closest(".sound-box").dataset.sound;
    players[type].volume.value = -24;
  });
});

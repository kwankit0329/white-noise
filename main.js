const sounds = {
  rain: new Tone.Player("sounds/rain.mp3").toDestination(),
  fire: new Tone.Player("sounds/fire.mp3").toDestination(),
  wave: new Tone.Player("sounds/wave.mp3").toDestination(),
  wind: new Tone.Player("sounds/wind.mp3").toDestination()
};

document.querySelectorAll(".bottle").forEach(btn => {
  btn.addEventListener("click", async () => {
    await Tone.start();
    const type = btn.dataset.sound;
    const player = sounds[type];
    if (player.state !== "started") {
      player.loop = true;
      player.start();
    }
  });
});

document.querySelectorAll(".volume-slider").forEach(slider => {
  slider.addEventListener("input", () => {
    const type = slider.dataset.sound;
    const value = parseInt(slider.value);
    sounds[type].volume.value = value;
    updateLiquid();
  });
});

function updateLiquid() {
  const sliders = document.querySelectorAll(".volume-slider");
  let total = 0;
  sliders.forEach(slider => {
    const val = parseInt(slider.value);
    if (val > -60) {
      total += 60 + val;
    }
  });
  const height = Math.min((total / 4), 100);
  document.getElementById("liquid-layer").style.height = `${height}%`;
}

document.getElementById("reset").addEventListener("click", () => {
  Object.keys(sounds).forEach(key => {
    sounds[key].stop();
  });
  document.querySelectorAll(".volume-slider").forEach(slider => {
    slider.value = -24;
  });
  updateLiquid();
});

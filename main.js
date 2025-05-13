const sounds = {
  rain: new Tone.Player("sounds/rain.mp3").toDestination(),
  fire: new Tone.Player("sounds/fire.mp3").toDestination(),
  frogs: new Tone.Player("sounds/frogs.mp3").toDestination(),
  wind: new Tone.Player("sounds/wind.mp3").toDestination()
};

const volumes = {
  rain: -Infinity,
  fire: -Infinity,
  frogs: -Infinity,
  wind: -Infinity
};

document.querySelectorAll(".bottle").forEach(btn => {
  btn.addEventListener("click", async () => {
    await Tone.start(); // required for user interaction

    const type = btn.dataset.sound;
    if (volumes[type] === -Infinity) {
      sounds[type].loop = true;
      sounds[type].start();
      volumes[type] = -24;
    } else {
      volumes[type] += 4;
      if (volumes[type] > 0) volumes[type] = 0;
    }
    sounds[type].volume.value = volumes[type];
    updateLiquid();
  });
});

document.getElementById("reset").addEventListener("click", () => {
  Object.keys(sounds).forEach(key => {
    sounds[key].stop();
    volumes[key] = -Infinity;
  });
  updateLiquid();
});

function updateLiquid() {
  let active = Object.values(volumes).filter(v => v > -Infinity).length;
  const height = Math.min(active * 20 + 10, 100);
  document.getElementById("liquid-layer").style.height = `${height}%`;
}

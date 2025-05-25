function togglePlay(id) {
  const audio = document.getElementById(id);
  if (audio.paused) {
    audio.play();
  } else {
    audio.pause();
  }
}

function setVolume(id, value) {
  const audio = document.getElementById(id);
  audio.volume = value;
}

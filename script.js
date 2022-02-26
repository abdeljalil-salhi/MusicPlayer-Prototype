let title = document.querySelector(".title");
let artist = document.querySelector(".artist");

let play_button = document.querySelector(".play");
let prev_button = document.querySelector(".previous");
let next_button = document.querySelector(".next");

let range = document.querySelector(".range");
let volume = document.querySelector("._volume");
let volume_icon = document.getElementById("volume");

let current_time = document.querySelector(".current_time");
let total_time = document.querySelector(".total_time");

let index = 0; // at3erfi après why we use this
let playing = false;
let updateTimer;
let volumeLevel = 100;

// boutone hhhhhhhhhhhhhhhhhhhhh ah ah
let audio = document.createElement("audio");
// here i created my audio html element here f javascript
// instead of including it each time f html
// thats a modern way iwi

// bon now this is kinda advanced but imma explain it to u
let audio_list = [
  {
    title: "Fugue No.8 in E Major",
    artist: "Johann Sebastian Bach",
    src: "https://sounds.pond5.com/solfeggietto-c-p-e-bach-music-165421467_nw_prev.m4a",
  },
  {
    title: "charmola",
    artist: "parizien", // ah hhhh
    src: "media/parizien.m4a",
  },
  {
    title: "Fugue No.2 In C Minor",
    artist: "Johann Sebastian Bach",
    src: "https://sounds.pond5.com/johann-sebastian-bach-fugue-no2-music-133074087_nw_prev.m4a",
  },
];

function loadSong(index) {
  clearInterval(updateTimer);
  resetTimers();

  // change the src of the audio
  audio.src = audio_list[index].src;
  audio.load();

  // change the details w dakchi
  document.title = `Now playing ${audio_list[index].title}...`;
  title.textContent = audio_list[index].title;
  artist.textContent = `by ${audio_list[index].artist}`;

  // call the rangeUpdate function each 1000ms
  updateTimer = setInterval(rangeUpdate, 1000);

  // go to next song if current one is 'ended'
  audio.addEventListener("ended", nextSong);
}

function resetTimers() {
  current_time.textContent = "00:00";
  total_time.textContent = "00:00";
  range.value = 0;
}

function playOrPauseSong() {
  if (!playing) playSong();
  else pauseSong();
}

function playSong() {
  audio.play();
  playing = true;

  // replace the icon with the "pause" one
  play_button.innerHTML = "<i class='uil uil-pause-circle'></i>";
}

function pauseSong() {
  audio.pause();
  playing = false;

  play_button.innerHTML = "<i class='uil uil-play-circle'></i>";
}

function nextSong() {
  // go to first song if the current one is the last in the list
  if (index < audio_list.length - 1) index += 1;
  else index = 0;

  loadSong(index);
  playSong();
}

function prevSong() {
  if (index > 0) index -= 1;
  else index = audio_list.length - 1;

  loadSong(index);
  playSong();
}

function forwardSong() {
  audio.currentTime += 10;
}

function backwardSong() {
  audio.currentTime -= 10;
}

function changeTimer() {
  audio.currentTime = audio.duration * (range.value / 100);
}

function changeVolume() {
  audio.volume = volume.value / 100;
  volumeLevel = volume.value;
  if (audio.muted) {
    volume_icon.classList.remove("uil-volume-mute");
    volume_icon.classList.add("uil-volume");
    volume.classList.remove("muted");
    audio.muted = false;
  }
}

function muteOrUnmute() {
  if (!audio.muted) {
    volume_icon.classList.remove("uil-volume");
    volume_icon.classList.add("uil-volume-mute");
    volume.classList.add("muted");
    volume.value = 0;
    audio.muted = true;
  } else {
    volume_icon.classList.remove("uil-volume-mute");
    volume_icon.classList.add("uil-volume");
    volume.classList.remove("muted");
    volume.value = volumeLevel;
    audio.muted = false;
  }
}

function rangeUpdate() {
  if (!isNaN(audio.duration)) {
    // change range input value to current duration
    range.value = audio.currentTime * (100 / audio.duration);

    // time left
    let current_time_M = Math.floor(audio.currentTime / 60);
    if (current_time_M < 10) current_time_M = `0${current_time_M}`;
    let current_time_S = Math.floor(audio.currentTime - current_time_M * 60);
    if (current_time_S < 10) current_time_S = `0${current_time_S}`;

    // total time
    let total_time_M = Math.floor(audio.duration / 60);
    if (total_time_M < 10) total_time_M = `0${total_time_M}`;
    let total_time_S = Math.floor(audio.duration - total_time_M * 60);
    if (total_time_S < 10) total_time_S = `0${total_time_S}`;

    // show time
    current_time.textContent = `${current_time_M}:${current_time_S}`;
    total_time.textContent = `${total_time_M}:${total_time_S}`;
  }
}

loadSong(index);

console.log("Welcome to Resso");

let songIndex = 0;
let audioElement = new Audio("1.mp3");
let masterPlay = document.getElementById("masterPlay");
let myProgressBar = document.getElementById("myProgressBar");
let gif = document.getElementById("gif");
let masterSongName = document.getElementById("masterSongName");
let songItems = Array.from(document.getElementsByClassName("songItem"));

let songs = [
  {
    songName: "Careless Whisper",
    filePath: "1.mp3",
    coverPath: "carelesswhisp.jpg",
  },
  {
    songName: "Stereo Love",
    filePath: "2.mp3",
    coverPath: "stlove.jpg",
  },
  {
    songName: "Infinity",
    filePath: "3.mp3",
    coverPath: "inf.jpg",
  },
  {
    songName: "Aladdin",
    filePath: "4.mp3",
    coverPath: "aldin.jpg",
  },
  {
    songName: "Faded",
    filePath: "5.mp3",
    coverPath: "fad.jpg",
  },
  {
    songName: "Whoopty",
    filePath: "6.mp3",
    coverPath: "whupty.jpg",
  },
  {
    songName: "Into your ams",
    filePath: "7.mp3",
    coverPath: "arms.jpg",
  },
];

const makeAllPlays = () => {
  Array.from(document.getElementsByClassName("songItemPlay")).forEach(
    (element) => {
      element.classList.add("fa-play-circle");
      element.classList.remove("fa-pause-circle");
    }
  );
};
// const makeAllPause = () => {
//   Array.from(document.getElementsByClassName("songItemPlay")).forEach(
//     (element) => {
//       element.classList.remove("fa-play-circle");
//       element.classList.add("fa-pause-circle");
//     }
//   );
// };

songItems.forEach((element, i) => {
  //   console.log(element, i);
  element.getElementsByTagName("img")[0].src = songs[i].coverPath;
  element.getElementsByClassName("songName")[0].innerText = songs[i].songName;
});

masterPlay.addEventListener("click", () => {
  if (audioElement.paused || audioElement.currentTime <= 0) {
    audioElement.play();
    masterPlay.classList.remove("fa-play-circle");
    masterPlay.classList.add("fa-pause-circle");
    gif.style.opacity = 1;
  } else {
    audioElement.pause();
    masterPlay.classList.remove("fa-pause-circle");
    masterPlay.classList.add("fa-play-circle");
    gif.style.opacity = 0;
    makeAllPlays();
  }
});

audioElement.addEventListener("timeupdate", () => {
  //   console.log("timeupdate");
  progress = parseInt((audioElement.currentTime / audioElement.duration) * 100);
  //   console.log(progress);
  myProgressBar.value = progress;
});

myProgressBar.addEventListener("change", () => {
  audioElement.currentTime =
    (myProgressBar.value * audioElement.duration) / 100;
});

Array.from(document.getElementsByClassName("songItemPlay")).forEach(
  (element) => {
    element.addEventListener("click", (e) => {
      makeAllPlays();
      songIndex = parseInt(e.target.id);
      masterSongName.innerText = songs[songIndex].songName;
      // console.log(e.target);
      e.target.classList.remove("fa-play-circle");
      e.target.classList.add("fa-pause-circle");
      audioElement.src = `${songIndex + 1}.mp3`;
      audioElement.currentTime = 0;
      audioElement.play();
      gif.style.opacity = 1;
      masterPlay.classList.remove("fa-play-circle");
      masterPlay.classList.add("fa-pause-circle");
    });
  }
);

document.getElementById("next").addEventListener("click", () => {
  if (songIndex >= 6) {
    songIndex = 0;
  } else {
    songIndex += 1;
  }
  audioElement.src = `${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterSongName.innerText = songs[songIndex].songName;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

document.getElementById("previous").addEventListener("click", () => {
  if (songIndex <= 0) {
    songIndex = 6;
  } else {
    songIndex -= 1;
  }
  audioElement.src = `${songIndex + 1}.mp3`;
  audioElement.currentTime = 0;
  audioElement.play();
  gif.style.opacity = 1;
  masterSongName.innerText = songs[songIndex].songName;
  masterPlay.classList.remove("fa-play-circle");
  masterPlay.classList.add("fa-pause-circle");
});

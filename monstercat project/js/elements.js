const btn = document.querySelector(".btn1");
const player = document.querySelector(".preview-player");
const icon = document.querySelector(".btn1 i");

const search = document.querySelector(".search-page");
const searchbackground = document.querySelector(".search-background")
const volumeControlContainer = document.querySelectorAll(".volume-control");

const albumheader = document.querySelector(".album-cover");
const albumbackground = document.querySelector(".album-background")

const searchbox = document.querySelector(".search-box input");
const Controls = document.querySelectorAll(".pause-forward i.fa-play");

const currentDuration = document.querySelectorAll("#currenttime");
const endDuration = document.querySelectorAll("#endtime");

const songimg = document.querySelector(".song-img img");
const songtitle =  document.querySelector(".song-info h2");
const songsinger =  document.querySelector(".song-info h5");

const progressContainer = document.querySelectorAll("#progress-container");
const progressBar = document.querySelectorAll("#progress-bar");

const volumeContainer = document.querySelectorAll("#volume-container");
const volumeBar = document.querySelectorAll("#volume-bar");

const fullscreenBtns = document.querySelectorAll("#fullscreen-btn");
const fullscreenOverlay = document.querySelector(".fullscreen");

let themecolor ;

let currentAudio = null;
let currentTrack = null;
let currentPlayIcon = null;
let currentIndex = 0;
let currentvolume = 0.25;

let isShuffle = false;
let muted = false;
let isRepeat = false;

let trackList = [];
let tracklistentries = [];

let searchshowed = false;
let albumshowed = false;
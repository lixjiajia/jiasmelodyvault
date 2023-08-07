const image = document.getElementById('cover');
    title = document.getElementById('song-title');
    artist = document.getElementById('artist');
    currentTimeEl = document.getElementById('current-time');
    durationEl = document.getElementById('duration');
    progress = document.getElementById('progress');
    playerProgress = document.getElementById('player-progress');
    prevBtn = document.getElementById('prev');
    nextBtn = document.getElementById('next');
    playBtn = document.getElementById('play');
    background = document.getElementById('bg-img');


const music = new Audio();

const songs = [
     {
        path: 'media/Snow On The Beach.mp3',
        displayName: 'Snow On The Beach',
        cover: 'media/snow-on-the-beach.png',
        artist: 'Taylor Swift (Feat. Lana Del Rey)',

    },
    {
        path: 'media/golden thing.mp3',
        displayName: 'golden thing',
        cover: 'media/golden-thing.jpg',
        artist: 'Cody Simpson',

    },
    {
        path: 'media/Housewatching.mp3',
        displayName: 'Housewatching',
        cover: 'media/housewatching.jpeg',
        artist: 'Samuel Lim',

    },
    {
        path: 'media/Si Fueras Mia.mp3',
        displayName: 'Si Fueras Mía',
        cover: 'media/si-fueras-mia.jpg',
        artist: 'D.O.',

    },
   
    {
        path: 'media/Forever.mp3',
        displayName: 'Forever',
        cover: 'media/forever.jpeg',
        artist: 'rei brown',

    },
    {
        path: 'media/Feels Like.mp3',
        displayName: 'Feels Like',
        cover: 'media/feels-like.jpeg',
        artist: 'Gracie Abrams',

    },
    {
        path: 'media/Kollage.mp3',
        displayName: 'Kollage',
        cover: 'media/kollage.webp',
        artist: 'Carly Rae Jepsen',

    },
    {
        path: 'media/Blue.mp3',
        displayName: 'Blue',
        cover: 'media/blue.webp',
        artist: 'Taeyeon',

    },

];
let musicIndex = 0;
let isPlaying = false;

function togglePlay(){
    if (isPlaying){
        pauseMusic();
    }else{
        playMusic();
    }
}

function playMusic(){
    isPlaying = true;
    playBtn.classList.replace('fa-play','fa-pause');
    playBtn.setAttribute('title','Pause');
    music.play();
}

function pauseMusic(){
    isPlaying = false;
    playBtn.classList.replace('fa-pause','fa-play');
    playBtn.setAttribute('title','Play');
    music.pause();
}

function loadMusic(song){
    music.src = song.path;
    title.textContent = song.displayName;
    artist.textContent = song.artist;
    image.src = song.cover;
    background.src = song.cover;
}

function changeMusic(direction){
    musicIndex = (musicIndex + direction + songs.length) % songs.length;
    loadMusic(songs[musicIndex]);
    playMusic();
}

function updateProgressBar(){
    const { duration, currentTime } = music;
    const progressPercent = (currentTime / duration) * 100;
    progress.style.width = `${progressPercent}%`;

    const formatTime = (time) => String(Math.floor(time)).padStart(2,'0');
    durationEl.textContent = `${formatTime(duration / 60)}:${formatTime(duration % 60)}`;
    currentTimeEl.textContent = `${formatTime(currentTime / 60)}:${formatTime(currentTime % 60)}`;
}    

function setProgressBar(e){
    const width = playerProgress.clientWidth;
    const clickX = e.offsetX;
    music.currentTime = (clickX / width) * music.duration;
}


playBtn.addEventListener('click', togglePlay);
prevBtn.addEventListener('click', () => changeMusic(-1));
nextBtn.addEventListener('click', () => changeMusic(1));
music.addEventListener('ended', () => changeMusic(1));
music.addEventListener('timeupdate', updateProgressBar);
playerProgress.addEventListener('click', setProgressBar);


loadMusic(songs[musicIndex]);



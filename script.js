const songs = [
  {
    title: 'Neon Skyline',
    artist: 'Atlas Echo',
    duration: '3:24',
    bpm: '108 BPM',
    mood: 'Late-night synths',
    accent: 'from #79ffe1, #1e293b 65%, #0f172a',
    emoji: '✦',
  },
  {
    title: 'Soft Gravity',
    artist: 'Luna Frame',
    duration: '2:58',
    bpm: '92 BPM',
    mood: 'Warm lo-fi calm',
    accent: 'from #f59e0b, #7c3aed 65%, #111827',
    emoji: '◌',
  },
  {
    title: 'Solar Drift',
    artist: 'Noir Harbor',
    duration: '4:06',
    bpm: '120 BPM',
    mood: 'Bright driving beat',
    accent: 'from #22c55e, #0f766e 60%, #111827',
    emoji: '◆',
  },
  {
    title: 'Glass Horizon',
    artist: 'Mira Static',
    duration: '3:51',
    bpm: '101 BPM',
    mood: 'Airy, spacious pop',
    accent: 'from #60a5fa, #4338ca 65%, #111827',
    emoji: '◈',
  },
];

const songGrid = document.getElementById('songGrid');
const trackTitle = document.getElementById('trackTitle');
const trackArtist = document.getElementById('trackArtist');
const trackArt = document.getElementById('trackArt');
const currentTime = document.getElementById('currentTime');
const duration = document.getElementById('duration');
const progressFill = document.getElementById('progressFill');
const playBtn = document.getElementById('playBtn');
const nextBtn = document.getElementById('nextBtn');
const prevBtn = document.getElementById('prevBtn');

let activeIndex = 0;
let isPlaying = true;

function renderSongs() {
  songGrid.innerHTML = songs
    .map(
      (song, index) => `
        <article class="song-card ${index === activeIndex ? 'active' : ''}" data-index="${index}" style="--art-gradient: linear-gradient(145deg, ${song.accent});">
          <div class="art">${song.emoji}</div>
          <h4>${song.title}</h4>
          <p>${song.artist}</p>
          <div class="song-meta">
            <span>${song.mood}</span>
            <span>${song.bpm}</span>
          </div>
          <div class="song-meta">
            <span>${song.duration}</span>
            <span class="play-pill">▶</span>
          </div>
        </article>
      `,
    )
    .join('');

  document.querySelectorAll('.song-card').forEach((card) => {
    card.addEventListener('click', () => {
      activeIndex = Number(card.dataset.index);
      syncPlayer();
      renderSongs();
      isPlaying = true;
      syncPlayState();
    });
  });
}

function syncPlayer() {
  const song = songs[activeIndex];
  trackTitle.textContent = song.title;
  trackArtist.textContent = song.artist;
  trackArt.style.background = `linear-gradient(145deg, ${song.accent})`;
  trackArt.alt = `${song.title} album art`;
  trackArt.src = `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
    <svg xmlns="http://www.w3.org/2000/svg" width="256" height="256" viewBox="0 0 256 256">
      <defs>
        <linearGradient id="g" x1="0" y1="0" x2="1" y2="1">
          <stop offset="0%" stop-color="#1ed760"/>
          <stop offset="100%" stop-color="#0b0f14"/>
        </linearGradient>
      </defs>
      <rect width="256" height="256" rx="40" fill="url(#g)"/>
      <circle cx="86" cy="90" r="38" fill="rgba(255,255,255,0.18)"/>
      <path d="M128 50l25 56 61 6-46 40 14 60-54-30-54 30 14-60-46-40 61-6z" fill="rgba(255,255,255,0.18)"/>
    </svg>
  `)}`;
  duration.textContent = song.duration;
  currentTime.textContent = isPlaying ? '0:42' : '0:00';
  progressFill.style.width = isPlaying ? '38%' : '10%';
}

function syncPlayState() {
  playBtn.textContent = isPlaying ? '⏸' : '▶';
  playBtn.setAttribute('aria-label', isPlaying ? 'Pause track' : 'Play track');
  currentTime.textContent = isPlaying ? '0:42' : '0:00';
  progressFill.style.width = isPlaying ? '38%' : '10%';
}

function nextSong() {
  activeIndex = (activeIndex + 1) % songs.length;
  syncPlayer();
  renderSongs();
}

function previousSong() {
  activeIndex = (activeIndex - 1 + songs.length) % songs.length;
  syncPlayer();
  renderSongs();
}

playBtn.addEventListener('click', () => {
  isPlaying = !isPlaying;
  syncPlayState();
});

nextBtn.addEventListener('click', () => {
  nextSong();
  isPlaying = true;
  syncPlayState();
});

prevBtn.addEventListener('click', () => {
  previousSong();
  isPlaying = true;
  syncPlayState();
});

renderSongs();
syncPlayer();
syncPlayState();

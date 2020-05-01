fetch('https://api.themoviedb.org/3/trending/all/week?api_key=94a83d421d79431debf81630227da2ff')
  .then(res => res.json())
  .then(data => buildContent(data));

const BASE_URL = 'http://image.tmdb.org/t/p/w500';
const content = document.querySelector('.grid');
var movieSet = [];

function buildContent({ results }) {
  content.innerHTML = results
    .filter(item => item.media_type === 'movie')
    .map(movie => {
      movieSet[movie.id] = movie;
      return `
    <li class="card">
        <h3 class="title pin">${movie.title ? movie.title : movie.name}</h3>
        <img src="${BASE_URL}/${movie.backdrop_path}" data-id="${movie.id}" class="movie" />
    </li>`;
    })
    .join('');

  document.querySelectorAll('.movie').forEach(movie => movie.addEventListener('click', showDetails));
}

const details = document.querySelector('.details');

async function showDetails() {
  details.style.display = 'block';

  const movieID = event.target.dataset.id;

  // console.log(movieSet[movieID]);
  const { title, name, overview, media_type, vote_average, backdrop_path, poster_path } = movieSet[movieID];

  const videoInfo = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=94a83d421d79431debf81630227da2ff&language=en-US`).then(res => res.json());
  const video_id = videoInfo.results[0] ? videoInfo.results[0].key : null;
  console.log(videoInfo);

  const recos = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=94a83d421d79431debf81630227da2ff&language=en-US&page=1`).then(res => res.json());
  const recosList = recos.results
    .slice(0, 3)
    .map(x => {
      return ` 
      <div>
        <h4 class="rec-title">${x.title}</h4>
        <img src="http://image.tmdb.org/t/p/w500${x.poster_path}" />
      </div>
    `;
    })
    .join('');

  details.innerHTML = `
    <div id="detail-content">
        <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
        <div class="tags">
            <div class="tag">${media_type}</div>
            <div class="tag">${vote_average} ☆</div>
        </div>
        <h3 class="title">${title}</h3>
        <p>${overview}</p>
        <a class="trailer" href="https://www.youtube.com/watch?v=${video_id}" target="_blank">Watch Trailer ↗</a>
      <div class="related">
        <h4>Recommendations</h4>
        <div class="flex">
          ${recosList}
        </div>
      </div>
      <img src="http://image.tmdb.org/t/p/w1280${backdrop_path}" class="bkg-img" />
      </div>
      `;

  // <iframe class="bkg-img"  src="https://www.youtube.com/embed/${video_id}?autoplay=1&showinfo=0&controls=0&mute=1&amp;start=5" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope;"></iframe>
  document.querySelector('.icon').addEventListener('click', () => (details.style.display = 'none'));
}

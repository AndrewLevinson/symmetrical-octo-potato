// this is an example of using an API to dynamically create content. (see the empty HTML file with only placeholders)
// warning: this is ADVANCED javascript. I comment lines that are new to us. You aren't expecting to understand all this, but you should challenge yourself to learn the pieces you don't understand.

// API: https://www.themoviedb.org/documentation/api
const API_KEY = '94a83d421d79431debf81630227da2ff'; // this is my personal API key for The Movie DB. NEVER put secret API keys on GitHub that are tied to your credit card or any sensitive data.

// Fetch our first batch of content: popular movies (defaults to 1 page of 20 films)
fetch(`https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}`)
  .then(res => res.json()) // necessary JS syntax with fetch. this just ensures we are getting the body of the response in json format
  .then(data => buildContent(data.results)); // run a function with the results from the API (a list of 20 films)

const BASE_IMG = 'http://image.tmdb.org/t/p/w500';
var movieSet = [];

const content = document.querySelector('.grid');
function buildContent(results) {
  results
    .filter(movie => movie.backdrop_path && movie.vote_count) // we are filtering down to only show movies that have a backdrop image and at least 1 user rating (vote_count)
    .forEach(movie => {
      // we add a <li> to our grid for each movie in our API results. We grab the title and the backdrop_path from each movie
      content.innerHTML += `
    <li class="card">
      <h3 class="title pin">${movie.title}</h3>
      <img src="${BASE_IMG}/${movie.backdrop_path}" id="${movie.id}" class="movie" />
    </li>`;

      movieSet[movie.id] = movie; // adding each movie to our global array of data called movieSet in a format that's easier to work with in the showDetails() function below.
    });

  document.querySelectorAll('.movie').forEach(movie => movie.addEventListener('click', showDetails));
}

const details = document.querySelector('.details'); // details box pops up when clicking on a movie card
async function showDetails() {
  const movieID = event.target.id; // get the ID of the movie so we know which movie's details to put in the popup modal

  const { title, overview, vote_average, backdrop_path } = movieSet[movieID]; // this is how we access individual properties from our previously saved movie info in our global movieSet array

  const videoInfo = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/videos?api_key=${API_KEY}`).then(res => res.json());
  const video_id = videoInfo.results[0].key; // get the first video's youtube key for the movie

  // get recommended movies
  const recos = await fetch(`https://api.themoviedb.org/3/movie/${movieID}/recommendations?api_key=${API_KEY}`).then(res => res.json());
  const recosList = recos.results
    .slice(0, 3) // use slice to only use the first 3 recommendations
    // map is an alternative to forEach. We use map here because we save all the content to a variable called recosList and insert it as a part of our details.innerHTML below
    .map(rec => {
      return ` 
      <div>
        <h4 class="rec-title">${rec.title}</h4>
        <img src="${BASE_IMG}${rec.poster_path}" />
      </div>
    `;
    })
    .join(''); // necessary to join when using .map instead of forEach

  // take everything we did in this showDetails() function and add it all below as a big content block in details.innerHTML
  details.innerHTML = `
    <div id="detail-content">
      <svg class="icon" xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24" fill="none" stroke="#000000" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line></svg>
      <div class="tags">
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

  details.classList.add('details-appear'); // after everything is loaded, we show the details box
  document.querySelector('.icon').addEventListener('click', () => details.classList.remove('details-appear')); // add an event listener to our SVG icon to clode the box
}

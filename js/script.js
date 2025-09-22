const global = {
  currentPage: window.location.pathname,
};

function showSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner.classList.add("show");
}

function hideSpinner() {
  const spinner = document.querySelector(".spinner");
  spinner.classList.remove("show");
}

// Display Backdrop on Details Page
function displayBackgroundImage(typeOfResource, backgroundImageURL) {
  const underlayDiv = document.createElement("div");
  underlayDiv.style.backgroundImage = `url("https://image.tmdb.org/t/p/original${backgroundImageURL}")`;
  underlayDiv.style.backgroundSize = "cover";
  underlayDiv.style.backgroundPosition = "center";
  underlayDiv.style.backgroundRepeat = "no-repeat";
  underlayDiv.style.height = "100vh";
  underlayDiv.style.width = "100vw";
  underlayDiv.style.position = "absolute";
  underlayDiv.style.top = "0";
  underlayDiv.style.left = "0";
  underlayDiv.style.zIndex = "-1";
  underlayDiv.style.opacity = "0.1";

  if (typeOfResource === "movie") {
    document.querySelector("#movie-details").append(underlayDiv);
  } else {
    document.querySelector("#show-details").append(underlayDiv);
  }
}

// Initialize Swiper Object
function initSwiper() {
  const swiper = new Swiper(".swiper", {
    slidesPerView: 1,
    spaceBetween: 30,
    freeMode: true,
    loop: true,
    autoplay: {
      delay: 4000,
      disableOnInteraction: false,
    },
    breakpoints: {
      500: {
        slidesPerView: 2,
      },
      700: {
        slidesPerView: 3,
      },
      1200: {
        slidesPerView: 4,
      },
    },
  });
}

// Display Slider Movies
async function displaySlider() {
  const { results } = await fetchAPIData("movie/now_playing");
  const swiperWrapperDiv = document.querySelector(".swiper-wrapper");
  for (const result of results) {
    const slideDiv = document.createElement("div");
    slideDiv.classList.add("swiper-slide");
    const a = document.createElement("a");
    a.setAttribute("href", `movie-details.html?id=${result.id}`);
    const img = document.createElement("img");
    if (result.poster_path) {
      img.setAttribute(
        "src",
        `http://image.tmdb.org/t/p/w500${result.poster_path}`
      );
    } else {
      img.setAttribute("src", "../images/no-image.jpg");
    }
    img.setAttribute("alt", `${result.title}`);
    a.append(img);
    slideDiv.append(a);
    const slideRatingHeading = document.createElement("h4");
    slideRatingHeading.classList.add("swiper-rating");
    const star = document.createElement("i");
    star.className = "fas fa-star text-secondary";
    slideRatingHeading.append(star);
    const ratingTextNode = document.createTextNode(
      ` ${result.vote_average.toFixed(1)} / 10`
    );
    slideRatingHeading.append(ratingTextNode);
    slideDiv.append(slideRatingHeading);
    swiperWrapperDiv.append(slideDiv);
  }

  initSwiper();
}

// Fetch Data from TMDB API
async function fetchAPIData(endpoint) {
  showSpinner();
  const API_URL = "https://api.themoviedb.org/3/";
  const options = {
    method: "GET",
    headers: {
      accept: "application/json",
      Authorization:
        "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2MWM4ZDhiMDk4OGY2OGQzMTJkYWI5N2FhZTIyMDQyNiIsIm5iZiI6MTc1ODAxNDM5OC45MSwic3ViIjoiNjhjOTJiYmVjY2ZiMzM0OWE1ODA0ZjYyIiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.8WVq27euFIHWkIWjsd-lVk0aGAs7yAj1hVEqJcxDsW4",
    },
  };
  const response = await fetch(`${API_URL}${endpoint}?language=en-US`, options);
  const data = await response.json();
  hideSpinner();
  return data;
}

// Display Popular Movies Function
async function displayPopularMovies() {
  const { results } = await fetchAPIData("movie/popular");
  const popularMoviesGrid = document.getElementById("popular-movies");
  for (const result of results) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    const imageLink = document.createElement("a");
    imageLink.setAttribute("href", `movie-details.html?id=${result.id}`);
    const image = document.createElement("img");
    if (result.poster_path) {
      image.setAttribute(
        "src",
        `http://image.tmdb.org/t/p/w500${result.poster_path}`
      );
    } else {
      image.setAttribute("src", "../images/no-image.jpg");
    }
    image.setAttribute("alt", `${result.title}`);
    image.classList.add("card-img-top");
    imageLink.append(image);
    cardDiv.append(imageLink);
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    const movieTitleH5 = document.createElement("h5");
    movieTitleH5.classList.add("card-title");
    movieTitleH5.textContent = result.title;
    cardBodyDiv.append(movieTitleH5);
    const cardTextP = document.createElement("p");
    cardTextP.classList.add("card-text");
    const smallElement = document.createElement("small");
    smallElement.classList.add("text-muted");
    smallElement.textContent = `Release ${result.release_date}`;
    cardTextP.append(smallElement);
    cardBodyDiv.append(cardTextP);
    cardDiv.append(cardBodyDiv);
    popularMoviesGrid.append(cardDiv);
  }
}

// Display Popular TV Shows Function
async function displayPopularTVShows() {
  const { results } = await fetchAPIData("tv/popular");
  const popularTVShowsGrid = document.getElementById("popular-shows");
  for (const result of results) {
    const cardDiv = document.createElement("div");
    cardDiv.classList.add("card");
    const imageLink = document.createElement("a");
    imageLink.setAttribute("href", `tv-details.html?id=${result.id}`);
    const image = document.createElement("img");
    if (result.poster_path) {
      image.setAttribute(
        "src",
        `http://image.tmdb.org/t/p/w500${result.poster_path}`
      );
    } else {
      image.setAttribute("src", "../images/no-image.jpg");
    }
    image.setAttribute("alt", `${result.name}`);
    image.classList.add("card-img-top");
    imageLink.append(image);
    cardDiv.append(imageLink);
    const cardBodyDiv = document.createElement("div");
    cardBodyDiv.classList.add("card-body");
    const tvShowTitleH5 = document.createElement("h5");
    tvShowTitleH5.classList.add("card-title");
    tvShowTitleH5.textContent = result.name;
    cardBodyDiv.append(tvShowTitleH5);
    const cardTextP = document.createElement("p");
    cardTextP.classList.add("card-text");
    const smallElement = document.createElement("small");
    smallElement.classList.add("text-muted");
    smallElement.textContent = `Aired ${result.first_air_date}`;
    cardTextP.append(smallElement);
    cardBodyDiv.append(cardTextP);
    cardDiv.append(cardBodyDiv);
    popularTVShowsGrid.append(cardDiv);
  }
}

// Display Details of a Movie
async function displayMovieDetails() {
  const queryStringParams = new URLSearchParams(window.location.search);
  const movieId = queryStringParams.get("id");
  const movie = await fetchAPIData(`movie/${movieId}`);
  displayBackgroundImage("movie", movie.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
          ${
            movie.poster_path
              ? `<img
              src="http://image.tmdb.org/t/p/w500${movie.poster_path}"
              class="card-img-top"
              alt="${movie.title}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${movie.title}"
            />`
          }
            
          </div>
          <div>
            <h2>${movie.title}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${movie.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">Release Date: ${movie.release_date}</p>
            <p>
              ${movie.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            </ul>
            <a href="${
              movie.homepage
            }" target="_blank" class="btn">Visit Movie Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Movie Info</h2>
          <ul>
            <li><span class="text-secondary">Budget:</span> $${movie.budget.toLocaleString(
              "en-US"
            )}</li>
            <li><span class="text-secondary">Revenue:</span> $${movie.revenue.toLocaleString(
              "en-US"
            )}</li>
            <li><span class="text-secondary">Runtime:</span> ${
              movie.runtime
            } minutes</li>
            <li><span class="text-secondary">Status:</span> ${movie.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div>`;
  const genreList = div.querySelector("ul.list-group");
  for (const genre of movie.genres) {
    const genreLi = document.createElement("li");
    genreLi.textContent = genre.name;
    genreList.append(genreLi);
  }
  const productionCompaniesList = div.querySelector("div.list-group");
  let productionCompaniesString = "";
  for (const productionCompany of movie.production_companies) {
    productionCompaniesString += productionCompany.name + " / ";
  }
  productionCompaniesList.textContent = productionCompaniesString;
  document.querySelector("#movie-details").append(div);
}

// Display Details of a TV Show
async function displayTVShowDetails() {
  const queryStringParams = new URLSearchParams(window.location.search);
  const showId = queryStringParams.get("id");
  const show = await fetchAPIData(`tv/${showId}`);
  displayBackgroundImage("tv", show.backdrop_path);
  const div = document.createElement("div");
  div.innerHTML = `<div class="details-top">
          <div>
          ${
            show.poster_path
              ? `<img
              src="http://image.tmdb.org/t/p/w500${show.poster_path}"
              class="card-img-top"
              alt="${show.name}"
            />`
              : `<img
              src="images/no-image.jpg"
              class="card-img-top"
              alt="${show.name}"
            />`
          }
            
          </div>
          <div>
            <h2>${show.name}</h2>
            <p>
              <i class="fas fa-star text-primary"></i>
              ${show.vote_average.toFixed(1)} / 10
            </p>
            <p class="text-muted">First Air Date: ${show.first_air_date}</p>
            <p>
              ${show.overview}
            </p>
            <h5>Genres</h5>
            <ul class="list-group">
            </ul>
            <a href="${
              show.homepage
            }" target="_blank" class="btn">Visit Show Homepage</a>
          </div>
        </div>
        <div class="details-bottom">
          <h2>Show Info</h2>
          <ul>
            <li><span class="text-secondary">Number of Episodes:</span> ${
              show.number_of_episodes
            }</li>
            <li><span class="text-secondary">Last Episode to Air:</span> ${
              show.last_episode_to_air.name
            }</li>
            <li><span class="text-secondary">Status:</span> ${show.status}</li>
          </ul>
          <h4>Production Companies</h4>
          <div class="list-group">Company 1, Company 2, Company 3</div>
        </div>`;
  const genreList = div.querySelector("ul.list-group");
  for (const genre of show.genres) {
    const genreLi = document.createElement("li");
    genreLi.textContent = genre.name;
    genreList.append(genreLi);
  }
  const productionCompaniesList = div.querySelector("div.list-group");
  let productionCompaniesString = "";
  for (const productionCompany of show.production_companies) {
    productionCompaniesString += productionCompany.name + " / ";
  }
  productionCompaniesList.textContent = productionCompaniesString;
  document.querySelector("#show-details").append(div);
}

// Highlight active link
function highlightActiveLink() {
  const headerLinks = document.querySelectorAll(".main-header .nav-link");
  for (const headerLink of headerLinks) {
    if (headerLink.getAttribute("href") === global.currentPage) {
      headerLink.classList.add("active");
    }
  }
}

// Initialize Application
function init() {
  switch (global.currentPage) {
    case "/":
    case "/index.html":
      displaySlider();
      displayPopularMovies();
      break;
    case "/shows.html":
      displayPopularTVShows();
      break;
    case "/movie-details.html":
      displayMovieDetails();
      break;
    case "/tv-details.html":
      displayTVShowDetails();
      break;
    case "/search.html":
      console.log("SEARCH");
      break;
    default:
      console.log("OTHER");
  }

  highlightActiveLink();
}

document.addEventListener("DOMContentLoaded", init);

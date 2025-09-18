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
      displayPopularMovies();
      break;
    case "/shows.html":
      console.log("SHOWS");
      break;
    case "/movie-details.html":
      console.log("Movie Details");
      break;
    case "/tv-details.html":
      console.log("TV Details");
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

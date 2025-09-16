const global = {
  currentPage: window.location.pathname,
};

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
      console.log("HOME");
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

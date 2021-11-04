const API_KEY = "bf4151671b4e02f20ce3db84fd385688";
const carousel = document.querySelector(".carousel-box");
const scrollRightButton = document.querySelector(".switchRight");
const scrollLeftButton = document.querySelector(".switchLeft");
const dropdownMenu = document.getElementById("dropdown");
const categoriesButton = document.getElementById("nav").lastElementChild;
const scrollToAdd = 450;
const bestRatedButton = document.getElementById("best-rated-btn");
const comedyButton = document.getElementById("comedy-btn");
const dramaButton = document.getElementById("drama-btn");
const horroButton = document.getElementById("horror-btn");
const displayedGenre = document.querySelector(".genre");

async function showHorrors() {
  dropdownMenu.classList.toggle("invisible");
  carousel.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    let result = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${i}`
    )
      .then((response) => response.json())
      .then((data) => {
        let movies = data.results.filter((movie) =>
          movie.genre_ids.includes(27)
        );
        movies.map((movie) => {
          carousel.insertAdjacentHTML(
            "beforeend",
            `<img class="movie-img" src=
          "https://image.tmdb.org/t/p/w200/${movie.poster_path}
          "
          />`
          );
        });
      });
  }
  displayedGenre.textContent = "Horrors";
}

async function showDramas() {
  dropdownMenu.classList.toggle("invisible");
  carousel.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    let result = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${i}`
    )
      .then((response) => response.json())
      .then((data) => {
        let movies = data.results.filter((movie) =>
          movie.genre_ids.includes(18)
        );
        movies.map((movie) => {
          carousel.insertAdjacentHTML(
            "beforeend",
            `<img class="movie-img" src=
          "https://image.tmdb.org/t/p/w200/${movie.poster_path}
          "
          />`
          );
        });
      });
  }
  displayedGenre.textContent = "Dramas";
}

async function showComedies() {
  dropdownMenu.classList.toggle("invisible");
  carousel.innerHTML = "";
  for (let i = 1; i <= 10; i++) {
    let result = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${i}`
    )
      .then((response) => response.json())
      .then((data) => {
        let movies = data.results.filter((movie) =>
          movie.genre_ids.includes(35)
        );
        movies.map((movie) => {
          carousel.insertAdjacentHTML(
            "beforeend",
            `<img class="movie-img" src=
          "https://image.tmdb.org/t/p/w200/${movie.poster_path}
          "
          />`
          );
        });
      });
  }
  displayedGenre.textContent = "Comedies";
}

async function showBestRated() {
  dropdownMenu.classList.toggle("invisible");
  carousel.innerHTML = "";
  let result = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.map((movie) => {
        carousel.insertAdjacentHTML(
          "beforeend",
          `<img class="movie-img" src=
        "https://image.tmdb.org/t/p/w200/${movie.poster_path}
        " 
        />`
        );
      });
    });
  displayedGenre.textContent = "Best Rated";
}

function dropdownHandler() {
  const rect = categoriesButton.getBoundingClientRect();
  dropdownMenu.style.left = rect.left + "px";
  dropdownMenu.style.top = rect.top + categoriesButton.offsetHeight + "px";
  dropdownMenu.style.width = categoriesButton.offsetWidth + "px";
  dropdownMenu.classList.toggle("invisible");
}

function resizeHandler() {
  const rect = categoriesButton.getBoundingClientRect();
  dropdownMenu.style.left = rect.left + "px";
  dropdownMenu.style.top = rect.top + categoriesButton.offsetHeight + "px";
}

function scrollRightHandler() {
  let currentPosition = carousel.scrollLeft;
  carousel.scrollLeft = currentPosition + scrollToAdd;
}

function scrollLeftHandler() {
  let currentPosition = carousel.scrollLeft;
  carousel.scrollLeft = currentPosition - scrollToAdd;
}

async function showMovieData() {
  let result = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.map((movie) => {
        carousel.insertAdjacentHTML(
          "beforeend",
          `<img class="movie-img" src=
        "https://image.tmdb.org/t/p/w200/${movie.poster_path}
        " 
        />`
        );
      });
    });
}

scrollRightButton.addEventListener("click", scrollRightHandler);

scrollLeftButton.addEventListener("click", scrollLeftHandler);

categoriesButton.addEventListener("click", dropdownHandler);

bestRatedButton.addEventListener("click", showBestRated);

comedyButton.addEventListener("click", showComedies);

dramaButton.addEventListener("click", showDramas);

horroButton.addEventListener("click", showHorrors);

window.addEventListener("resize", resizeHandler);

showMovieData();

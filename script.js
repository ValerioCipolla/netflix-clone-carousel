const API_KEY = "bf4151671b4e02f20ce3db84fd385688";
const carousel = document.querySelector(".carousel-box");
const scrollRightButton = document.querySelector(".switchRight");
const scrollLeftButton = document.querySelector(".switchLeft");
const dropdownMenu = document.getElementById("dropdown");
const categoriesButton = document.getElementById("nav").lastElementChild;
const scrollToAdd = 600;
const bestRatedButton = document.getElementById("best-rated-btn");
const comedyButton = document.getElementById("comedy-btn");
const dramaButton = document.getElementById("drama-btn");
const horrorButton = document.getElementById("horror-btn");
const displayedGenre = document.querySelector(".genre");
let movieList = [];

async function showPickedCategory(event) {
  dropdownMenu.classList.toggle("invisible");
  carousel.innerHTML = "";
  movieList.splice(0, movieList.length);
  let moviesToDisplay = [];
  for (let i = 1; i <= 10; i++) {
    let result = await fetch(
      `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=${i}`
    )
      .then((response) => response.json())
      .then((data) => {
        if (event.target === bestRatedButton) {
          moviesToDisplay = data.results.filter(
            (movie) => movie.vote_average >= 8
          );
        } else if (event.target === comedyButton) {
          moviesToDisplay = data.results.filter((movie) =>
            movie.genre_ids.includes(35)
          );
        } else if (event.target === dramaButton) {
          moviesToDisplay = data.results.filter((movie) =>
            movie.genre_ids.includes(18)
          );
        } else if (event.target === horrorButton) {
          moviesToDisplay = data.results.filter((movie) =>
            movie.genre_ids.includes(27)
          );
        }
        moviesToDisplay.map((movie) => {
          movieList.push({
            id: movie.id,
            title: movie.title,
            rating: movie.vote_average,
            realeaseDate: movie.release_date,
            description: movie.overview,
          });
          carousel.insertAdjacentHTML(
            "beforeend",
            `<img class="movie-img" 
            data-id="${movie.id}"
            src=
          "https://image.tmdb.org/t/p/w200/${movie.poster_path}
          "
          />`
          );
        });
      });
  }
  if (event.target === bestRatedButton)
    displayedGenre.textContent = "Best rated";
  else if (event.target === comedyButton)
    displayedGenre.textContent = "Comedies";
  else if (event.target === dramaButton) 
    displayedGenre.textContent = "Dramas";
  else if (event.target === horrorButton)
    displayedGenre.textContent = "Horrors";
  let movieElements = document.querySelectorAll(".movie-img");
  movieElements.forEach((movie) => {
    movie.addEventListener("click", showModalHandler);
  });
}

async function showMovieData() {
  let result = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.map((movie) => {
        movieList.push({
          id: movie.id,
          title: movie.title,
          rating: movie.vote_average,
          realeaseDate: movie.release_date,
          description: movie.overview,
        });
        carousel.insertAdjacentHTML(
          "beforeend",
          `<img class="movie-img" 
          data-id="${movie.id}"
          src=
          "https://image.tmdb.org/t/p/w200/${movie.poster_path}
          " 
          />`
        );
      });
    });
  let movieElements = document.querySelectorAll(".movie-img");
  movieElements.forEach((movie) => {
    movie.addEventListener("click", showModalHandler);
  });
}

async function showModalHandler() {
  let targetMovie = movieList.find(
    (movie) => movie.id == event.target.getAttribute("data-id")
  );
  event.target.style.pointerEvents = "none";
  let modalBackground = document.createElement("div");
  modalBackground.className = "modal-bg";
  let modal = document.createElement("div");
  modal.className = "modal-box";
  modal.innerHTML = `
  <h1>${targetMovie.title}</h1>
  <p class="modal-footer">Realeased in ${targetMovie.realeaseDate.slice(
    0,
    4
  )} <span>Rating: ${targetMovie.rating}/10</span></p>
  <p class="modal-desc">${targetMovie.description}</p>
  <p class ="modal-buttons"><button>Watch</button><button>Close</button></p>
  `;
  document.body.append(modalBackground);
  modalBackground.appendChild(modal);
  let closeButton = document.querySelector(".modal-buttons").lastElementChild;
  closeButton.addEventListener("click", removeModalHandler);
}

function removeModalHandler() {
  let modalBackground = document.querySelector(".modal-bg");
  modalBackground.remove();
  let movieElements = document.querySelectorAll(".movie-img");
  movieElements.forEach((movie) => (movie.style.pointerEvents = "initial"));
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

scrollRightButton.addEventListener("click", scrollRightHandler);

scrollLeftButton.addEventListener("click", scrollLeftHandler);

categoriesButton.addEventListener("click", dropdownHandler);

bestRatedButton.addEventListener("click", showPickedCategory);

comedyButton.addEventListener("click", showPickedCategory);

dramaButton.addEventListener("click", showPickedCategory);

horrorButton.addEventListener("click", showPickedCategory);

window.addEventListener("resize", resizeHandler);

showMovieData();

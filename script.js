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
const horroButton = document.getElementById("horror-btn");
const displayedGenre = document.querySelector(".genre");
let movieList = [];

async function showHorrors() {
  dropdownMenu.classList.toggle("invisible");
  carousel.innerHTML = "";
  movieList.splice(0, movieList.length);
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
          movieList.push(
            {
              id: movie.id,
              title: movie.title,
              rating: movie.vote_average,
              realeaseDate: movie.release_date,
              description: movie.overview,
             }
            )
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
  displayedGenre.textContent = "Horrors";
  let movieElements = document.querySelectorAll(".movie-img");
  movieElements.forEach((movie) => {
    movie.addEventListener("click", showModalHandler);
  })
}

async function showDramas() {
  dropdownMenu.classList.toggle("invisible");
  carousel.innerHTML = "";
  movieList.splice(0, movieList.length);
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
          movieList.push(
            {
              id: movie.id,
              title: movie.title,
              rating: movie.vote_average,
              realeaseDate: movie.release_date,
              description: movie.overview,
             }
            )
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
  displayedGenre.textContent = "Dramas";
  let movieElements = document.querySelectorAll(".movie-img");
  movieElements.forEach((movie) => {
    movie.addEventListener("click", showModalHandler);
  })
}

async function showComedies() {
  dropdownMenu.classList.toggle("invisible");
  carousel.innerHTML = "";
  movieList.splice(0, movieList.length);
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
          movieList.push(
            {
              id: movie.id,
              title: movie.title,
              rating: movie.vote_average,
              realeaseDate: movie.release_date,
              description: movie.overview,
             }
            )
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
  displayedGenre.textContent = "Comedies";
  let movieElements = document.querySelectorAll(".movie-img");
  movieElements.forEach((movie) => {
    movie.addEventListener("click", showModalHandler);
  })
}

async function showBestRated() {
  dropdownMenu.classList.toggle("invisible");
  carousel.innerHTML = "";
  movieList.splice(0, movieList.length);
  let result = await fetch(
    `https://api.themoviedb.org/3/movie/top_rated?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.map((movie) => {
        movieList.push(
          {
            id: movie.id,
            title: movie.title,
            rating: movie.vote_average,
            realeaseDate: movie.release_date,
            description: movie.overview,
           }
          )
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
  displayedGenre.textContent = "Best Rated";
  let movieElements = document.querySelectorAll(".movie-img");
  movieElements.forEach((movie) => {
    movie.addEventListener("click", showModalHandler);
  })
}

async function showMovieData() {
  let result = await fetch(
    `https://api.themoviedb.org/3/movie/popular?api_key=${API_KEY}&language=en-US&page=1`
  )
    .then((response) => response.json())
    .then((data) => {
      data.results.map((movie) => {
        movieList.push(
          {
            id: movie.id,
            title: movie.title,
            rating: movie.vote_average,
            realeaseDate: movie.release_date,
            description: movie.overview,
           }
          )
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
  })
  
}

async function showModalHandler() {
  let targetMovie = movieList.find(movie => movie.id == event.target.getAttribute("data-id"));
  event.target.style.pointerEvents = "none";
  let modalBackground = document.createElement("div");
  modalBackground.className = "modal-bg";
  let modal = document.createElement("div");
  modal.className = "modal-box";
  modal.innerHTML = `
  <h1>${targetMovie.title}</h1>
  <p class="modal-footer">Realeased in ${targetMovie.realeaseDate.slice(0, 4)} <span>Rating: ${targetMovie.rating}/10</span></p>
  <p class="modal-desc">${targetMovie.description}</p>
  <p class ="modal-buttons"><button>Watch</button><button>Close</button></p>
  `;
  document.body.append(modalBackground);
  modalBackground.appendChild(modal);
  let closeButton = document.querySelector(".modal-buttons").lastElementChild;
  closeButton.addEventListener("click", removeModalHandler)
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

bestRatedButton.addEventListener("click", showBestRated);

comedyButton.addEventListener("click", showComedies);

dramaButton.addEventListener("click", showDramas);

horroButton.addEventListener("click", showHorrors);

window.addEventListener("resize", resizeHandler);

showMovieData();

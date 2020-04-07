const container = document.querySelector(".container");
const availableSeats = document.querySelectorAll(".row .seat:not(.occupied)");
const numberOfSeats = document.getElementById("count");
const totalPrice = document.getElementById("price");
const selectedMovie = document.getElementById("movie");
//because it changes based on movie
let ticketPrice = selectedMovie.value;

populateUI();
updateSelectedCount();

function updateSelectedCount() {
  const selectedSeats = document.querySelectorAll(".row .seat.selected");
  const selectedSeatsCount = selectedSeats.length;

  const seatIndex = [...selectedSeats].map(seat =>
    [...availableSeats].indexOf(seat)
  );

  localStorage.setItem("selectedSeats", JSON.stringify(seatIndex));

  count.innerText = selectedSeatsCount;
  totalPrice.innerText = selectedSeatsCount * ticketPrice;
}

// get data from localStorage and populate UI
function populateUI() {
  const selectedSeats = JSON.parse(localStorage.getItem("selectedSeats"));
  if (selectedSeats !== null && selectedSeats.length > 0) {
    availableSeats.forEach((availableSeats, index) => {
      if (selectedSeats.indexOf(index) > -1) {
        availableSeats.classList.add("selected");
      }
    });
  }

  const selectedMovieIndex = localStorage.getItem("selectedMovieIndex");
  if (selectedMovieIndex != null) {
    selectedMovie.selectedIndex = selectedMovieIndex;
  }

  const selectedMoviePrice = localStorage.getItem("selectedMoviePrice");
  if (selectedMoviePrice != null) {
    ticketPrice = selectedMoviePrice;
  }
}

// save selected movie index and price
function setMovieData(movieIndex, moviePrice) {
  localStorage.setItem("selectedMovieIndex", movieIndex);
  localStorage.setItem("selectedMoviePrice", moviePrice);
}

// seat click event
container.addEventListener("click", e => {
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    console.log(e.target);
    e.target.classList.toggle("selected");
    updateSelectedCount();
  }
});

// when changing movie from select
selectedMovie.addEventListener("change", e => {
  ticketPrice = +e.target.value;

  localStorage.set;
  updateSelectedCount();
  setMovieData(e.target.selectedIndex, e.target.value);
});

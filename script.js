const notOccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)");
// console.log(notOccupiedSeats);
const movieSelectBox = document.querySelector("#movie");
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const container = document.querySelector(".container");

// movieSelectBox.onchange = ()=>{ } onchange oldugunda ..şunu yap/güncel olan aşagıdaki yapı
movieSelectBox.addEventListener("change", (e) => {
  let price = e.target.value;
  updateMovieInfo(price);
  // console.log(price);
});

const updateMovieInfo = (filmPrice) => {
  let selectedSeats = document.querySelectorAll(".row .selected");
  console.log(selectedSeats.length);

  // const seatsIndexArray = [...selectedSeats].map((seat) => [...notOccupiedSeats].indexOf(seat))
  const selectedSeatCount = selectedSeats.length;
  count.innerText = selectedSeatCount;

  film.innerText =
    movieSelectBox.options[movieSelectBox.selectedIndex].innerText.split(
      "("
    )[0];
  console.log(film.innerText);
  total.innerText = selectedSeatCount * parseFloat(filmPrice);
};

container.addEventListener("click", (e) => {
  console.log(e.target);
  if (
    e.target.classList.contains("seat") &&
    !e.target.classList.contains("occupied")
  ) {
    e.target.classList.toggle("selected");
  }
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  updateMovieInfo(price);
});

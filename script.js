const notOccupiedSeats = document.querySelectorAll(".row .seat:not(.occupied)");
// console.log(notOccupiedSeats);
const movieSelectBox = document.querySelector("#movie");
const count = document.getElementById("count");
const film = document.getElementById("film");
const total = document.getElementById("total");
const container = document.querySelector(".container");

// sayfa yüklendiğinde kayıtlı bilgileri(selectboxda secili olanı) otomatik olarak yuklesın ıstıyorum

window.addEventListener("load", () => {
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  // get last selected indexes,  and set last selected movie index and price

  // displayUIda get işlemi oldugu için updateMovieInfonun üstünde olaması gerekiyor
  displayUI();
  updateMovieInfo(price);
  // set last selected movie index and price
  // setMovieDataToStorage(movieSelectBox.selectedIndex, price);
  // local Storagedaki string ifadeleri arraya çevirip ilgili koltuga set etmek için fonk yazalım:
});

const displayUI = () => {
  const selectedSeatFromStorage = JSON.parse(
    localStorage.getItem("selectedSeats")
  );
  if (selectedSeatFromStorage !== null && selectedSeatFromStorage.length > 0) {
    notOccupiedSeats.forEach((seat, index) => {
      if (selectedSeatFromStorage.indexOf(index) > -1) {
        seat.classList.add("selected");
      }
    });
  }
  console.log(selectedSeatFromStorage);
};

// movieSelectBox.onchange = ()=>{ } onchange oldugunda ..şunu yap/güncel olan aşagıdaki yapı
movieSelectBox.addEventListener("change", (e) => {
  let price = e.target.value;
  updateMovieInfo(price);
  // console.log(price);
});

// container altındaki yapıyı dinamik olarak güncellemek istiyoruz (updateMovieInfo):
const updateMovieInfo = (filmPrice) => {
  let selectedSeats = document.querySelectorAll(".row .seat.selected");
  // Dom'da aralarında parent ilişki varsa boşluklu ,yoksa boşluksuz yaz.
  console.log(selectedSeats.length);

  // occupied olmayanlara göre selected seatlerin indexlerini tutan array oluşturalım
  const seatsIndexArray = [...selectedSeats].map((seat) =>
    [...notOccupiedSeats].indexOf(seat)
  );
  // tutulan indexleri global bir değişkene/veri tabanına gönderelim/
  // localStorageda string olarak tutmam gerekiyor
  localStorage.setItem("selectedSeats", JSON.stringify(seatsIndexArray));

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
    // bir öğeye classname ekleme ve kaldırma arasında geçiş için toggle kullandık
  }
  let price = movieSelectBox.options[movieSelectBox.selectedIndex].value;
  updateMovieInfo(price);
});

const btnEl = document.querySelector("#mode-btn");
const btnEl2 = document.querySelector("#mode-img");
const btnEl3 = document.querySelector("#mode-text");
const btnfIcon = document.querySelector("#fIcon");

btnEl.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  if (document.body.classList.contains("dark-mode")) {
    btnEl2.src = "./images/sunrise.svg";
    btnEl2.style.filter = "brightness(0) invert(1)";
    btnEl3.textContent = "Light Mode";
    btnfIcon.src = "./images/filter-icon-dark.svg";
  } else {
    btnEl2.src = "./images/moon.svg";
    btnEl2.style.filter = "none";
    btnEl3.textContent = "Dark Mode";
    btnfIcon.src = "./images/filter-icon-light.svg";
  }
});

//
// filter
//

let filterBtn = document.querySelector("#filter-btn");
let regionOptions = document.querySelector("#region-options");
let regions = document.querySelectorAll(".region-options p");
let countries = document.querySelectorAll(".country");

filterBtn.addEventListener("click", () => {
  regionOptions.classList.toggle("hidden");
});

regions.forEach((region) => {
  region.addEventListener("click", () => {
    let selectedRegion = region.dataset.region;

    countries.forEach((country) => {
      let countryRegion = country.dataset.region;

      if (
        selectedRegion === "all" ||
        country.dataset.region === selectedRegion
      ) {
        country.classList.remove("hidden");
      } else {
        country.classList.add("hidden");
      }
    });

    regionOptions.classList.add("hidden");
  });
});

let searchInput = document.querySelector("#searchInput");
let countriesContainer = document.querySelector(".countries");

let selectedRegion = "all";

function filterCountries() {
  let searchText = searchInput.value.toLowerCase().trim();

  countries.forEach((country) => {
    let countryName = country.querySelector("h2").textContent.toLowerCase();
    let countryRegion = country.dataset.region;

    let regionMatch =
      selectedRegion === "all" || countryRegion === selectedRegion;

    let searchMatch = countryName.includes(searchText);

    if (regionMatch && searchMatch) {
      country.classList.remove("hidden");
    } else {
      country.classList.add("hidden");
    }
  });
}

//
// search
//

searchInput.addEventListener("input", filterCountries);

regions.forEach((region) => {
  region.addEventListener("click", () => {
    selectedRegion = region.dataset.region;

    filterCountries();
    regionOptions.classList.add("hidden");
  });
});

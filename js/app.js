//=====
function save(key, value) {
  try {
    localStorage.setItem(key, value);
  } catch (e) {}
}

function load(key, fallback) {
  try {
    const v = localStorage.getItem(key);
    return v === null ? fallback : v;
  } catch (e) {
    return fallback;
  }
}
//=========

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

  //=========
  save(
    "theme",
    document.body.classList.contains("dark-mode") ? "dark" : "light",
  );
  //========
});

//
// filter
//

let filterBtn = document.querySelector("#filter-btn");
let regionOptions = document.querySelector("#region-options");
let regions = document.querySelectorAll(".region-options p");
// let countries = document.querySelectorAll(".country");

filterBtn.addEventListener("click", () => {
  regionOptions.classList.toggle("hidden");
});

let searchInput = document.querySelector("#searchInput");
let countriesContainer = document.querySelector(".countries");

let selectedRegion = "all";

function updateUi(arr) {
  countriesContainer.innerHTML = "";

  arr.forEach((country) => {
    countriesContainer.innerHTML += `
      <div class="country">
        <img src="${country.flag}" alt="${country.name}">
        <div class="c-intros">
          <h2>${country.name}</h2>
          <p class="intro-key">Population: <span class="value">${country.population.toLocaleString()}</span></p>
          <p class="intro-key">Region: <span class="value">${country.region}</span></p>
          <p class="intro-key">Capital: <span class="value">${country.capital}</span></p>
        </div>
      </div>
    `;
  });
}

async function getCountries() {
  try {
    let response;

    if (selectedRegion === "all") {
      response = await fetch(
        `https://countries-api-steel-theta.vercel.app/api/countries?name=${searchInput.value}`,
      );
    } else {
      response = await fetch(
        `https://countries-api-steel-theta.vercel.app/api/countries?name=${searchInput.value}&region=${selectedRegion}`,
      );
    }

    if (!response.ok) {
      throw new Error("Countries olib kelishda xato");
    }

    let data = await response.json();
    console.log(data);

    updateUi(data.data);
  } catch (error) {
    console.log(error);
  }
}

//
// search
//

searchInput.addEventListener("input", () => {
  save("search", searchInput.value);
  getCountries();
});

regions.forEach((region) => {
  region.addEventListener("click", () => {
    selectedRegion = region.dataset.region;
    save("region", selectedRegion);

    getCountries();
    regionOptions.classList.add("hidden");
  });
});

// ====
// theme
if (load("theme", "light") === "dark") {
  document.body.classList.add("dark-mode");
  btnEl2.src = "./images/sunrise.svg";
  btnEl2.style.filter = "brightness(0) invert(1)";
  btnEl3.textContent = "Light Mode";
  btnfIcon.src = "./images/filter-icon-dark.svg";
}

// region + search
selectedRegion = load("region", "all");
searchInput.value = load("search", "");
getCountries();

//=========

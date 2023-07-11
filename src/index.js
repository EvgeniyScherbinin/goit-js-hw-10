import Notiflix from 'notiflix';
// import SlimSelect from 'slim-select';

import {fetchBreeds, fetchCatByBreed} from './cat-api.js';

const breedSelect = document.querySelector('select.breed-select');
const catInfoDiv = document.querySelector('div.cat-info');
const loader = document.querySelector('span.loader');


function init() {
  fetchBreeds()
    .then(breeds => {
      populateBreedSelect(breeds);
      selectorDisplay();
      breedSelect.addEventListener('change', handleBreedSelect);
      hideLoader();
    })
    .catch(() => {
      showError();
      hideLoader();
    });
};

init();

function populateBreedSelect(breeds) {
  breedSelect.innerHTML = breeds
    .map(breed => `<option value="${breed.id}" >${breed.name}</option>`)
    .join('');
};

function selectorDisplay() {
  return (breedSelect.style.display = 'block');
};

function handleBreedSelect(event) {
  Loader();
  setTimeout(() => {
    const breedId = event.target.value;
    console.log(breedId);
    fetchCatByBreed(breedId)
      .then(cat => {
        showCatInfo(cat);
        hideLoader();
      })
      .catch(() => {
        showError();
      });
  }, 1000);
};

function showCatInfo(cat) {
  const { name, description, temperament } = cat[0].breeds[0];
  const catInfoHTML = `<div class="cat">
   <img loading="eager" class="cat-img" src="${cat[0].url}" alt="${name} cat"> 
    <div class="cat-container">
    <h2>${name}</h2>
    <p><b>Description:</b> ${description}</p>
    <p><b>Temperament:</b> ${temperament}</p>
    </div>`;

  catInfoDiv.innerHTML = catInfoHTML;
};

function hideLoader() {
  return (loader.style.display = 'none'), (catInfoDiv.style.display = 'block');
};
function Loader() {
  return (loader.style.display = 'block'), (catInfoDiv.style.display = 'none');
};

function showError() {
  Notiflix.Notify.failure('Oops! Something went wrong! Try reloading the page!');
};
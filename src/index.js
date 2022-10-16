import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import 'notiflix/dist/notiflix-3.2.5.min.css';
import { getCountryListMarkUp } from './markup/list-markup';
import { getCountryMarkUp } from './markup/country-markup';

const DEBOUNCE_DELAY = 300;

const refs = {
    inputRef : document.querySelector('#search-box'),
    countryListRef : document.querySelector('.country-list'),
    countryInfoRef : document.querySelector('.country-info'),
}

refs.inputRef.addEventListener('input', debounce(onInputChange, DEBOUNCE_DELAY));

async function onInputChange(event) {
  const value = event.target.value.toLowerCase().trim();

  if (value === '') return;

  let data = null;
  try {
    data = await fetchCountry(value);
  } catch (event) {
    Notify.failure(event.message);
    data = [];
    return;
  }

  if (data.length > 10) {
    Notify.info('Too many matches found. Please enter a more specific name.');
    return;
  }
  if (data.length === 1) {
    Notify.success('1');
    updateContent(refs.countryInfoRef, getCountryMarkUp(data[0]));
    return;
  }

  Notify.success('Other');
  updateContent(refs.countryListRef, getCountryListMarkUp(data));
}

function updateContent(element, markup) {
  removeChildren(refs.countryListRef);
  removeChildren(refs.countryInfoRef);
  element.insertAdjacentHTML('beforeend', markup);
}

function fetchCountry(value) {
  const URL = 'https://restcountries.com/v3.1/name';
  return fetch(
    `${URL}/${value}?fields=capital,name,population,flags,languages`
  ).then(res => {
    if (!res.ok) {
      throw new Error('Oops, there is no country with that name');
      return;
    }
    return res.json();
  });
}
function removeChildren(element) {
  while (element.firstChild) {
    element.removeChild(element.firstChild);
  }
}
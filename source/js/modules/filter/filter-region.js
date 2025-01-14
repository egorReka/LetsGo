import {breakpoint} from '../../const';

const regionFilter = document.querySelector('[data-region-filter]');
const container = document.querySelector('[data-container]');
const containerCountry = document.querySelector('[data-container-country]');
const regionButton = document.querySelector('[data-region-button]');
const innerRegionButton = document.querySelector('[data-inner-button]');

const groupCountriesByAlphabet = function getGroupCountriesByAlphabet(countries) {
  const alphabeticList = {};

  countries.forEach((country) => {
    const value = Object.values(country)[0];
    const firstLetter = value.charAt(0).toUpperCase();

    if (!alphabeticList[firstLetter]) {
      alphabeticList[firstLetter] = [];
    }

    alphabeticList[firstLetter].push(country);
  });

  return alphabeticList;
};

const createCountriyItem = (country) => {
  const fragment = document.createDocumentFragment();
  const listItem = document.createElement('li');
  const label = document.createElement('label');
  const input = document.createElement('input');
  const value = Object.values(country)[0];

  listItem.classList.add('form-country__item');
  label.textContent = value;
  input.type = 'checkbox';
  input.value = value;
  input.name = 'country';

  label.appendChild(input);
  listItem.appendChild(label);
  fragment.append(listItem);

  return fragment;
};

const renderAlphabeticList = (countries) => {
  containerCountry.innerHTML = '';
  container.innerHTML = '';

  const fragment = document.createDocumentFragment();
  const templateAlphabetItem = document.querySelector('[data-template-country]').content;
  const sortedAlphabet = Object.keys(countries).sort();

  sortedAlphabet.forEach((letter) => {
    const alphabetItem = templateAlphabetItem.cloneNode(true);
    const countriesList = alphabetItem.querySelector('[data-country-list]');

    alphabetItem.querySelector('[data-letter]').textContent = letter;

    countries[letter].forEach((country) => {
      countriesList.append(createCountriyItem(country));
    });

    fragment.append(alphabetItem);
  });

  containerCountry.append(fragment);
};

const renderAlphabeticListTablet = (countries) => {
  containerCountry.innerHTML = '';
  container.innerHTML = '';

  const sortedAlphabet = Object.keys(countries).sort();

  sortedAlphabet.forEach((letter) => {
    const fragment = document.createDocumentFragment();

    const listItem = document.createElement('li');
    const label = document.createElement('label');
    const input = document.createElement('input');

    listItem.classList.add('form-country__alphabetic-item');
    label.textContent = letter;
    input.type = 'checkbox';
    input.value = letter;

    label.appendChild(input);
    listItem.appendChild(label);
    fragment.append(listItem);
    containerCountry.append(fragment);

    const countriesListWrapper = document.createElement('div');
    countriesListWrapper.classList.add('form-country__list-wrapper');
    countriesListWrapper.setAttribute('data-letter', letter);

    if (letter === 'А') {
      input.checked = true;
      countriesListWrapper.classList.add('is-open');
    }

    const countriesList = document.createElement('ul');
    countriesList.classList.add('form-country__list');

    countries[letter].forEach((country) => {
      countriesList.append(createCountriyItem(country));
    });

    countriesListWrapper.append(countriesList);
    container.append(countriesListWrapper);
  });

};

const getSelectedRegions = () => {
  const checkboxes = regionFilter.querySelectorAll('input[type="checkbox"]:checked');

  return Array.from(checkboxes).map((checkbox) => checkbox.value);
};

const getCountriesFromRegions = (countries, selectedRegions) => {
  if (selectedRegions.length === 0) {
    return Object.values(countries).flat();
  }

  return selectedRegions.flatMap((region) => countries[region] || []);
};

const toggleCountryList = () => {
  const buttonText = regionButton.querySelector('span');
  regionButton.classList.toggle('is-active');

  if (regionButton.classList.contains('is-active')) {
    buttonText.textContent = 'Свернуть';
  } else {
    buttonText.textContent = 'Показать все';
  }
};

const onCheckedLetter = (evt) => {
  const letter = evt.target.value;
  const countriesList = document.querySelector(`[data-letter="${letter}"]`);

  countriesList.classList.toggle('is-open');
};


const initFilterRegion = (countries) => {
  if (!containerCountry) {
    return;
  }

  const renderFilteredCountries = () => {
    const filteredCountries = getCountriesFromRegions(countries, getSelectedRegions());

    if (breakpoint.tabletBig.matches || breakpoint.mobile.matches) {
      renderAlphabeticListTablet(groupCountriesByAlphabet(filteredCountries));
      containerCountry.addEventListener('change', onCheckedLetter);
    } else {
      renderAlphabeticList(groupCountriesByAlphabet(filteredCountries));
      containerCountry.removeEventListener('change', onCheckedLetter);
    }
  };

  renderFilteredCountries();
  breakpoint.desktop.addEventListener('change', renderFilteredCountries);
  breakpoint.tabletBig.addEventListener('change', renderFilteredCountries);
  regionFilter.addEventListener('change', renderFilteredCountries);
  regionButton.addEventListener('click', toggleCountryList);
  innerRegionButton.addEventListener('click', toggleCountryList);
};

export {initFilterRegion};

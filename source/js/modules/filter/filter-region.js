const regionFilter = document.querySelector('[data-region-filter]');
const containerCountry = document.querySelector('[data-container-country]');
const regionButton = document.querySelector('[data-region-button]');

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
  regionButton.classList.toggle('is-active');
  regionButton.textContent = regionButton.textContent === 'Показать все' ? 'Свернуть' : 'Показать все';
};

const initFilter = (countries) => {
  if (!containerCountry) {
    return;
  }

  const renderFilteredCountries = () => {
    const filteredCountries = getCountriesFromRegions(countries, getSelectedRegions());

    renderAlphabeticList(groupCountriesByAlphabet(filteredCountries));
  };

  renderFilteredCountries();
  regionFilter.addEventListener('change', renderFilteredCountries);
  regionButton.addEventListener('click', toggleCountryList);
};

export {initFilter};

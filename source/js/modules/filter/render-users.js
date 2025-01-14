const form = document.querySelector('[data-form-parameters]');
const formCountry = document.querySelector('[data-form-country]');


const renderUsers = (users) => {

}

const filterUsers = (users, filters) => {
  return users.filter((user) => {

    if (filters.country) {
      const userCountries = user.listCountries.map((c) => Object.values(c)[0].toLowerCase());
      const filterCountries = filters.country.flat().map((country) => country.toLowerCase());
      if (!filterCountries.some((country) => userCountries.includes(country))) {
        return false;
      }
    }

    if (filters.level) {
      const [minLevel, maxLevel] = filters.level.flat().map(Number);
      if (user.level < minLevel || user.level > maxLevel) {
        return false;
      }
    }

    if (filters.transport) {
      const activeTransport = Object.entries(user.transport)
          .filter(([, transport]) => transport.isActive)
          .map(([key]) => key.toLowerCase());

      const filterTransport = filters.transport.flat().map((t) => t.toLowerCase());


      if (!filterTransport.some((t) => activeTransport.includes(t))) {
        return false;
      }
    }

    // Фильтр по хобби
    // Фильтр по музыке

    return true;
  });
};


const getFormDataAsObject = () => {
  const formCountryData = new FormData(formCountry);
  const country = formCountryData.getAll('country');

  const formData = new FormData(form);
  const result = {};

  if (country.length > 0) {
    result.country = [country];
  }

  for (const [key, value] of formData.entries()) {
    if (!result[key]) {
      result[key] = [value];
    } else {
      result[key].push(value);
    }
  }

  delete result.toggle;

  return result;
};

const initListUsers = (users) => {
  const onSubmitForm = (evt) => {
    evt.preventDefault();


    renderUsers(users);

    console.log(filterUsers(users, getFormDataAsObject()));

  };

  form.addEventListener('submit', onSubmitForm);
};

export {initListUsers};

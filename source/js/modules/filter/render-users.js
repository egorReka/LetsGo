const form = document.querySelector('[data-form-parameters]');
const formCountry = document.querySelector('[data-form-country]');


const renderUsers = (users) => {
  const fragment = document.createDocumentFragment();
  const templateUser = document.querySelector('[data-template-users]').content;
  const container = document.querySelector('[data-catalog]');
  const templateTransport = document.querySelector('[data-template-transport]').content;
  const templateContry = document.querySelector('[data-template-contry]').content;

  container.innerHTML = '';

  users.forEach((user) => {
    const userItem = templateUser.cloneNode(true);

    userItem.querySelector('[data-user-name]').classList.add(`card__title--${user.status}`);
    userItem.querySelector('[data-user-name] a').textContent = user.name;
    userItem.querySelector('[data-user-hashtags]').textContent = user.listHashtags.map((hashtag) => `#${hashtag}`).join(' ');

    userItem.querySelector('[data-user-img]').src = `img/content/users/${user.img}.jpg`;
    userItem.querySelector('[data-user-img]').srcset = `img/content/users/${user.img}@2x.jpg 2x`;
    userItem.querySelector('[data-user-img]').alt = `На фото ${user.name}`;

    userItem.querySelector('[data-user-like]').textContent = user.likesCounter;

    userItem.querySelector('[data-user-level] > .card__level-count').textContent = user.level;
    userItem.querySelector('[data-user-level] > svg > circle').style = `stroke-dashoffset: calc(3.14159 * 30 * 2 * (1 - ${user.level} / 100));`;

    userItem.querySelector('[data-user-countries]').append(...user.listCountries.map((country) => {
      const [key, value] = Object.entries(country)[0];
      const item = templateContry.cloneNode(true);

      item.querySelector('[data-template-contry-text]').textContent = value;
      item.querySelector('img').src = `img/content/flags/${key}.png`;
      item.querySelector('img').srcset = `img/content/flags/${key}@2x.png 2x`;
      item.querySelector('img').alt = `Флаг ${value}`;
      item.querySelector('source').srcset = `img/content/flags/${key}.webp 1x, img/content/flags/${key}@2x.webp 2x`;

      return item;
    }));

    (Object.entries(user.transport).map(([key, value]) => {
      const item = templateTransport.cloneNode(true);

      if (value.isActive) {
        item.querySelector('li').classList.add('is-active');
      }

      item.querySelector('li').setAttribute('data-title', value.title);
      item.querySelector('use').setAttribute('xlink:href', `img/sprite.svg#${key}`);
      userItem.querySelector('[data-user-transport-list]').append(item);
    }));

    fragment.append(userItem);
  });

  container.append(fragment);
};

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


    renderUsers(filterUsers(users, getFormDataAsObject()));
  };

  form.addEventListener('submit', onSubmitForm);
};

export {initListUsers};

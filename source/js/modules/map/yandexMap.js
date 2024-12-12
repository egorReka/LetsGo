const loadYandexMap = () => {
  return new Promise((resolve, reject) => {

    if (window.ymaps) {
      resolve(window.ymaps);

      return;
    }

    const script = document.createElement('script');
    script.src = 'https://api-maps.yandex.ru/2.1/?apikey=80851667-986d-4dc3-af6b-6981a06bef60&lang=ru_RU';
    script.type = 'text/javascript';
    script.onload = () => resolve(window.ymaps);
    script.onerror = () => reject(new Error('Не удалось загрузить Яндекс.Карты'));

    document.head.appendChild(script);
  });
};

const initYandexMap = async () => {
  const mapContainer = document.querySelector('[data-map]');

  if (!mapContainer) {
    return
  };

  try {
    const ymaps = await loadYandexMap();

    ymaps.ready(() => {
      const map = new ymaps.Map(mapContainer, {
        center: [59.936206, 30.322871],
        zoom: 15.3,
        controls: [],
      });

      const customPin = new ymaps.Placemark([59.936655, 30.320826], {
        hintContent: 'Мы на карте',
      }, {
        iconLayout: 'default#image',
        iconImageHref: '../img/svg/pin.svg',
        iconImageSize: [56, 56],
        iconImageOffset: [-28, -28],
      });

      map.geoObjects.add(customPin);
    });
  } catch (err) {
    console.error('Ошибка загрузки или инициализации карты:', err);
  }
};

export {initYandexMap}

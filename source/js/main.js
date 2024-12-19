import Swiper, {Autoplay} from 'swiper';
import countries from './data/countries.json';

import {mobileVhFix} from './utils/mobile-vh-fix.js';
import {initModals} from './modules/modals/init-modals';
import {Form} from './modules/form-validate/form';
import {CustomSelect} from './modules/select/custom-select';
import {uploadFile, uploadImageDrop} from './modules/input-file/init-upload';
import {initToggleMenu} from './modules/menu/toggle-menu.js';
import {initDirectionsSwiper, destroyDirectionsSwiper} from './modules/directions/directions-swiper.js';
import {initYandexMap} from './modules/map/yandexMap.js';
import {createBreakpointChecker} from './utils/breakpoint-checker.js';
import {initFilter} from './modules/filter/filter-region.js';
import {initRangeSlider} from './modules/filter/range-slider.js';
import {initAnimations} from './animations/init-animations.js';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {

  // Utils
  // ---------------------------------

  mobileVhFix();

  // Modules
  // ---------------------------------

  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  window.addEventListener('load', () => {
    initToggleMenu();
    initYandexMap();
    initFilter(countries);
    initRangeSlider();
    initAnimations();

    createBreakpointChecker({
      mobileHandlers: [
        destroyDirectionsSwiper
      ],
      tabletHandlers: [
        () => initDirectionsSwiper(Swiper, Autoplay)
      ],
      desktopHandlers: [
        () => initDirectionsSwiper(Swiper, Autoplay)
      ],
    });

    initModals();
    uploadFile();
    uploadImageDrop();
    const select = new CustomSelect();
    select.init();
    const form = new Form();
    window.form = form;
    form.init();
  });
});

// ---------------------------------

// ❗❗❗ обязательно установите плагины eslint, stylelint, editorconfig в редактор кода.

// привязывайте js не на классы, а на дата атрибуты (data-validate)

// вместо модификаторов .block--active используем утилитарные классы
// .is-active || .is-open || .is-invalid и прочие (обязателен нейминг в два слова)
// .select.select--opened ❌ ---> [data-select].is-open ✅

// выносим все в дата атрибуты
// url до иконок пинов карты, настройки автопрокрутки слайдера, url к json и т.д.

// для адаптивного JS используейтся matchMedia и addListener
// const breakpoint = window.matchMedia(`(min-width:1024px)`);
// const breakpointChecker = () => {
//   if (breakpoint.matches) {
//   } else {
//   }
// };
// breakpoint.addListener(breakpointChecker);
// breakpointChecker();

// используйте .closest(el)

import { debounce } from '../../utils/debounce';

const toggleMenuEl = document.querySelector('[data-toggle-menu]');

const onclickToggleMenu = () => {
  toggleMenuEl.classList.toggle('is-active');
};

const initToggleMenu = () => {
  toggleMenuEl.addEventListener('click', debounce(onclickToggleMenu, 200));
};

export {initToggleMenu};

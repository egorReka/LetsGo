const toggleMenu = document.querySelector('[data-toggle-menu]');
const toggleContainer = document.querySelector('[data-nav]');

const openMenu = () => {
  toggleMenu.classList.add('is-active');
  document.body.classList.add('scroll-lock');
  document.addEventListener('keydown', onClickEscape);
  document.addEventListener('click', onClickOutside);
};

const closeMenu = () => {
  toggleMenu.classList.remove('is-active');
  document.body.classList.remove('scroll-lock');
  document.removeEventListener('keydown', onClickEscape);
  document.removeEventListener('click', onClickOutside);
};

function onClickOutside(evt) {
  if (!toggleContainer.contains(evt.target) && !toggleMenu.contains(evt.target)) {
    closeMenu();
  }
}

function onClickEscape(evt) {
  if (evt.key === 'Escape') {
    closeMenu();
  }
}

const onclickToggleMenu = () => {
  if (toggleMenu.classList.contains('is-active')) {
    closeMenu();
  } else {
    openMenu();
  }
};

const initToggleMenu = () => {
  if (!toggleMenu) {
    return;
  }

  toggleMenu.addEventListener('click', onclickToggleMenu);
};

const destroyToggleMenu = () => {
  if (!toggleMenu) {
    return;
  }

  toggleMenu.removeEventListener('click', onclickToggleMenu);
  closeMenu();
};

export {initToggleMenu, destroyToggleMenu};

let swiper = null;

function initDirectionsSwiper(Swiper) {
  if (swiper !== null) {
    return;
  }

  swiper = new Swiper('.directions-swiper', {
    // loop: true,
    direction: 'vertical',
    slidesPerView: 3,
    spaceBetween: 12,
  });
}

function destroyDirectionsSwiper() {
  if (swiper === null) {
    return;
  }

  swiper.destroy();
  swiper = null;
}

export {initDirectionsSwiper, destroyDirectionsSwiper};

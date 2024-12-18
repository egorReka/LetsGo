const directionsSwiper = document.querySelector('[data-directions-swiper]');

let swiper = null;

function initDirectionsSwiper(Swiper, Autoplay) {
  if (swiper !== null || !directionsSwiper) {
    return;
  }

  swiper = new Swiper(directionsSwiper, {
    modules: [Autoplay],
    loop: true,
    direction: 'vertical',
    slidesPerView: 3,
    spaceBetween: 12,
    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },
    breakpoints: {
      320: {
        spaceBetween: 0,
        slidesPerView: 'auto',
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 12,
      },
    },
  });
}

function destroyDirectionsSwiper() {
  if (swiper === null || !directionsSwiper) {
    return;
  }

  swiper.destroy();
  swiper = null;
}


export {initDirectionsSwiper, destroyDirectionsSwiper};

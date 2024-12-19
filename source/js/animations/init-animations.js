import {gsap} from '../vendor/gsap.min.js';
import {ScrollTrigger} from '../vendor/scroll-trigger.js';

const heroList = document.querySelector('[data-hero-list]');

gsap.registerPlugin(ScrollTrigger);

const animateListItems = (container) => {
  if (!container) {
    return;
  }

  const listItems = container.querySelectorAll('li');

  if (listItems.length === 0) {
    return;
  }

  gsap.from(listItems, {
    opacity: 0,
    x: -30,
    duration: 0.6,
    stagger: 0.3,
  });
};

const parallaxContainer = document.querySelector('[data-parallax-container]');
const parallaxImage = document.querySelector('[data-parallax-image]');

const animateParallaxImage = (image, container) => {
  if (!image || !container) {
    return;
  }

  gsap.from(image, {
    y: 200,
    ease: 'none',
    scrollTrigger: {
      trigger: container,
      start: 'top bottom',
      end: 'top top',
      scrub: true,
    },
  });
};

const initAnimations = () => {
  animateListItems(heroList);
  animateParallaxImage(parallaxImage, parallaxContainer);
};

export {initAnimations};

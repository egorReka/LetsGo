function deferredInitOnScroll(callback, scrollThreshold = 300) {
  let isInitialized = false;

  const onScroll = () => {
    if (window.scrollY >= scrollThreshold && !isInitialized) {
      isInitialized = true;
      window.removeEventListener('scroll', onScroll);
      callback();
    }
  };

  window.addEventListener('scroll', onScroll);
}

export {deferredInitOnScroll};

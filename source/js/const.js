const breakpoint = {
  mobile: window.matchMedia('(max-width: 767px)'),
  tablet: window.matchMedia('(min-width: 768px) and (max-width: 1023px)'),
  desktop: window.matchMedia('(min-width: 1024px)'),
};

export {breakpoint};

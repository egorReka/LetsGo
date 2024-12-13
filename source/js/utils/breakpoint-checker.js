import {breakpoint} from '../const.js';

let currentBreakpoint = '';

const callHandlers = (handlers = []) => {
  handlers.forEach((handler) => {
    if (typeof handler === 'function') {
      handler();
    }
  });
};

const createBreakpointChecker = ({mobileHandlers = [], tabletHandlers = [], desktopHandlers = []}) => {
  const breakpointChecker = () => {
    let newBreakpoint = '';

    if (breakpoint.desktop.matches) {
      newBreakpoint = 'desktop';
    } else if (breakpoint.tablet.matches) {
      newBreakpoint = 'tablet';
    } else if (breakpoint.mobile.matches) {
      newBreakpoint = 'mobile';
    }

    if (newBreakpoint !== currentBreakpoint) {
      currentBreakpoint = newBreakpoint;

      switch (newBreakpoint) {
        case 'desktop':
          callHandlers(desktopHandlers);
          break;
        case 'tablet':
          callHandlers(tabletHandlers);
          break;
        case 'mobile':
          callHandlers(mobileHandlers);
          break;
      }
    }
  };

  breakpoint.desktop.addEventListener('change', breakpointChecker);
  breakpoint.tablet.addEventListener('change', breakpointChecker);
  breakpoint.mobile.addEventListener('change', breakpointChecker);

  breakpointChecker();
};

export {createBreakpointChecker};

import tippy from '../../vendor/tippy.min';

const tooltips = document.querySelectorAll('[data-tooltip]');

const initTooltips = () => {
  if (tooltips.length === 0) {
    return;
  }

  tooltips.forEach((tooltip) => {
    tippy(tooltip, {
      content: tooltip.dataset.title,
      placement: 'bottom',
    });
  });
};

export {initTooltips};

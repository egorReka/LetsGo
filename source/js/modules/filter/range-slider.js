import noUiSlider from 'nouislider';

const rangesSlider = document.querySelector('[data-range-slider]');
const inputMin = document.querySelector('[data-input-min]');
const inputMax = document.querySelector('[data-input-max]');

const initRangeSlider = () => {
  if (!rangesSlider) {
    return;
  }

  noUiSlider.create(rangesSlider, {
    start: [30, 100],
    connect: true,
    range: {
      'min': 0,
      'max': 100,
    },
    handleAttributes: [
      {'aria-label': 'Минимальное значение'},
      {'aria-label': 'Максимальное значение'}
    ],
    step: 1,
  }
  );

  rangesSlider.noUiSlider.on('update', (values) => {
    inputMin.value = Math.round(values[0]);
    inputMax.value = Math.round(values[1]);
  });


  [inputMin, inputMax].forEach((input, index) => {
    input.addEventListener('change', () => {
      const values = rangesSlider.noUiSlider.get();
      const newValues = [...values];
      newValues[index] = input.value;

      rangesSlider.noUiSlider.set(newValues);
    });
  });

};

export {initRangeSlider};

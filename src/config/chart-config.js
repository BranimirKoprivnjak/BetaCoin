import { Chart } from 'chart.js';
import { formatNumber } from '../helpers/helpers';
import { colors } from './config';

Chart.defaults.font.family = 'Barlow';

export const chartOptions = {
  animation: false,
  // parsing: false,
  normalized: true,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
    tooltip: {
      caretSize: 0,
      displayColors: false, // removes color boxes
      titleFont: {
        weight: '600',
        // size: 12,
      },
      titleMarginBottom: 2,
      bodyFont: {
        weight: '600',
        // size: 12,
      },
      bodyColor: colors.GRAY.light,
      backgroundColor: colors.BLACK.black,
      callbacks: {
        title: context => `$ ${formatNumber(context[0].parsed.y)}`,
        label: context => context.label,
      },
    },
  },
  scales: {
    x: {
      display: false,
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 1,
      hitRadius: 7,
    },
  },
};

export const chartDetailedOptions = {
  // parsing: false,
  responsive: true,
  maintainAspectRatio: false,
  plugins: {
    tooltip: {
      caretSize: 0,
      yAlign: 'bottom',
      caretPadding: 100,
      displayColors: false, // removes color boxes
      titleFont: {
        weight: '600',
        // size: 12,
      },
      titleMarginBottom: 2,
      bodyFont: {
        weight: '600',
        // size: 12,
      },
      bodyColor: colors.GRAY.light,
      backgroundColor: colors.BLACK.black,
      callbacks: {
        title: context => `$ ${formatNumber(context[0].parsed.y)}`,
        label: context => context.label,
      },
    },
    legend: {
      display: false,
    },
    title: {
      display: false,
    },
  },
  scales: {
    x: {
      grid: {
        display: false,
        drawBorder: false,
      },
      ticks: {
        callback: function (val, index, ticks) {
          const len = ticks.length;
          if (
            index === Math.floor(len / 12) ||
            index === Math.floor(len / 4) ||
            index === Math.floor(len / 2.4) ||
            index === Math.floor(len / 1.7) ||
            index === Math.floor(len / 1.33) ||
            index === Math.floor(len / 1.09)
          )
            return this.getLabelForValue(val);
        },
        maxRotation: 0,
        color: colors.PURPLE.light,
        // crossAlign: 'far', CONTROLS VERTICALLY
        // align: 'end',
      },
    },
    y: {
      display: false,
    },
  },
  elements: {
    point: {
      radius: 0,
      pointHoverRadius: 4,
      pointHoverBorderWidth: 12,
      hitRadius: 7,
    },
  },
};

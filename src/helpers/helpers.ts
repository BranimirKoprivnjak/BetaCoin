import {
  colors,
  hourlyFormat,
  monthlyFormat,
  yearlyFormat,
} from '../config/config';
import { ChartArea } from 'chart.js';
import { Crypto } from '../models/redux/redux-models';

export const formatNumber = (num: number) => {
  const parts = num.toString().split('.');
  const fraction = !parts[1] ? '00' : parts[1];
  const integer = parts[0];
  const commaInt = integer.replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  const formattedNum = commaInt + '.';
  if (fraction === '00') return formattedNum + fraction;
  const range = Math.min(fraction.length, 6);
  for (let i = 0; i < range; i++) {
    if (i === range - 1) return formattedNum + fraction.slice(0, range);
    if (fraction[i] !== '0') return formattedNum + fraction.slice(0, i + 2);
  }
};

export const setColor = (value: string) => {
  return parseFloat(value) >= 0 ? colors.GREEN.base : colors.RED.base;
};

export const createColorGradient = (
  ctx: CanvasRenderingContext2D,
  area: ChartArea,
  color: string
) => {
  const gradient = ctx.createLinearGradient(0, area.bottom, 0, area.top);

  const gradientStartColor =
    color === colors.GREEN.base
      ? colors.GREEN.gradient.start
      : colors.RED.gradient.start;
  const gradientEndColor =
    color === colors.GREEN.base
      ? colors.GREEN.gradient.end
      : colors.RED.gradient.end;

  gradient.addColorStop(0, gradientStartColor);
  gradient.addColorStop(1, gradientEndColor);

  return gradient;
};

export const calc3dPriceChangePerc = (
  currentPrice: number,
  sparkline: number[]
) => {
  const price3daysAgo = sparkline[sparkline.length - 72];
  return ((currentPrice - price3daysAgo) / price3daysAgo) * 100;
};

export const prepareDataForDetailedChart = (
  prices: number[][],
  days: number | string
) => {
  // [date, price] => [{ x:date, y: price }]
  let decimatedData;
  if (days === 30) {
    decimatedData = prices.filter((_, idx) => idx % 2 === 0);
  } else if (days === 'max') {
    decimatedData = prices.filter((_, idx) => idx % 14 === 0);
  } else {
    decimatedData = prices;
  }

  const options =
    days === 1 ? hourlyFormat : days === 'max' ? yearlyFormat : monthlyFormat;

  const averagePrice =
    decimatedData.reduce((a, b) => a + b[1], 0) / decimatedData.length;
  const formattedData = [];
  // start with 2nd point to eliminate bug where 1st and last point lie on same x value
  for (let i = 1; i < decimatedData.length; i++) {
    const previousPoint = decimatedData[i - 1],
      currentPoint = decimatedData[i];
    const [previousPointDate, previousPointPrice] = previousPoint;
    const [currentPointDate, currentPointPrice] = currentPoint;
    if (
      (previousPointPrice < averagePrice && currentPointPrice > averagePrice) ||
      (previousPointPrice > averagePrice && currentPointPrice < averagePrice)
    ) {
      const newDate = Math.floor((previousPointDate + currentPointDate) / 2);
      formattedData.push({
        x: new Date(newDate).toLocaleString(undefined, options),
        y: averagePrice,
      });
    }
    formattedData.push({
      x: new Date(currentPointDate).toLocaleString(undefined, options),
      y: currentPointPrice,
    });
  }

  // https://bobbyhadz.com/blog/typescript-return-multiple-values-from-function
  return [formattedData, averagePrice] as const;
};

export const prepareDataForChart = (crypto: Crypto) => {
  // price => [{ x:date, y: price }]
  const { sparkline, currentPrice, lastUpdated } = crypto.data;
  const { selectedChange } = crypto.chart;
  const interval = selectedChange.interval;

  let decimatedData, step;
  if (interval === '7 days') {
    step = 7;
    decimatedData = sparkline.filter((_, idx) => idx % 7 === 0);
  } else if (interval === '3 days') {
    step = 3;
    decimatedData = sparkline
      .slice(sparkline.length - 72)
      .filter((_, idx) => idx % 3 === 0);
  } else {
    step = 1;
    decimatedData = sparkline.slice(sparkline.length - 24);
  }

  const formattedData = [];

  const options = step === 1 ? hourlyFormat : monthlyFormat;

  const currentDate = new Date();
  const latestFullHour =
    Date.now() -
    currentDate.getMilliseconds() -
    currentDate.getSeconds() * 1000 -
    currentDate.getMinutes() * 60 * 1000;
  const numOfMilisecondsInHour = 60 * 60 * 1000;

  let idx = 0;
  for (let i = 24 * step; i >= 1; i -= step) {
    const date = new Date(latestFullHour - numOfMilisecondsInHour * i);
    formattedData.push({
      x: date.toLocaleString(undefined, options),
      y: decimatedData[idx],
    });
    idx++;
  }

  formattedData.push({
    x: new Date(lastUpdated).toLocaleString(undefined, options),
    y: currentPrice,
  });

  return formattedData;
};

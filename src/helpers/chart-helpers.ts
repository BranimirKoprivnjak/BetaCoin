import { chartDetailedOptions } from '../config/chart-config';
import { colors } from '../config/config';
import { formatNumber } from './helpers';
import { Chart, ScriptableLineSegmentContext } from 'chart.js';
import { ChartDataPoint } from '../models/chart/chart-models';

export const getSegmentedLine = (averagePrice: number) => {
  return {
    borderColor: (ctx: ScriptableLineSegmentContext) => {
      const currentPoint = ctx.p1.parsed.y;
      const previousPoint = ctx.p0.parsed.y;
      const isIntersecting = currentPoint === averagePrice;

      if (previousPoint < currentPoint && isIntersecting)
        return colors.RED.base;
      if (previousPoint > currentPoint && isIntersecting)
        return colors.GREEN.base;
      if (currentPoint < averagePrice) return colors.RED.base;
      return colors.GREEN.base;
    },
  };
};

export const colorizePoints = (
  data: ChartDataPoint[],
  averagePrice: number
) => {
  const colorBackgroudPoints = data.map(item =>
    item.y < averagePrice ? colors.RED.base : colors.GREEN.base
  );
  const colorBorderPoints = data.map(item =>
    item.y < averagePrice ? colors.RED.opaque : colors.GREEN.opaque
  );
  chartDetailedOptions.elements!.point!.hoverBackgroundColor =
    colorBackgroudPoints;
  chartDetailedOptions.elements!.point!.hoverBorderColor = colorBorderPoints;
  chartDetailedOptions.elements!.point!.backgroundColor = colorBackgroudPoints;
  chartDetailedOptions.elements!.point!.borderColor = colorBorderPoints;
};

export const drawAnnotationLine = (averagePrice: number) => {
  chartDetailedOptions.plugins!.annotation = {
    annotations: {
      annotationLine: {
        type: 'line',
        borderColor: colors.GRAY.dark,
        borderDash: [4, 4],
        borderWidth: 1,
        label: {
          display: true,
          content: '$' + formatNumber(averagePrice),
          position: 'start',
          xAdjust: -7,
          font: {
            weight: '500',
            size: 11,
          },
          backgroundColor: colors.BLACK.black,
        },
        scaleID: 'y',
        value: averagePrice,
        // z: 99999,
      },
    },
  };
};

export const drawTooltipLine = () => {
  return {
    id: 'tooltipLine',
    beforeDraw: (chart: Chart) => {
      if (chart.tooltip!._active && chart.tooltip!._active.length) {
        const ctx = chart.ctx;
        ctx.save();
        const activePoint = chart.tooltip._active[0];
        const averagePrice =
          chart.config.options.plugins.annotation.annotations.annotationLine
            .value;
        ctx.beginPath();
        ctx.setLineDash([4, 4]);
        ctx.moveTo(activePoint.element.x, chart.chartArea.bottom);
        ctx.lineTo(activePoint.element.x, chart.tooltip!.y);
        ctx.lineWidth = 1;
        ctx.strokeStyle =
          activePoint.element.parsed.y < averagePrice
            ? colors.RED.base
            : colors.GREEN.base;
        ctx.stroke();
        ctx.restore();
      }
    },
  };
};

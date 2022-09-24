import { Line } from 'react-chartjs-2';
import { useRef, useState, useEffect } from 'react';
import { chartOptions } from '../../config/chart-config';
import {
  createColorGradient,
  prepareDataForChart,
  setColor,
} from '../../helpers/helpers';
import * as classes from './LineChart.module.css';

import '../../config/chart-registrables';
import { Crypto } from '../../models/redux/redux-models';
import { Chart, ChartData } from 'chart.js';
import { ChartDataPoint } from '../../models/chart/chart-models';

const LineChart = ({ crypto }: { crypto: Crypto }) => {
  const [chartData, setChartData] = useState<
    ChartData<'line', ChartDataPoint[]>
  >({
    datasets: [],
  });
  const chartRef = useRef<Chart<'line', ChartDataPoint[]> | null>(null);

  const selectedChange = crypto.chart.selectedChange;

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const formattedData = prepareDataForChart(crypto);
    const color = setColor(selectedChange.value.toString());

    const chartData = {
      datasets: [
        {
          data: formattedData,
          borderColor: color,
          fill: true,
          backgroundColor: createColorGradient(
            chart.ctx,
            chart.chartArea,
            color
          ),
        },
      ],
    };

    setChartData(chartData);
  }, [crypto]);

  return (
    <div className={classes.container}>
      <Line ref={chartRef} options={chartOptions} data={chartData} />
    </div>
  );
};

export default LineChart;

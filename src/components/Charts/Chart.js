import { Line } from 'react-chartjs-2';
import { useRef, useState, useEffect } from 'react';
import { chartOptions } from '../../config/chart-config';
import {
  createColorGradient,
  prepareDataForChart,
  setColor,
} from '../../helpers/helpers';
import classes from './Chart.module.css';

import '../../config/chart-registrables';

const Chart = props => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = useRef(null);

  const { crypto } = props;
  const selectedChange = crypto.chart.selectedChange;

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const formattedData = prepareDataForChart(crypto);
    const color = setColor(selectedChange.value);

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

export default Chart;

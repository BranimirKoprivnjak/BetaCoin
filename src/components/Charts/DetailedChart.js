import { Line } from 'react-chartjs-2';
import classes from './DetailedChart.module.css';
import { useRef, useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import {
  formatNumber,
  prepareDataForDetailedChart,
} from '../../helpers/helpers';
import { chartDetailedOptions } from '../../config/chart-config';

import { Chart as ChartJS } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import useHttp from '../../hooks/use-http';
import {
  colorizePoints,
  getSegmentedLine,
  drawAnnotationLine,
  drawTooltipLine,
} from '../../helpers/chart-helpers';

ChartJS.register(annotationPlugin);

const DetailedChart = props => {
  const [chartData, setChartData] = useState({
    datasets: [],
  });
  const chartRef = useRef(null);
  const cryptos = useSelector(state => state.cryptos.cryptoList);

  const { isLoading, error, sendRequest, hasMore } = useHttp();

  const crypto = cryptos.find(crypto => crypto.id === props.id);
  const days = crypto.detailedChart.interval.days;
  const interval = days === 90 ? 'daily' : '';

  const plugins = [];

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const handleData = data => {
      const [formattedData, averagePrice] = prepareDataForDetailedChart(
        data.prices,
        days
      );

      const chartData = {
        datasets: [
          {
            data: formattedData,
            segment: getSegmentedLine(averagePrice),
            // fill: true,
            // backgroundColor: createGradient()
          },
        ],
      };

      colorizePoints(formattedData, averagePrice);
      drawAnnotationLine(averagePrice);
      plugins.push(drawTooltipLine());

      setChartData(chartData);
    };

    sendRequest(
      {
        url: `https://api.coingecko.com/api/v3/coins/${props.id}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
      },
      handleData
    );
  }, [sendRequest, days]);

  return (
    <div className={classes.container}>
      <Line
        ref={chartRef}
        options={chartDetailedOptions}
        data={chartData}
        plugins={plugins}
      />
    </div>
  );
};

export default DetailedChart;

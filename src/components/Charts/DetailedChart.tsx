import { Line } from 'react-chartjs-2';
import * as classes from './DetailedChart.module.css';
import { useRef, useState, useEffect } from 'react';
import { useCustomSelector } from '../../hooks/use-redux';
import { prepareDataForDetailedChart } from '../../helpers/helpers';
import { chartDetailedOptions } from '../../config/chart-config';

import { Chart as ChartJS, ChartData, Plugin } from 'chart.js';
import annotationPlugin from 'chartjs-plugin-annotation';
import useHttp from '../../hooks/use-http';
import {
  colorizePoints,
  getSegmentedLine,
  drawAnnotationLine,
  drawTooltipLine,
} from '../../helpers/chart-helpers';
import { ChartDataPoint } from '../../models/chart/chart-models';
import { colors } from '../../config/config';

ChartJS.register(annotationPlugin);

const DetailedChart = ({ id }: { id: string }) => {
  const [chartData, setChartData] = useState<
    ChartData<'line', ChartDataPoint[]> // Point from chartjs
  >({
    datasets: [],
  });
  const chartRef = useRef<ChartJS<'line', ChartDataPoint[]> | null>(null);
  const cryptos = useCustomSelector(state => state.cryptos.cryptoList);

  const controller = new AbortController();
  const signal = controller.signal;
  const { isLoading, error, sendRequest, hasMore } = useHttp();

  const crypto = cryptos.find(crypto => crypto.id === id);

  // refactor
  if (crypto === undefined)
    return <p>Error! .find method didn't found crypto</p>;

  const days = crypto.detailedChart.interval.days;
  const interval = days === '90' ? 'daily' : '';

  const plugins: Plugin[] = [];

  useEffect(() => {
    const chart = chartRef.current;

    if (!chart) return;

    const handleData = (data: any) => {
      const [formattedData, averagePrice] = prepareDataForDetailedChart(
        data.prices,
        days
      );

      const chartData = {
        datasets: [
          {
            data: formattedData,
            segment: getSegmentedLine(averagePrice),
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
        url: `https://api.coingecko.com/api/v3/coins/${id}/market_chart?vs_currency=usd&days=${days}&interval=${interval}`,
        signal,
      },
      handleData
    );

    return () => controller.abort();
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

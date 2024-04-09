import React from 'react';
import ChartComponent from './ChartComponent';

const Chart: React.FC = () => {
  const chartData = [30, 50, 40, 60, 90];
  const chartLabels = ['Red', 'Blue', 'Yellow', 'Green', 'Purple'];

  return (
    <div>
      <h1>Simple Chart Example</h1>
      <ChartComponent data={chartData} labels={chartLabels} />
    </div>
  );
};

export default Chart;

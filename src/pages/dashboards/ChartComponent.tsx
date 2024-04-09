import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration } from 'chart.js/auto'; // Import Chart.js

interface ChartComponentProps {
  data: number[];
  labels: string[];
}

const ChartComponent: React.FC<ChartComponentProps> = ({ data, labels }) => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart>();

  useEffect(() => {
    if (chartRef.current) {
      const ctx = chartRef.current.getContext('2d');

      if (ctx) {
        // Check if there's an existing chart instance
        if (chartInstance.current) {
          // Destroy the previous chart before creating a new one
          chartInstance.current.destroy();
        }

        // Create a new chart instance
        chartInstance.current = new Chart(ctx, createChartConfig(data, labels));
      }
    }

    // Clean up function to destroy the chart instance on component unmount
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [data, labels]);

  return <canvas ref={chartRef} />;
};

// Helper function to create chart configuration
const createChartConfig = (data: number[], labels: string[]): ChartConfiguration => {
  return {
    type: 'bar',
    data: {
      labels: labels,
      datasets: [
        {
          label: 'Chart Data',
          data: data,
          backgroundColor: 'rgba(54, 162, 235, 0.6)', // Example color
          borderColor: 'rgba(54, 162, 235, 1)', // Example border color
          borderWidth: 1,
        },
      ],
    },
    options: {
      scales: {
        y: {
          beginAtZero: true,
        },
      },
    },
  };
};

export default ChartComponent;

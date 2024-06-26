import React, { useEffect, useRef } from 'react';
import Chart, { ChartConfiguration, ChartTypeRegistry} from 'chart.js/auto';

interface ChartComponentProps {
  type: keyof ChartTypeRegistry;
  data: number[];
  labels: string[];
  labelcolor: string;
  legendDisplay: boolean;
  legendposition: 'top' | 'bottom' | 'left' | 'right';
  axiscolor: string;
  bgcolor: string[];
  bdcolor: string;
  bdwidth: number;
  indexAxis?: 'x' | 'y' | undefined;
}

const ChartComponent: React.FC<ChartComponentProps> = ({ type, data, labels, labelcolor, legendDisplay, legendposition, axiscolor, bgcolor, bdcolor, bdwidth, indexAxis}) => {
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
        chartInstance.current = new Chart(ctx, createChartConfig(type, data, labels, labelcolor, legendDisplay, legendposition, axiscolor, bgcolor, bdcolor, bdwidth, indexAxis));
      }
    }

    // Clean up function to destroy the chart instance on component unmount or when data/labels change
    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, [type, data, labels]); // Re-run effect when type, data, or labels change

    //Give value 'x' to indexAxis in case none was given
    if (indexAxis === undefined) {
      indexAxis = 'x';
    }

  return <canvas ref={chartRef} />;
};

// Helper function to create chart configuration
const createChartConfig = (type: keyof ChartTypeRegistry, data: number[], labels: string[], labelcolor: string, legendDisplay: boolean , legendposition: 'top' | 'bottom' | 'left' | 'right', axiscolor: string ,bgcolor: string[], bdcolor: string, bdwidth: number, indexAxis: 'x' | 'y' | undefined ): ChartConfiguration => {
  return {
    type: type,
    data: {
      labels: labels,
      datasets: [
        {
          type: type,
          data: data,
          label: labels[0],
          backgroundColor: bgcolor, // Example color
          borderColor: bdcolor, // Example border color
          borderWidth: bdwidth, // Example border width
        },
      ],
    },
    options: {
      indexAxis: indexAxis,
      scales: {
        x: {
          beginAtZero: true,
          ticks: {
            color: axiscolor,
          }
        },
        y: {
          beginAtZero: true,
          ticks: {
            color: axiscolor,
          }
        },
      },
      plugins: {
        legend: {
          labels: {
            color: labelcolor, // Example color
          },
          display: legendDisplay,
          position: legendposition,
        },
      }, 
    },
  };
};

export default ChartComponent;

import React, { useEffect, useRef, useState } from 'react';
import { Chart, registerables } from 'chart.js';
import 'chart.js/auto';

Chart.register(...registerables);

const RiskTrendChart = () => {
  const chartRef = useRef<HTMLCanvasElement>(null);
  const chartInstance = useRef<Chart | null>(null);
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    if (!chartRef.current) return;
    const ctx = chartRef.current.getContext('2d');
    if (!ctx) return;

    const labels = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug'];
    const highRiskData = [20, 25, 30, 22, 18, 28, 35, 30];
    const mediumRiskData = [45, 40, 50, 48, 55, 52, 45, 48];
    const lowRiskData = [35, 35, 20, 30, 27, 20, 20, 22];

    const riskColors = {
      high: '#7F56D9',
      medium: '#FDB022',
      low: '#12B76A',
    };
    const inactiveColor = '#D0D5DD';

    function createGradient(color: string) {
      const gradient = ctx.createLinearGradient(0, 0, 0, 250);
      const rgb = color.match(/\w\w/g)!.map(x => parseInt(x, 16));
      gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.35)`);
      gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);
      return gradient;
    }

    const gradients = {
      high: createGradient(riskColors.high),
      medium: createGradient(riskColors.medium),
      low: createGradient(riskColors.low),
    };

    if (chartInstance.current) {
      chartInstance.current.destroy();
    }

    chartInstance.current = new Chart(ctx, {
      type: 'line',
      data: {
        labels: labels,
        datasets: [
          {
            label: 'High',
            data: highRiskData,
            borderColor: riskColors.high,
            backgroundColor: gradients.high,
            fill: true,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0
          },
          {
            label: 'Medium',
            data: mediumRiskData,
            borderColor: inactiveColor,
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            borderDash: [5, 5]
          },
          {
            label: 'Low',
            data: lowRiskData,
            borderColor: inactiveColor,
            fill: false,
            tension: 0.4,
            borderWidth: 2,
            pointRadius: 0,
            borderDash: [5, 5]
          }
        ]
      },
      options: {
        responsive: true,
        maintainAspectRatio: false,
        interaction: { mode: 'index', intersect: false },
        plugins: { legend: { display: false } },
        scales: {
          y: {
            beginAtZero: true,
            border: { display: false },
            grid: { color: '#EAECF0', drawTicks: false },
            ticks: { display: false }
          },
          x: {
            border: { display: false },
            grid: { display: false },
            ticks: { color: '#475467', font: { size: 12, weight: 500 } }
          }
        }
      }
    });

    return () => {
      if (chartInstance.current) {
        chartInstance.current.destroy();
      }
    };
  }, []);

  useEffect(() => {
    if (!chartInstance.current) return;
    const chart = chartInstance.current;
    const datasetColors = ['#7F56D9', '#FDB022', '#12B76A'];
    const inactiveColor = '#D0D5DD';

    function createGradient(color: string) {
      if (!chart.ctx) return 'transparent';
      const gradient = chart.ctx.createLinearGradient(0, 0, 0, 250);
      const rgb = color.match(/\w\w/g)!.map(x => parseInt(x, 16));
      gradient.addColorStop(0, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0.35)`);
      gradient.addColorStop(1, `rgba(${rgb[0]}, ${rgb[1]}, ${rgb[2]}, 0)`);
      return gradient;
    }

    chart.data.datasets.forEach((dataset: any, index) => {
      if (index === activeIndex) {
        dataset.borderColor = datasetColors[index];
        dataset.backgroundColor = createGradient(datasetColors[index]);
        dataset.fill = true;
        dataset.borderDash = [];
      } else {
        dataset.borderColor = inactiveColor;
        dataset.backgroundColor = 'transparent';
        dataset.fill = false;
        dataset.borderDash = [5, 5];
      }
    });

    chart.update('none');
  }, [activeIndex]);

  const legendItems = [
    { label: 'High', color: '#7F56D9', type: 'dot' },
    { label: 'Medium', color: '#FDB022', type: 'dash' },
    { label: 'Low', color: '#12B76A', type: 'dash' }
  ];

  return (
    <div className="card">
      <div className="card-header">
        <div className="header-left">
          <h2 className="card-title">Risk Trend</h2>
          <div className="legend">
            {legendItems.map((item, index) => (
              <div
                key={item.label}
                className={`legend-item ${activeIndex === index ? 'active' : ''}`}
                onClick={() => setActiveIndex(index)}
              >
                <div
                  className={`legend-indicator ${item.type}`}
                  style={{ 
                    backgroundColor: activeIndex === index ? item.color : '#D0D5DD',
                  }}
                />
                <span>{item.label}</span>
              </div>
            ))}
          </div>
        </div>
        <div className="controls">
          <select id="time-select">
            <option value="30d">Last 30 Days</option>
            <option value="90d">Last 90 Days</option>
            <option value="all">All Time</option>
          </select>
        </div>
      </div>
      <div className="chart-container" style={{ height: '300px' }}>
        <canvas ref={chartRef}></canvas>
      </div>
    </div>
  );
};

export default RiskTrendChart;

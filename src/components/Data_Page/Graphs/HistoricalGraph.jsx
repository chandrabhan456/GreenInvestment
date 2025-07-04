import React from "react";
import ReactApexChart from "react-apexcharts";

const HistoricalGraph = ({ data }) => {
  // Transform to Apex format
  const seriesData = data.map(d => ({
    x: d.date,
    y: [d.open, d.high, d.low, d.close]
  }));

  const options = {
    chart: {
      type: "candlestick",
      height: 400,
      toolbar: { show: true }
    },
    title: {
      text: "",
      align: "left"
    },
    xaxis: {
      type: "datetime", // <-- Use "datetime"
      tickAmount: 5,
      labels: {
        datetimeUTC: false,
        format: 'yyyy-MM-dd'
      }
    },
    yaxis: {
      axisBorder: {
        show: true,
        color: '#ccc',
        width: 3,
        offsetX: 0,
        offsetY: 0
      },
      labels: {
        formatter: function (val) {
          return Math.round(val);
        }
      },
      tooltip: { enabled: true }
    }
  };

  return (
    <div>
      <ReactApexChart
        options={options}
        series={[{ data: seriesData }]}
        type="candlestick"
        height={400}
      />
    </div>
  );
};

export default HistoricalGraph;

import React from 'react';
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

const ForecastGraph = ({data}) => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="ds" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="yhat" stroke="#8884d8" dot={{ r: 0.1 }} activeDot={{ r: 8 }} name="Forecast" />
        <Line type="monotone" dataKey="yhat_upper" stroke="#82ca9d"dot={{ r: 0.1 }} activeDot={{ r: 8 }} name="Upper Bound" />
        <Line type="monotone" dataKey="yhat_lower" stroke="#ff7300" dot={{ r: 0.1 }} activeDot={{ r: 8 }} name="Lower Bound" />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ForecastGraph;

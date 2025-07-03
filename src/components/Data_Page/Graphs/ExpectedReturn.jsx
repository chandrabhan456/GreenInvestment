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

// Transform the data into an array of objects
const data = [
  { year: "2026", expectedReturn: 56.44399405077301 },
  { year: "2027", expectedReturn: 44.12985799013162 },
  { year: "2028", expectedReturn: 32.62703799050916 }
];

const ExpectedReturn = () => {
  return (
    <ResponsiveContainer width="100%" height={400}>
      <LineChart
        data={data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Line type="monotone" dataKey="expectedReturn" stroke="#8884d8" activeDot={{ r: 8 }} />
      </LineChart>
    </ResponsiveContainer>
  );
};

export default ExpectedReturn;

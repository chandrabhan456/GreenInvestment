import React from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer
} from 'recharts';

// Transform the consolidated_data into an array suitable for Recharts
const data1 = [
  { year: "2022", capitalAppreciation: 5.5911660536668535, dividendGrowth: 5.502 },
  { year: "2023", capitalAppreciation: -37.80208399379693, dividendGrowth: 5.906 },
  { year: "2024", capitalAppreciation: 21.143389601389696, dividendGrowth: 6.322 }
];

const BarGraph = (data) => {
    console.log('bar chart data',data.data)
  return (
    <ResponsiveContainer width="100%" height={400}>
      <BarChart
        data={data.data}
        margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
      >
        <XAxis dataKey="year" />
        <YAxis />
        <Tooltip />
        <Legend />
        <Bar dataKey="capitalAppreciation" fill="#8884d8" name="Capital Appreciation" />
        <Bar dataKey="dividendGrowth" fill="#ff7300" name="Dividend Growth" />
      </BarChart>
    </ResponsiveContainer>
  );
};

export default BarGraph;

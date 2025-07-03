import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [
  "#8884d8", "#0088fe", "#00c49f", "#ff7f50",
  "#ffbb28", "#ff444a", "#a0a0a0", "#d0ed57"
];

// Custom Tooltip to show value in %
const CustomTooltip = ({ active, payload }) => {
  if (active && payload && payload.length) {
    const value = payload[0].value;
    return (
      <div style={{
        background: "#fff",
        border: "1px solid #ccc",
        padding: "6px 10px",
        borderRadius: "4px"
      }}>
        <span>{payload[0].name}: </span>
        <span>{value}%</span>
      </div>
    );
  }
  return null;
};

// Custom Legend Component (scrollable if too many items)

const CustomLegend = ({ data }) => (
  <div
    style={{
      display: "flex",
      flexDirection: "column",
      gap: "6px",
      alignItems: "flex-start",
      maxHeight: "100px",      // If you want a scrollbar for legend
      overflowY: "auto",
      marginTop: "8px"
    }}
  >
    {data.map((entry, index) => (
      <div key={entry.name} style={{ display: "flex", alignItems: "center", fontSize: "13px" }}>
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: 2,
            backgroundColor: COLORS[index % COLORS.length],
            marginRight: 8,
          }}
        />
        <span>{entry.name}: {entry.value}</span>
      </div>
    ))}
  </div>
);


const DonutChart = ({ allocationValue = [] }) => {
  const pieData = allocationValue.map(item => {
    let val = item.value;
    if (typeof val === "string") {
      val = Number(val.replace('%', '').trim());
    }
    if (typeof val !== "number" || isNaN(val)) val = 0;
    return {
      name: item.name,
      value: val
    };
  });

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        width: 320,
        margin: "0 auto"
      }}
    >
      {/* Donut chart centered */}
      <ResponsiveContainer width="100%" height={150}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={60}
            innerRadius={30}
            cx="50%"
            cy="50%"
            fill="#8884d8"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip content={<CustomTooltip />} />
        </PieChart>
      </ResponsiveContainer>
      {/* Legend below, left-aligned */}
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
        <CustomLegend data={pieData} />
      </div>
    </div>
  );
};

export default DonutChart;

import React from "react";
import { ResponsiveContainer, PieChart, Pie, Cell, Tooltip } from "recharts";

const COLORS = [
  "#8884d8", "#0088fe", "#00c49f", "#ff7f50",
  "#ffbb28", "#ff444a", "#a0a0a0", "#d0ed57",
  "#90ee90", "#ffd700", "#40e0d0", "#ff69b4",
  "#cd5c5c", "#ffa07a", "#20b2aa", "#9370db"
];

const CustomLegend = ({ data }) => (
  <div
    style={{
      display: "flex",
      flexWrap: "wrap",
      alignItems: "flex-start",
      maxHeight: "112px", // 4 rows * 26px + gap
      overflowY: "auto",  // Shows scrollbar
      marginTop: "8px",
      paddingRight: "8px",
      width: "100%",
      gap: "6px 0"
    }}
  >
    {data.map((entry, index) => (
      <div
        key={entry.name}
        style={{
          display: "flex",
          alignItems: "center",
          fontSize: "13px",
          whiteSpace: "nowrap",
          width: "50%",
          marginBottom: "6px"
        }}
      >
        <span
          style={{
            display: "inline-block",
            width: 12,
            height: 12,
            borderRadius: 2,
            backgroundColor: COLORS[index % COLORS.length],
            marginRight: 8,
            flexShrink: 0
          }}
        />
        <span
          style={{
            overflow: "hidden",
            textOverflow: "ellipsis",
            whiteSpace: "nowrap",
            display: "inline-block",
            maxWidth: "98%",
            verticalAlign: "bottom"
          }}
          title={`${entry.name}: ${entry.value}`}
        >
          {entry.name}: {entry.value}
        </span>
      </div>
    ))}
  </div>
);

const PortfolioPieChart = ({ portfolioPieData = [] }) => {
  const pieData = portfolioPieData.map(item => {
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
        width: "100%",
      }}
    >
      <ResponsiveContainer width={150} height={150}>
        <PieChart>
          <Pie
            data={pieData}
            dataKey="value"
            outerRadius={60}
            fill="#8884d8"
          >
            {pieData.map((entry, index) => (
              <Cell
                key={`cell-${index}`}
                fill={COLORS[index % COLORS.length]}
              />
            ))}
          </Pie>
          <Tooltip />
        </PieChart>
      </ResponsiveContainer>
      <div style={{ width: "100%", display: "flex", justifyContent: "flex-start" }}>
        <CustomLegend data={pieData} />
      </div>
    </div>
  );
};

export default PortfolioPieChart;

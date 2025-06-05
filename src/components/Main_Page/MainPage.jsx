import React, { useState, useEffect } from "react";
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from "recharts";
import {  useStateContext } from "../../contexts/ContextProvider";
const TABS = ["Stocks", "ETFs", "Mutual Funds"];

const portfolioPieData = [
  { name: "Renewable Energy", value: 65 },
  { name: "Low-Carbon Businesses", value: 35 },
];

const COLORS = ["#2f855a", "#68d391"];
const newsItems = [
  "Green Investment Surges in 2023",
  "Renewable Energy Stocks Hit Record Highs",
  "Government Announces New Green Policies",
  "Sustainable Funds See Increased Interest",
  "Tech Innovations in Green Energy",
  "Global Summit on Climate Change Initiatives",
];
const ITEMS_PER_PAGE = 4;

const MainPage = () => {
   const {error,result,  isLoading} = useStateContext()
  const [activeTab, setActiveTab] = useState("Stocks");
  const [currentPage, setCurrentPage] = useState(1);
  const [stockData, setStockData] = useState([]);
 

  useEffect(() => {
    const apiResponse = `
      | Stock Name         | Sector              | Fundamental Analysis                                                                 | Technical Analysis                                                                 | Beta Value | Current Price | Summary                                                                 | Dividend | PE Ratio | All-Time High | Investment Type | Reason for Recommendation                                                                 | Allocation Strategy |
      |---------------------|---------------------|-------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------|------------|---------------|------------------------------------------------------------------------|----------|----------|---------------|-----------------|-----------------------------------------------------------------------------------------|---------------------|
      | Tesla Inc. (TSLA)  | Electric Vehicles   | Strong revenue growth, innovative technology, and leadership in EV market           | Currently trading near support levels, potential for breakout                     | 2.00       | $250          | Leader in EV market with strong growth potential                                    | No       | 70       | $414          | Stocks          | High growth potential in EV and renewable energy sector                                | 20%                 |
      | NextEra Energy (NEE)| Renewable Energy    | Consistent revenue growth, strong dividend yield, and focus on clean energy         | Trading near 52-week low, potential for recovery                                  | 0.85       | $70           | Largest producer of wind and solar energy in the U.S.                                | Yes      | 25       | $93           | Stocks          | Stable growth and strong commitment to renewable energy                               | 15%                 |
      | Enphase Energy (ENPH)| Solar Technology   | High revenue growth, innovative solar solutions, and strong market position         | Oversold conditions, potential for upward movement                                | 1.50       | $120          | Leader in solar microinverters and energy storage solutions                          | No       | 50       | $282          | Stocks          | High growth potential in solar energy technology                                     | 15%                 |
      | Brookfield Renewable Partners (BEP)| Renewable Energy | Strong dividend yield, diversified renewable energy portfolio, and global presence | Trading near support levels, potential for upward trend                           | 0.90       | $30           | Diversified renewable energy assets across hydro, wind, and solar                    | Yes      | 20       | $45           | Stocks          | Stable income and growth potential in renewable energy                               | 15%                 |
      | Plug Power Inc. (PLUG)| Hydrogen Energy   | High revenue growth, leadership in hydrogen fuel cell technology                    | Trading near 52-week low, potential for recovery                                  | 1.80       | $10           | Leader in hydrogen fuel cell technology                                              | No       | N/A      | $75           | Stocks          | High growth potential in hydrogen energy market                                      | 10%                 |
      | First Solar Inc. (FSLR)| Solar Energy     | Strong revenue growth, innovative solar panel technology, and market leadership     | Trading near resistance levels, potential for breakout                            | 1.10       | $180          | Leader in solar panel manufacturing                                                  | No       | 30       | $232          | Stocks          | High growth potential in solar energy manufacturing                                  | 10%                 |
      | SunPower Corporation (SPWR)| Solar Energy | High revenue growth, innovative solar solutions, and strong market position         | Oversold conditions, potential for upward movement                                | 1.40       | $15           | Leader in residential solar energy solutions                                         | No       | N/A      | $57           | Stocks          | High growth potential in residential solar energy market                             | 10%                 |
      | Ormat Technologies (ORA)| Geothermal Energy| Consistent revenue growth, strong dividend yield, and focus on geothermal energy    | Trading near support levels, potential for upward trend                           | 0.80       | $80           | Leader in geothermal energy solutions                                                | Yes      | 35       | $100          | Stocks          | Stable growth and strong commitment to geothermal energy                             | 5%                  |
    `;

    const parseApiResponse = (response) => {
      const dataLines = response.trim().split("\n").slice(2); // Skip the first two header lines
      const stocks = dataLines.map((line) => {
        const columns = line.split("|").map((col) => col.trim());
        return {
          name: columns[1],
          sector: columns[2],
          fundamental_analysis: columns[3],
          technical_analysis: columns[4],
          beta_value: parseFloat(columns[5]),
          current_price: columns[6],
          summary: columns[7],
          dividend: columns[8],
          pe_ratio: columns[9] === "N/A" ? null : parseInt(columns[9]),
          all_time_high: columns[10],
          investment_type: columns[11],
          reason_for_recommendation: columns[12],
          allocation_strategy: columns[13],
        };
      });
      return stocks;
    };

    const parsedData = parseApiResponse(apiResponse);
    setStockData(parsedData);
  }, []);
  const filteredData = stockData; // Update this logic based on tab later
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentStocks = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);
  console.log("stock data", stockData);
  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className="flex">
       {activeTab === 'Stocks' && <div className="w-1/2">
          <div className="flex border-b border-gray-300">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 transition-colors duration-300 ${
                  activeTab === tab
                    ? "bg-green-700 text-white border-t border-l border-r border-green-700 rounded-t-md"
                    : "bg-white text-green-700  border-r border-t border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          <div className="flex mt-4">
            <div className="">
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Left: Stocks List */}
                <div className="w-[206%] grid grid-cols-1 md:grid-cols-2 gap-4">
                  {currentStocks.map((stock, index) => (
                    <div
                      key={index}
                      className="bg-white p-4 shadow rounded min-h-[200px] flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex justify-between items-center mb-2">
                          <div>
                            {isLoading && <div>Loading... </div>}
                            {!isLoading && <h2 className="font-semibold text-lg">
                              {stock.name}
                            </h2>}
                          {/*  <p className="text-sm text-gray-500">
                              Renewable Energy
                            </p>*/}
                          </div>
                         {/* <div className="text-green-600 font-bold">
                            {stock.score}
                          </div>*/}
                        </div>
                        <div className="text-sm text-gray-600">
                          Sector: <strong> {stock.sector}</strong> 
                        </div>
                        <div className="text-sm text-gray-600">
                          Current market price: <strong> {stock.current_price}</strong> 
                        </div>
                        <div className="text-sm text-gray-600">
                          P/E ratio: <strong> {stock.pe_ratio}</strong> 
                        </div>
                        <div className="text-sm text-gray-600">
                          Divident:<strong> {stock.dividend}</strong> 
                        </div>
                        <div className="text-sm text-gray-600">
                          Beta: <strong> {stock.beta_value}</strong> 
                        </div>
                        <div className="text-sm text-gray-600">
                          All time high: <strong> {stock.all_time_high}</strong> 
                        </div>
                      </div>

                      {/* <div className="flex justify-center">
                        <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                          Add to Portfolio
                        </button>
                      </div> */}
                    </div>
                  ))}
                </div>

                {/* Right: Other Section */}
                <div className="w-1/2">
                  {/* Additional content can go here */}
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end items-center mt-6 space-x-2">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i}
                onClick={() => setCurrentPage(i + 1)}
                className={`px-3 py-1 justify-center rounded ${
                  currentPage === i + 1
                    ? "bg-green-700 text-white"
                    : "bg-gray-200"
                }`}
              >
                {i + 1}
              </button>
            ))}
            <button
              onClick={() => console.log("Historical Data Analysis Clicked")}
              className=" px-3 py-1 rounded bg-orange-400 text-white"
            >
              Historical Data Analysis
            </button>

            {/* Right: Portfolio Card */}
          </div>
        </div>}
         {activeTab != 'Stocks' && <div className="w-1/2">
          <div className="flex border-b border-gray-300">
            {TABS.map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 px-4 py-2 transition-colors duration-300 ${
                  activeTab === tab
                    ? "bg-green-700 text-white border-t border-l border-r border-green-700 rounded-t-md"
                    : "bg-white text-green-700  border-r border-t border-gray-200"
                }`}
              >
                {tab}
              </button>
            ))}
          </div>
          </div>}
        {/* Pagination */}

        <div className="bg-white w-[25%] p-4 shadow rounded ml-6">
          <h3 className="text-lg font-semibold mb-2">Your Portfolio</h3>
          <div className="text-center mb-4">
            {/* Donut Chart */}
            <div className="flex mt-6 justify-center items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={portfolioPieData}
                    dataKey="value"
                    outerRadius={65}
                    innerRadius={20} // Create the donut effect
                    fill="#8884d8"
                  >
                    {portfolioPieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>

            {/* Pie Chart */}
            <div className="flex justify-center items-center">
              <ResponsiveContainer width={150} height={150}>
                <PieChart>
                  <Pie
                    data={portfolioPieData}
                    dataKey="value"
                    outerRadius={65} // Create the pie effect (no innerRadius)
                    fill="#8884d8"
                  >
                    {portfolioPieData.map((entry, index) => (
                      <Cell
                        key={`cell-${index}`}
                        fill={COLORS[index % COLORS.length]}
                      />
                    ))}
                  </Pie>
                  <Tooltip />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="text-sm text-gray-600 mb-4">
            Carbon footprint Score: <strong>56t</strong>
          </div>

          <button className="w-full bg-green-700 text-white py-2 rounded hover:bg-green-800">
            Create Portfolio
          </button>

          <div className="mt-4 text-sm text-gray-700">
            <p>✅ 65% Renewable Energy</p>
            <p>✅ 85% Low-Carbon Businesses</p>
          </div>
        </div>
        <div className="bg-white w-[25%] p-4 shadow rounded ml-6">
          <h3 className="text-lg font-semibold mb-3">Learn more</h3>
          <div className="flex flex-col items-center w-full">
            <button className="w-full h-20 border border-gray-300 text-left px-4 py-2 mb-3 rounded hover:bg-gray-100">
              What is ESG?
            </button>
            <button className="w-full h-20 border border-gray-300 text-left px-4 py-2 mb-3 rounded hover:bg-gray-100">
              How to read green score
            </button>
            <button className="w-full h-20 border border-gray-300 text-left px-4 py-2 mb-3 rounded hover:bg-gray-100">
              Green Investing vs real Impact
            </button>
            <button className="w-full h-20 border border-gray-300 text-left px-4 py-2 mb-3 rounded hover:bg-gray-100">
              Why Green Investing?
            </button>
            <button className="w-full h-20 border border-gray-300 text-left px-4 py-2 mb-3 rounded hover:bg-gray-100">
              News
            </button>
            <button className="w-full h-20 border border-gray-300 text-left px-4 py-2 rounded hover:bg-gray-100">
              More...
            </button>
          </div>
        </div>
      </div>
      <h2 className="text-xl ml-2" style={{marginTop:'-10px'}}>Related News</h2>
      <div className="flex  mt-0">
        {newsItems.map((item, index) => (
          <div
            key={index}
            className="flex  items-center w-1/6 p-4 m-2 border border-gray-300 rounded shadow"
          >
            <p className="text-center">{item}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MainPage;

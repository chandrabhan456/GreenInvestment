import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useStateContext } from "../../contexts/ContextProvider";
import HistoricalGraph from "./Graphs/HistoricalGraph";
import ForecastGraph from "./Graphs/ForecastGraph";
import ExpectedReturn from "./Graphs/ExpectedReturn";
import BarGraph from "./Graphs/BarGraph";
import ScanarioGraph from "./Graphs/ScanarioGraph";
const DROPDOWN_OPTIONS = [
  { label: "history_data_5_years", value: "5 year" },
  { label: "history_data_3_years", value: "3 year" },
  { label: "history_data_1_year", value: "1 year" },
  { label: "history_data_6_month", value: "6 month" },
  { label: "history_data_2_month", value: "2 month" },
];
const DROPDOWN_OPTIONS_Forecast = [
  { label: "forecast_5_years", value: "5 year" },
  { label: "forecast_3_years", value: "3 year" },
]

const DROPDOWN_OPTIONS_Consolidated = [
  { label: "consolidated_data_5_years", value: "5 year" },
  { label: "consolidated_data_3_years", value: "3 year" },
]
const Data_Page = () => {
  const {
    activeStock,
    stockResult1,
    setSecondPage,
    error,
    stockName,
    result,
    isLoading,
    budget1,
  } = useStateContext();
  const [activeTab, setActiveTab] = useState(activeStock);

  const [expandedSection, setExpandedSection] = useState(null);
  const activeStock1 = stockResult1.find((stock) => stock.name === activeTab);
  const [response, setResponse] = useState(false);
  const [barChartData, setBarChartData] = useState(null);
  const [historicalChartData, setHistoricalChartData] = useState(null);
  const [forecastChartData, setForecastChartData] = useState(null);
  const [returnChartData, setReturnChartData] = useState(null);
  const [scenario, setScenario] = useState("return");
  const [returnNewData, setReturnNewData] = useState(null);
  const [selectedHistorical, setSelectedHistorical] = useState("history_data_5_years");
  const [selectedForecast, setSelectedForecast] = useState("forecast_5_years");
  const [selectedBar, setSelectedBar] = useState("consolidated_data_5_years");
  useEffect(() => {
    // Define the function to fetch stock data

    const fetchStockData = async () => {
      
      const stockListString = stockName.join(",");
      const encodedStockList = encodeURIComponent(stockListString);
      setResponse(false);
      try {
        const response = await fetch(
          `http://127.0.0.1:8000/graphinput/${activeTab}`,
          {
            method: "POST",

            headers: {
              Accept: "application/json",

              "Content-Type": "application/x-www-form-urlencoded",
            },

            body: `recommended_list=${encodedStockList}`,
          }
        );

        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();

        setBarChartData(data.consolidated_data);
        setHistoricalChartData(data.historical_data);
        setForecastChartData(data.forecast_data);
        setReturnChartData(data.expected_returns);

        setResponse(true);
      } catch (error) {
        console.error("Error fetching stock data:", error);

        // Fallback data if the request fails

        setResponse(true);
      }
    };

    // Call the function to fetch stock data

    fetchStockData();

    // Cleanup function (optional, for cleaning up resources)

    return () => {
      // Any cleanup logic can go here
    };
  }, [activeTab]); // Dependency array with activeTab

  const sections = [
    {
      title: "Fundamentals Analysis",
      content: activeStock1 ? activeStock1.fundamental_analysis : "",
    },
    {
      title: "Technical Analysis",
      content: activeStock1 ? activeStock1.technical_analysis : "",
    },
    {
      title: "Reason for Recommendation",
      content: activeStock1 ? activeStock1.reason_for_recommendation : "",
    },
    { title: "Summary", content: activeStock1 ? activeStock1.summary : "" },
  ];
  async function handleChange(newScenario) {
    setScenario(newScenario);

    if (newScenario === "return") {
      setReturnChartData(returnChartData);
    } else {
      // Replace these with your actual values or state variables
      const ticker = activeStock1.name;
      const investment_budget = budget1;
      const allocation_strategy = activeStock1.allocation_strategy.replace(
        "%",
        ""
      ); // "15"
      const current_market_price = activeStock1.current_price;

      const url =
        `http://127.0.0.1:8000/calculate-forecast` +
        `?ticker=${encodeURIComponent(ticker)}` +
        `&investment_budget=${encodeURIComponent(investment_budget)}` +
        `&allocation_strategy=${encodeURIComponent(allocation_strategy)}` +
        `&current_market_price=${encodeURIComponent(current_market_price)}`;

      try {
        const response = await fetch(url, {
          method: "POST",
          headers: {
            accept: "application/json",
          },
          body: "", // empty body, as in your curl
        });
        const data = await response.json();
        setReturnNewData(data);
      } catch (error) {
        console.log("selected stock", activeStock1.name);
        setReturnNewData(null);
      }
    }
  }

  useEffect(() => {}, [returnChartData]);
  const toggleSection = (index) => {
    setExpandedSection(expandedSection === index ? null : index);
  };

  return (
    <div className="p-6 ml-[0%] bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div
        className="text-blue-500 mt-10 flex cursor-pointer"
        onClick={() => setSecondPage(false)}
      >
        <GoArrowLeft className="text-blue-500 mt-1" /> MainPage
      </div>
      <div className="flex mt-5">
        <div className="w-[96%]">
          <div className="flex border-b border-gray-300">
            {stockResult1.map((stock, index) => (
              <button
                key={stock.name}
                onClick={() => setActiveTab(stock.name)}
                className={`flex-1 px-4 py-2 transition-colors duration-300 ${
                  activeTab === stock.name
                    ? "bg-green-700 text-white border-t border-l border-r border-green-700 rounded-t-md"
                    : "bg-white text-green-700  border-r border-t border-gray-200"
                }`}
              >
                {stock.name}
              </button>
            ))}
          </div>
          {/* Graphs */}
          <div className="grid grid-cols-2 gap-4 mt-4">
            {/* Row 1 */}
            <div className="bg-white p-4 shadow-md ">
             <div className="flex items-center justify-between mb-2">
                <h3 className="flex-1 text-center ml-16 font-bold">
                  Historical Stock Price
                </h3>
                <select
                  className="ml-2 border rounded px-2 py-1"
                  value={selectedHistorical}
                  onChange={(e) => setSelectedHistorical(e.target.value)}
                >
                  {DROPDOWN_OPTIONS.map((opt) => (
                    <option key={opt.value} value={opt.label}>
                      {opt.value}
                    </option>
                  ))}
                </select>
              </div>
              {response && <HistoricalGraph data={historicalChartData} />}
              {!response && <div>Loading ...</div>}
            </div>
            <div className="bg-white p-4 shadow-md">
              <div className="flex items-center justify-between mb-2">
                <h3 className="flex-1 text-center ml-16 font-bold">
                  Forecast Stock Price
                </h3>
                <select
                  className="ml-2 border rounded px-2 py-1"
                  value={selectedForecast}
                  onChange={(e) => setSelectedForecast(e.target.value)}
                >
                  {DROPDOWN_OPTIONS_Forecast.map((opt) => (
                    <option key={opt.value} value={opt.label}>
                      {opt.value}
                    </option>
                  ))}
                </select>
              </div>
              {response && <ForecastGraph data={forecastChartData} />}
              {!response && <div>Loading ...</div>}
            </div>
            {/* Row 2 */}
            <div className="bg-white p-4 shadow-md">
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  marginBottom: "1rem",
                }}
              >
                <h3
                  style={{
                    textAlign: "center",
                    fontWeight: "bold",
                    marginBottom: "0.5rem",
                  }}
                >
                  Expected Return (Individual)
                </h3>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "1rem",
                  }}
                >
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="scenario"
                      value="return"
                      checked={scenario === "return"}
                      onChange={() => handleChange("return")}
                    />{" "}
                    Return
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="scenario"
                      value="scenario1"
                      checked={scenario === "scenario1"}
                      onChange={() => handleChange("scenario1")}
                    />{" "}
                    Scenario1
                  </label>
                  <label
                    style={{
                      display: "flex",
                      alignItems: "center",
                      gap: "0.25rem",
                    }}
                  >
                    <input
                      type="radio"
                      name="scenario"
                      value="scenario2"
                      checked={scenario === "scenario2"}
                      onChange={() => handleChange("scenario2")}
                    />{" "}
                    Scenario2
                  </label>
                </div>
              </div>

              <div>
                {/* ...your other UI... */}
                {scenario === "return" ? (
                  response ? (
                    <ExpectedReturn key="return" data={returnChartData} />
                  ) : (
                    <div>Loading ...</div>
                  )
                ) : scenario === "scenario1" ? (
                  returnNewData ? (
                    <ScanarioGraph
                      key="scenario1"
                      data={returnNewData.scenario_1}
                    />
                  ) : (
                    <div>Loading ...</div>
                  )
                ) : scenario === "scenario2" ? (
                  returnNewData ? (
                    <ScanarioGraph
                      key="scanario2"
                      data={returnNewData.scenario_2}
                    />
                  ) : (
                    <div>Loading ...</div>
                  )
                ) : (
                  <div>No scenario matched</div>
                )}
              </div>
            </div>
            <div className="bg-white p-4 shadow-md">
                <div className="flex items-center justify-between mb-2">
                <h3 className="flex-1 text-center ml-16 font-bold">
                  Consolidated Returns
                </h3>
                <select
                  className="ml-2 border rounded px-2 py-1"
                  value={selectedBar}
                  onChange={(e) => setSelectedBar(e.target.value)}
                >
                  {DROPDOWN_OPTIONS_Consolidated.map((opt) => (
                    <option key={opt.value} value={opt.label}>
                      {opt.value}
                    </option>
                  ))}
                </select>
              </div>
              
              {response && <BarGraph  data={barChartData[selectedBar]} />}
              {!response && <div>Loading ...</div>}
            </div>
          </div>
          {/* Expandable Sections */}
          <div className="mt-10">
            {sections.map((section, index) => (
              <div
                key={index}
                className="border border-gray-300 mb-2 cursor-pointer"
                onClick={() => toggleSection(index)}
              >
                <div className="p-4">
                  <h3>{section.title}</h3>
                  {expandedSection === index && (
                    <div className="mt-2 font-semibold">
                      <p>{section.content}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Data_Page;

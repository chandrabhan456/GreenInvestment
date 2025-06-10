import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { useStateContext } from "../../contexts/ContextProvider";
import HistoricalGraph from "./HistoricalGraph";
import ForecastGraph from "./ForecastGraph";
import ExpectedReturn from "./ExpectedReturn";
import BarGraph from "./BarGraph";

const Data_Page = () => {
  const { activeStock, stockResult1, setSecondPage, error, result, isLoading } =
    useStateContext();
  const [activeTab, setActiveTab] = useState(activeStock);

  const [expandedSection, setExpandedSection] = useState(null);
  const activeStock1 = stockResult1.find((stock) => stock.name === activeTab);
  const [response, setResponse] = useState(false);
  const [barChartData, setBarChartData] = useState(null);
   const [historicalChartData, setHistoricalChartData] = useState(null);
    const [forecastChartData, setForecastChartData] = useState(null);
     const [returnChartData, setreturnChartData] = useState(null);
  useEffect(() => {
    // Define the function to fetch stock data
    const fetchStockData = async () => {
      try {
        const response = await fetch(
          `https://api.example.com/stocks/${activeStock}`
        );
        const data = await response.json();
      } catch (error) {
        console.error("Error fetching stock data:", error);
        const data = [
          {
            year: "2022",
            capitalAppreciation: 5.5911660536668535,
            dividendGrowth: 5.502,
          },
          {
            year: "2023",
            capitalAppreciation: -37.80208399379693,
            dividendGrowth: 5.906,
          },
          {
            year: "2024",
            capitalAppreciation: 21.143389601389696,
            dividendGrowth: 6.322,
          },
        ];
        setBarChartData(data);
        setResponse(true);
      }
    };

    // Call the function to fetch stock data
    fetchStockData();

    // Cleanup function (optional, for cleaning up resources)
    return () => {
      // Any cleanup logic can go here
    };
  }, [activeTab]); // Dependency array with activeStock

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
              <h3 className="text-center mb-2 font-bold">
                Historical Stock Price (3 Yrs)
              </h3>
              {response && <HistoricalGraph />}
              {!response && <div>Loading ...</div>}
            </div>
            <div className="bg-white p-4 shadow-md">
              <h3 className="text-center mb-2 font-bold">
                Forecast Stock Price (3 Yrs)
              </h3>
              {response && <ForecastGraph />}
              {!response && <div>Loading ...</div>}
            </div>
            {/* Row 2 */}
            <div className="bg-white p-4 shadow-md">
              <h3 className="text-center mb-2 font-bold">
                Expected Return (Individual)
              </h3>
              {response && <ExpectedReturn />}
              {!response && <div>Loading ...</div>}
            </div>
            <div className="bg-white p-4 shadow-md">
              <h3 className="text-center mb-2 font-bold">
                Consolidated Return
              </h3>
              {response && <BarGraph data={barChartData}/>}
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

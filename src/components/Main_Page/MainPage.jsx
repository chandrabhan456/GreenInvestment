import React, { useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, ResponsiveContainer } from 'recharts';

const TABS = ['Stocks', 'ETFs', 'Mutual Funds'];

const stockData = [
  { name: 'Tesla Inc.', esg: '80 / 75', score: 68 },
  { name: 'First Solar, Inc.', esg: '63 / 74', score: 33 },
  { name: 'NextEra Energy, Inc.', esg: '76 / 66', score: 76 },
  { name: 'Vestas Wind Systems A/S', esg: '81 / 73', score: 37 },
  { name: 'Extra Stock 1', esg: '70 / 65', score: 45 },
  { name: 'Extra Stock 2', esg: '72 / 60', score: 55 },
];

const portfolioPieData = [
  { name: 'Renewable Energy', value: 65 },
  { name: 'Low-Carbon Businesses', value: 35 },
];

const COLORS = ['#2f855a', '#68d391'];
const newsItems = [
    'Green Investment Surges in 2023',
    'Renewable Energy Stocks Hit Record Highs',
    'Government Announces New Green Policies',
    'Sustainable Funds See Increased Interest',
    'Tech Innovations in Green Energy',
    'Global Summit on Climate Change Initiatives'
  ];
const ITEMS_PER_PAGE = 4;

const MainPage = () => {
  const [activeTab, setActiveTab] = useState('Stocks');
  const [currentPage, setCurrentPage] = useState(1);

  const filteredData = stockData; // Update this logic based on tab later
  const totalPages = Math.ceil(filteredData.length / ITEMS_PER_PAGE);
  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const currentStocks = filteredData.slice(startIndex, startIndex + ITEMS_PER_PAGE);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      {/* Tabs */}
      <div className='flex'>
      <div className="w-1/2">
        <div className="flex border-b border-gray-300">
          {TABS.map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex-1 px-4 py-2 transition-colors duration-300 ${
                activeTab === tab
                  ? 'bg-green-700 text-white border-t border-l border-r border-green-700 rounded-t-md'
                  : 'bg-white text-green-700  border-r border-t border-gray-200'
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
            className="bg-white p-4 shadow rounded min-h-[250px] flex flex-col justify-between"
          >
            <div>
              <div className="flex justify-between items-center mb-2">
                <div>
                  <h2 className="font-semibold text-lg">{stock.name}</h2>
                  <p className="text-sm text-gray-500">Renewable Energy</p>
                </div>
                <div className="text-green-600 font-bold">{stock.score}</div>
              </div>
              <div className="text-sm text-gray-600">ESG Score: {stock.esg}</div>
            </div>
            <div className="flex justify-center">
              <button className="bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800">
                Add to Portfolio
              </button>
            </div>
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
              currentPage === i + 1 ? 'bg-green-700 text-white' : 'bg-gray-200'
            }`}
          >
            {i + 1}
          </button>
        ))}
    <button
        onClick={() => console.log('Historical Data Analysis Clicked')}
        className=" px-3 py-1 rounded bg-orange-400 text-white"
      >
        Historical Data Analysis
      </button>


        {/* Right: Portfolio Card */}
    
      </div>
      </div>

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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
                <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
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
      <h2 className='text-xl ml-2'>Related News</h2>
       <div className="flex  mt-2">
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


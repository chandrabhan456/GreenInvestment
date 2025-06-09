import React, { useState } from 'react';
import { GoArrowLeft } from 'react-icons/go';
import { useStateContext } from '../../contexts/ContextProvider';

// Placeholder GraphComponent
const GraphComponent = ({ data }) => {
    return (
        <div className="w-full h-64 bg-gray-200 flex justify-center items-center">
            <p>Graph data: {JSON.stringify(data)}</p>
        </div>
    );
};

function Data_Page() {
    const { stockResult1, setSecondPage, error, result, isLoading } = useStateContext();
    const [activeTab, setActiveTab] = useState(stockResult1[0].name);
   
    const [expandedSection, setExpandedSection] = useState(null);
    const activeStock = stockResult1.find(stock => stock.name === activeTab);
    // Example data for graphs
    const data1 = [1, 2, 3, 4, 5]; // Replace with actual data
    const data2 = [5, 4, 3, 2, 1]; // Replace with actual data
    const data3 = [2, 3, 4, 5, 6]; // Replace with actual data
    const data4 = [6, 5, 4, 3, 2]; // Replace with actual data

    
const sections = [
    { title: 'Fundamentals Analysis', content: activeStock ? activeStock.fundamental_analysis : '' },
    { title: 'Technical Analysis', content: activeStock ? activeStock.technical_analysis : '' },
    { title: 'Reason for Recommendation', content: activeStock ? activeStock.reason_for_recommendation : '' },
    { title: 'Summary', content: activeStock ? activeStock.summary : '' },
];
    const toggleSection = (index) => {
        setExpandedSection(expandedSection === index ? null : index);
    };

    return (
        <div className="p-6 ml-[0%] bg-gray-100 min-h-screen">
            {/* Tabs */}
            <div className="text-blue-500 mt-10 flex cursor-pointer" onClick={() => setSecondPage(false)}>
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
                                        ? 'bg-green-700 text-white border-t border-l border-r border-green-700 rounded-t-md'
                                        : 'bg-white text-green-700  border-r border-t border-gray-200'
                                }`}
                            >
                                {stock.name}
                            </button>
                        ))}
                    </div>
                    {/* Graphs */}
                    <div className="grid grid-cols-2 gap-4 mt-10">
                        {/* Row 1 */}
                        <div className="bg-white p-4 shadow-md">
                            <h3 className="text-center mb-2">Historical Stock Price (3 Yrs)</h3>
                            <GraphComponent data={data1} />
                        </div>
                        <div className="bg-white p-4 shadow-md">
                            <h3 className="text-center mb-2">Forecast Stock Price (3 Yrs)</h3>
                            <GraphComponent data={data2} />
                        </div>
                        {/* Row 2 */}
                        <div className="bg-white p-4 shadow-md">
                            <h3 className="text-center mb-2">Expected Return (Individual)</h3>
                            <GraphComponent data={data3} />
                        </div>
                        <div className="bg-white p-4 shadow-md">
                            <h3 className="text-center mb-2">Consolidated Return</h3>
                            <GraphComponent data={data4} />
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
}

export default Data_Page;

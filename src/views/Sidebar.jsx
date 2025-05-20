import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { useStateContext } from "../contexts/ContextProvider";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import GreenInvestment from "../data/Investment.png";
import { RiUpload2Fill } from "react-icons/ri";
 const riskToleranceOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    // Add more options as needed
  ];
   const investmentTypeOptions = [
    { value: 'stocks', label: 'Stocks' },
    { value: 'bonds', label: 'Bonds' },
    { value: 'real-estate', label: 'Real Estate' },
    { value: 'mutual-funds', label: 'Mutual Funds' },
    { value: 'etfs', label: 'ETFs' },
    // Add more options as needed
  ];
const Sidebar = () => {
 
    // State to hold the input value
  const [investmentBudget, setInvestmentBudget] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

  // Handle changes to the input
  const handleChange = (event) => {
    setInvestmentBudget(event.target.value);
  };
    const [riskTolerance, setRiskTolerance] = useState(riskToleranceOptions[0].value);
     const [investmentType, setInvestmentType] = useState(investmentTypeOptions[0].value);

  // Dynamic options for the dropdown
   // State to hold the value of the slider
  const [timeHorizon, setTimeHorizon] = useState(1); // Starting with 1 year as default

  // Handle changes to the slider
  const handleChange2 = (event) => {
    setTimeHorizon(event.target.value);
  };

  // Handle changes to the dropdown
  const handleChange1 = (event) => {
    setRiskTolerance(event.target.value);
  };
    const handleChange3 = (event) => {
    setInvestmentType(event.target.value);
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      console.log('File selected:', file.name);
    }
  };
  const handleSubmit = () => {
    if (selectedFile) {
      console.log('Submitting file:', selectedFile.name);
      // Add logic to upload the file to a server or process it as needed
    } else {
      console.log('No file selected');
      // Handle the case where no file is selected
    }
  };
  return (
    <div className=" w-80 p-4  mt-1">
      {/* Add your image here */}
      <div style={{ textAlign: "center", marginTop: "5px" }}>
            <img
              src={GreenInvestment}
              alt="Agent Logo"
              style={{
                width: "75%",
                height: "145px",
                display: "block",
                margin: "0 auto",
              }}
            />
          </div>

   <div className="flex flex-col mb-4">
      <label htmlFor="investment-budget" className="text-lg font-semibold mb-2">
        Investment Budget*
      </label>
       <input
        type="text"
        id="investment-budget"
        name="investment-budget"
        value={investmentBudget}
        onChange={handleChange}
        className="border border-gray-300 rounded-md p-2 text-lg focus:outline-none focus:border-blue-500"
        placeholder=""
        required
      />
    </div>
     <div className="flex flex-col mb-4">
      <label htmlFor="risk-tolerance" className="text-lg font-semibold mb-2">
        Risk Tolerence*
      </label>
      <select
        id="risk-tolerance"
        name="risk-tolerance"
        value={riskTolerance}
        onChange={handleChange1}
        className="border border-gray-300 rounded-md p-2 text-lg focus:outline-none focus:border-blue-500"
        required
      >
        <option value="" disabled>Select your risk tolerance</option>
        {riskToleranceOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
    </div>
     <div className="flex flex-col mb-4">
      <label htmlFor="time-horizon" className="text-lg font-semibold mb-2">
        Time Horizon*
      </label>
      <input
        type="range"
        id="time-horizon"
        name="time-horizon"
        min="1"
        max="30"
        value={timeHorizon}
        onChange={handleChange2}
        className="slider"
      />
    
    </div>
  <div className="flex flex-col mb-4">
      <label htmlFor="investment-type" className="text-lg font-semibold mb-2">
        Investment Type*
      </label>
      <select
        id="investment-type"
        name="investment-type"
        value={investmentType}
        onChange={handleChange3}
        className="border border-gray-300 rounded-md p-2 text-lg focus:outline-none focus:border-blue-500"
        required
      >
        <option value="" disabled>Select your investment type</option>
        {investmentTypeOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
   
    </div>
    <div className="flex flex-col items-left mb-4">
      <label htmlFor="document-upload" className="text-lg font-semibold mb-2">
        Investment Document
      </label>
      <div className="relative border-2 border-blue-500 rounded-lg overflow-hidden cursor-pointer">
        <input
          type="file"
          id="document-upload"
          onChange={handleFileChange}
          className="absolute inset-0 opacity-0 cursor-pointer"
        />
        <div className="flex flex-col items-center justify-center p-4 bg-blue-200 hover:bg-blue-300 border border-dashed border-blue-500 ">
          <div className="text-blue-500">
           <RiUpload2Fill size={64} /> {/* Add the icon here */}
          </div>
          <span className="text-lg text-blue-700 font-semibold mt-2">Upload</span>
        </div>
      </div>
    </div>
   <div className="flex justify-center w-full ml-[33%]">
        <button
          onClick={handleSubmit}
          className="bg-blue-500 text-white font-bold py-2 px-4 rounded hover:bg-blue-600"
        >
          Submit
        </button>
      </div>
    </div>
  );
};

export default Sidebar;

import { React, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import {  useStateContext } from "../contexts/ContextProvider";
import "./Sidebar.css";
import { useNavigate, useLocation } from "react-router-dom";
import GreenInvestment from "../data/Investment.png";
import { RiUpload2Fill } from "react-icons/ri";
import { IoIosClose } from "react-icons/io";
 const riskToleranceOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
      { value: 'veryhigh', label: 'VeryHigh' },
    // Add more options as needed
  ];
  const investmentTypes = [
    'Stocks',
    'Bonds',
    'Real Estate',
    'Mutual Funds',
    'ETFs'
  ];
const Sidebar = () => {
  const {error,setError,setResult, setSidebarCurrentStep,isLoading, setIsLoading} = useStateContext()
    // State to hold the input value
  const [investmentBudget, setInvestmentBudget] = useState('');
    const [selectedFile, setSelectedFile] = useState(null);

  // Handle changes to the input
  const handleChange = (event) => {
    setInvestmentBudget(event.target.value);
  };
    const [riskTolerance, setRiskTolerance] = useState(riskToleranceOptions[0].value);
    const [selectedInvestmentTypes, setSelectedInvestmentTypes] = useState([]);

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
  
    if(event.target.value === 'bonds'){
      riskToleranceOptions.length = 0; // Clear existing array
    riskToleranceOptions.push(
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' }
    );
    }
    else{
       riskToleranceOptions.length = 0; // Clear existing array
    riskToleranceOptions.push(
      { value: 'low', label: 'Low' },
      { value: 'medium', label: 'Medium' },
         { value: 'high', label: 'High' },
      { value: 'veryhigh', label: 'VeryHigh' },
    );
    }
  };
  const handleCheckboxChange = (type) => {
    setSelectedInvestmentTypes(prevSelected => {
      if (prevSelected.includes(type)) {
        return prevSelected.filter(item => item !== type);
      } else {
        return [...prevSelected, type];
      }
    });
  };
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    setSelectedFile(file);
    if (file) {
      console.log('File selected:', file.name);
    }
  };
  const handlePdfRemove = () => {
    setSelectedFile(null)
  
    }
const handleSubmit = () => {
  // Create a new FormData object
  
  if (!selectedFile) {
setSidebarCurrentStep(1)
  const formData1 = new FormData();
  
  // Append the necessary fields to the FormData object
  formData1.append('Investment_Budget', investmentBudget);
  formData1.append('risk_tolerance', riskTolerance);
  formData1.append('time_horizon', `${timeHorizon} years`);
  formData1.append('investment_type', selectedInvestmentTypes);
  console.log(selectedInvestmentTypes)
  const queryParams = new URLSearchParams({
  Investment_Budget: investmentBudget,
  risk_tolerance: riskTolerance,
  time_horizon: `${timeHorizon} years`,
  investment_type: selectedInvestmentTypes,
  
});



  setResult('')

  // Set a 2-second timeout before proceeding with the API call
 setTimeout(() => {

  setSidebarCurrentStep(2);

  setIsLoading(true);

  // Proceed with the API call after a 2-second delay

  const url = `http://127.0.0.1:8000/inputwithoutupload/?${queryParams.toString()}`;
 
fetch(url, {
  method: 'POST',
})

    .then(response => {

      if (response.ok) {

        return response.json(); // Parse the JSON from the response

      }

      throw new Error('Network response was not ok');

    })

    .then(data => {

      // At this point, data is the resolved JSON object from the response

      console.log('testing 1', data); // Log the entire data object

      if (data.output) {

        console.log('testing 2', data.output);

        setResult(data.output);

        setSidebarCurrentStep(3);

        // Log the 'output' property if it exists

      } else {

        console.log("The 'output' property is not found in the response.");

      }

    })

    .catch(error => {

      console.error('An error occurred:', error);

    })

    .finally(() => {

      setIsLoading(false);

    });

}, 0);
  }
  else {setSidebarCurrentStep(1)
  const formData = new FormData();
  
  // Append the necessary fields to the FormData object
  formData.append('Investment_Budget', investmentBudget);
  formData.append('risk_tolerance', riskTolerance);
  formData.append('time_horizon', `${timeHorizon} years`);
  formData.append('investment_type', selectedInvestmentTypes);


  formData.append('file', selectedFile); // 'files' is the key used in the backend
  setResult('')

  // Set a 2-second timeout before proceeding with the API call
 setTimeout(() => {

  setSidebarCurrentStep(2);

  setIsLoading(true);

  // Proceed with the API call after a 2-second delay

  fetch('http://127.0.0.1:8000/inputwithupload/', {

    method: 'POST',

    body: formData,

  })

    .then(response => {

      if (response.ok) {

        return response.json(); // Parse the JSON from the response

      }

      throw new Error('Network response was not ok');

    })

    .then(data => {

      // At this point, data is the resolved JSON object from the response

      console.log('testing 1', data); // Log the entire data object

      if (data.output) {

        console.log('testing 2', data.output);

        setResult(data.output);

        setSidebarCurrentStep(3);

        // Log the 'output' property if it exists

      } else {

        console.log("The 'output' property is not found in the response.");
        setError("Response Error please try again!")
      }

    })

    .catch(error => {

      console.error('An error occurred:', error);
        setError('Please try again!')
    })

    .finally(() => {

      setIsLoading(false);

    });

}, 5000); // 5000 milliseconds = 5 seconds
  }
         
}

  return (
  <div className="w-80 bg-gray-200 p-4 mt-1 h-[90%] overflow-y-auto custom-scrollbar overflow-x-hidden">
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
   <div className="flex flex-col mb-4 ml-2">
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
      <div className="flex flex-col mb-4 ml-2">
      <label className="text-lg font-semibold mb-2">
        Select Investment Types
      </label>
      <div>
        {investmentTypes.map((type, index) => (
          <div key={index} className="flex items-center mb-2">
            <input
              type="checkbox"
              checked={selectedInvestmentTypes.includes(type)}
              onChange={() => handleCheckboxChange(type)}
              className="mr-2"
            />
            <span>{type}</span>
          </div>
        ))}
      </div>
    </div>

 
     <div className="flex flex-col mb-4 ml-2">
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
    
        {riskToleranceOptions.map((option, index) => (
          <option key={index} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
      
    </div>
       <div className="flex flex-col mb-4 ml-2">
      <label htmlFor="time-horizon" className="text-lg font-semibold mb-2">
        Time Horizon(years)*
      </label>
      <div className="flex items-center ">
      <input
        type="range"
        id="time-horizon"
        name="time-horizon"
        min="1"
        max="30"
        value={timeHorizon}
        onChange={handleChange2}
        className="slider w-[95%] bg-blue-300"
        style={{
        accentColor: '#1e3a8a', // Tailwind blue-800
      }}
      />
     <span className="ml-2 text-xl"> {timeHorizon}</span>
     </div>
    </div>
 
    <div className="flex flex-col items-left mb-4">
      <label htmlFor="document-upload" className="text-lg font-semibold mb-2 ml-2">
        Investment Document
      </label>
  <div className="relative border-2 w-[80%] mx-auto justify-between border-blue-500 rounded-lg overflow-hidden cursor-pointer">
  <input
    type="file"
    id="document-upload"
    onChange={handleFileChange}
    className="absolute inset-0 opacity-0 cursor-pointer"
  />
        <div className="flex flex-col items-center justify-center p-4 bg-blue-200 hover:bg-blue-300 border border-dashed border-blue-500 ">
          <div className=" text-blue-500">
           <RiUpload2Fill size={32} /> {/* Add the icon here */}
          </div>
          <span className="text-lg text-blue-700 font-semibold mt-2">Upload</span>
        </div>
        
      </div>
      {selectedFile &&
      <div className="flex ml-[10%]">
        
      <span className=" "  style={{
                 cursor: "pointer",
                 
            
                 overflow: "hidden", // Prevent overflowing text
                 whiteSpace: "nowrap", // Prevent wrapping to the next line
                 textOverflow: "ellipsis", // Add ellipsis for overflow
                 maxWidth: "80%", // Adjust the width as needed
               }}>{selectedFile.name}</span>
      {/* Remove File */}

        
      </div>
        }
    </div>
<div className="relative border-2 w-[80%] mx-auto justify-between  rounded-lg overflow-hidden cursor-pointer">
  <button
    onClick={handleSubmit}
    disabled={isLoading} // Disable the button if isLoading is true
    className={`w-full text-white font-bold py-2 px-4 rounded ${isLoading ? 'bg-gray-400 cursor-not-allowed border-gray-400' : 'bg-blue-500 hover:bg-blue-600 border-blue-500'}`}
  >
    Submit
  </button>
</div>



    </div>
  );
};

export default Sidebar;

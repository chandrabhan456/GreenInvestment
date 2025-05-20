import React, { useState } from "react";
import "./MainPage.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle, FaCheckCircle } from 'react-icons/fa';
import { FaDownload } from "react-icons/fa";
const MainPage = () => {
  // Define the current step within the function
  const currentStep = 1; // Example: "Processing" step
const [sidebarCurrentStep,setSidebarCurrentStep] = useState(0)
  const steps = [
     'Start', 
     'Processing' ,
    'Completed' 
  ];

  return (
    <div className="">
   <div className="flex">
  {/* Steps Section (80%) */}
  <div className="w-[80%] flex">
    {steps.map((step, index) => (
      <div key={index} className="flex flex-col relative">
        {/* Circle */}
        <div className="relative z-0 ml-24">
          {index < sidebarCurrentStep ? (
            <div className="rounded-full mt-9">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "0px solid #F7F8FB",
                  borderRadius: "50%",
                  position: "relative",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <FaRegCircle size={40} color="white" />
                <div
                  style={{
                    backgroundColor: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <FaCheckCircle size={40} color="green" className="text-3xl" />
                </div>
              </div>
            </div>
          ) : index === sidebarCurrentStep ? (
            <div className="rounded-full flex items-center justify-center mt-9">
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "0px solid #F7F8FB",
                  borderRadius: "50%",
                  position: "relative",
                  backgroundColor: "#f0f0f0",
                }}
              >
                <FaRegCircle size={40} color="white" />
                <div
                  style={{
                    backgroundColor: "white",
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                  }}
                >
                  <FaCheckCircle size={40} color="#1e3a8a" className="text-3xl" />
                </div>
              </div>
            </div>
          ) : (
            <div className="mt-9 ml-0.5">
              <FaRegCheckCircle className="text-gray-400" size={40} />
            </div>
          )}
        </div>

        {/* Connecting line (right side, except for last step) */}
        {index !== steps.length - 1 && (
          <div
            className="absolute top-1/2 items-center justify-center  w-[90%] h-1.5 bg-[#1e3a8a] z-0"
            style={{ marginLeft: '140px' }}
          ></div>
        )}

        {/* Step Name */}
        <div className="mt-3 ml-24 text-sm font-medium whitespace-nowrap">
          {step}
        </div>
      </div>
    ))}
  </div>

  {/* Remaining Section (20%) */}
  <div className="relative w-[20%] mt-7">
    {/* Your content for the 20% section goes here */}
    <div className="absolute right-64 flex flex-col items-center justify-center p-4 bg-gray-100 border" style={{width:"80px"}}>
  <div className="text-blue-400" style={{marginTop:'-10px',}}>
    <FaDownload size={64} /> {/* Add the icon here */}
  </div>

</div>
</div>
         </div>
      <div className="ml-10 mt-4 w-[95%] bg-white text-black main-content relative custom-border"></div>
 </div>




  )
};

export default MainPage;

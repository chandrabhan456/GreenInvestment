import React, { useState } from "react";
import "./MainPage.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { ContextProvider,useStateContext } from "../../contexts/ContextProvider";
import { marked } from 'marked';
const MainPage = () => {
  // Define the current step within the function
  const currentStep = 1; // Example: "Processing" step
  const {sidebarCurrentStep, setSidebarCurrentStep, result,isLoading} = useStateContext()
  const [fileName, setFileName] = useState('download.txt'); //download filename 
  const steps = ["Start", "Processing", "Completed"];
const htmlContent = marked(result);
const downloadFile = () => {
    // Convert the data to a Blob
    const blob = new Blob([result], { type: 'text/plain' });
    // Create a link element
    const link = document.createElement('a');
    // Set the href to a URL created from the Blob
    link.href = window.URL.createObjectURL(blob);
    // Set the custom file name
    link.download = fileName;
    // Append the link to the document body
    document.body.appendChild(link);
    // Programmatically click the link to trigger the download
    link.click();
    // Clean up the link element
    document.body.removeChild(link);
  };
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
                      <FaRegCircle size={50} color="white" />
                      <div
                        style={{
                          backgroundColor: "white",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <FaCheckCircle
                          size={50}
                          color="green"
                          className="text-3xl"
                        />
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
                      <FaRegCircle size={50} color="white" />
                      <div
                        style={{
                          backgroundColor: "white",
                          position: "absolute",
                          top: "50%",
                          left: "50%",
                          transform: "translate(-50%, -50%)",
                        }}
                      >
                        <FaCheckCircle
                          size={50}
                          color="#1e3a8a"
                          className="text-3xl"
                        />
                      </div>
                    </div>
                  </div>
                ) : (
                  <div className="mt-9 ">
                    <FaRegCheckCircle className="text-gray-400" size={50} />
                  </div>
                )}
              </div>

              {sidebarCurrentStep === 0 && index !== steps.length - 1 && (
                <div
                  className="absolute top-1/2 items-center justify-center  w-[90%] h-1.5 bg-[#1e3a8a] z-0"
                  style={{ marginLeft: "144.5px" }}
                ></div>
              )}
              {sidebarCurrentStep === 1 && index === 0 && (
                <>
                  <div
                    className="absolute top-1/2 items-center justify-center  h-1.5  z-0 background-line"
                    style={{ marginLeft: "144.5px" }}
                  ></div>
                  <div
                    className="absolute top-1/2 items-center justify-center  h-1.5  z-0 animated-line"
                    style={{ marginLeft: "144.5px" }}
                  ></div>
                </>
              )}
              {sidebarCurrentStep === 1 && index === 1 && (
                <>
                  <div
                    className="absolute top-1/2 items-center justify-center  h-1.5  z-0 background-line"
                    style={{ marginLeft: "144.5px" }}
                  ></div>
                </>
              )}
              {sidebarCurrentStep === 2 && index === 0 && (
                <>
                  <div
                    className="absolute top-1/2 items-center justify-center  h-1.5  z-0 green-line"
                    style={{ marginLeft: "144.5px" }}
                  ></div>
                </>
              )}
              {sidebarCurrentStep === 2 && index === 1 && (
                <>
                  <div
                    className="absolute top-1/2 items-center justify-center  h-1.5  z-0 background-line"
                    style={{ marginLeft: "144.5px" }}
                  ></div>
                  <div
                    className="absolute top-1/2 items-center justify-center  h-1.5  z-0 animated-line"
                    style={{ marginLeft: "144.5px" }}
                  ></div>
                </>
              )}
              {sidebarCurrentStep === 3 && index !== steps.length - 1 && (
                <div
                  className="absolute top-1/2 items-center justify-center  w-[90%] h-1.5 green-line z-0"
                  style={{ marginLeft: "144.5px" }}
                ></div>
              )}
              {/* Step Name */}
              <div className="mt-1 ml-24 text-xl font-medium whitespace-nowrap">
                {step}
              </div>
            </div>
          ))}
        </div>

        {/* Remaining Section (20%) */}
        <div className=" w-[20%] mt-7">
          {/* Your content for the 20% section goes here */}
          <div onClick={downloadFile} disabled={!result}
            className="right-64 flex flex-col items-center justify-center p-4 bg-gray-100 border"
            style={{ width: "80px" }}
          >
            <div className="text-blue-400" style={{ marginTop: "-10px" }}>
              <FaDownload size={64} /> {/* Add the icon here */}
            </div>
          </div>
        </div>
      </div>
      <div className="ml-10 mt-4 w-[95%] bg-white text-black main-content relative custom-border">
      {/* Inner div for HTML content with ml-5 mt-5 */}
          {isLoading && (
<div className="loading-container mt-10">
<span className="dot"></span>
<span className="dot ml-2"></span>
<span className="dot ml-2"></span>
</div>
)}
 
{!isLoading &&(<div className="ml-5 mt-5 overflow-auto max-h-[660px] custom-scrollbar">
        {/* Render the HTML content */}
<div dangerouslySetInnerHTML={{ __html: htmlContent }} />
</div>

)}
<style jsx>{`

  table {

    width: 100%;

    border-collapse: collapse;

  }

  th,

  td {

    border: 1px solid black;

    padding: 8px;

    text-align: left;

  }

  th {

    background-color: #f0f0f0;

  }

  /* Custom scrollbar styling */

  .custom-scrollbar::-webkit-scrollbar {

    width: 12px;

  }

  .custom-scrollbar::-webkit-scrollbar-track {

    background: #f0f0f0; /* Light grey background */

  }

  .custom-scrollbar::-webkit-scrollbar-thumb {

    background-color: #1e3a8a; /* Blue color */

    border-radius: 10px;

    border: 3px solid #f0f0f0; /* Adds spacing around thumb */

  }

`}</style>

 
</div>

    </div>
  );
};

export default MainPage;

import React, { useState } from "react";
import "./MainPage.css";
import { FaRegCheckCircle } from "react-icons/fa";
import { FaRegCircle, FaCheckCircle } from "react-icons/fa";
import { FaDownload } from "react-icons/fa";
import { ContextProvider,useStateContext } from "../../contexts/ContextProvider";
import { marked } from 'marked';
import download1 from "../../data/download1.png";
import { jsPDF } from 'jspdf';
import autoTable from 'jspdf-autotable';
const MainPage = () => {
  // Define the current step within the function

  const {error,setError,sidebarCurrentStep, setSidebarCurrentStep, result,isLoading} = useStateContext()
 
  const steps = ["Start", "Processing", "Completed"];
const htmlContent = marked(result);

const parseMarkdownTable = (markdown) => {

  const lines = markdown.split('\n').map(line => line.trim()).filter(line => line.length > 0);
 
  // Extract headers from the first line that starts with '|'

  const headersLineIndex = lines.findIndex(line => line.startsWith('|'));

  if (headersLineIndex === -1) {

    throw new Error('No table headers found');

  }

  const headers = lines[headersLineIndex].split('|').map(header => header.trim()).filter(header => header.length > 0);
 
  // Extract rows, starting from the line after the separator

  const separatorLineIndex = headersLineIndex + 1;

  const rows = [];
 
  for (let i = separatorLineIndex + 1; i < lines.length; i++) {

    const line = lines[i];

    if (line.startsWith('|')) {

      const row = line.split('|').map(cell => cell.trim()).filter(cell => cell.length > 0);

      if (row.length === headers.length) {

        rows.push(row);

      }

    } else {

      break; // Stop if line does not start with '|'

    }

  }
 
  return { headers, rows };

};

 
 
const downloadFile = () => {

  if (!result || typeof result !== 'string') {

    console.error("Invalid input string");

    return;

  }
 
  // Extract the table part from the output string

  const tableStart = result.indexOf('\n|');

  const tableEnd = result.lastIndexOf('\n|');

  if (tableStart === -1 || tableEnd === -1) {

    console.error("Table not found in the string");

    return;

  }
 
  const tableString = result.substring(tableStart, tableEnd + 1).trim();

  const summaryString = result.substring(tableEnd + 1).trim();
 
  // Parse the table data

  const { headers, rows } = parseMarkdownTable(tableString);
 
  // Create a new jsPDF instance

  const doc = new jsPDF();
 
  // Define static column widths
console.log(rows)
  const columnWidths = [15, 15, 26, 25, 15, 16, 30, 40]; // Adjust these as needed
 
  // Add the table to the PDF using autoTable

  autoTable(doc, {

    head: [headers],

    body: rows,

    startY: 10, // Start 10 units from the top

    columnStyles: {

      0: { cellWidth: columnWidths[0] },

      1: { cellWidth: columnWidths[1] },

      2: { cellWidth: columnWidths[2] },

      3: { cellWidth: columnWidths[3] },

      4: { cellWidth: columnWidths[4] },

      5: { cellWidth: columnWidths[5] },

      6: { cellWidth: columnWidths[6] },

      7: { cellWidth: columnWidths[7] },

    },

    headStyles: {

      fillColor: [173, 216, 230], // RGB for light blue

      textColor: [0, 0, 0], // Set text color to black for contrast

      fontStyle: 'bold', // Make header text bold

    },

  });
 
  // Add summary if it exists

  if (summaryString) {

    doc.text(`Summary: ${summaryString}`, 10, doc.lastAutoTable.finalY + 10);

  }
 
  // Save the PDF

  doc.save('Investment-Report.pdf');

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
  color={
    index === 2 ? (error === "" ? "#4AE54A" : "#FF0000") : index === 0 ? "#1e3a8a" : index === 1 ? "orange" : "#4AE54A"
  }
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
                    <FaRegCheckCircle className="text-gray-400 bg-white" size={50} />
                  </div>
                )}
              </div>

              {sidebarCurrentStep === 0 && index !== steps.length - 1 && (
                <div
                  className="absolute top-1/2 items-center justify-center  w-[90%]  background-line z-0"
                  style={{ marginLeft: "144.5px" }}
                ></div>
              )}
              {sidebarCurrentStep === 1 && index === 0 && (
                <>
                  <div
                    className="absolute top-1/2 items-center justify-center    z-0 background-line"
                    style={{ marginLeft: "144.5px" }}
                  ></div>
                  <div
                    className="absolute top-1/2 items-center justify-center  z-0 animated-line"
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
          <div onClick={downloadFile} 
            className=" flex flex-col items-center justify-center p-4 "
            style={{ width: "160px",marginLeft:'100px' }}
          >
            <div className="" style={{ marginTop: "-10px" }}>
           <img
              src={download1}
              alt="Agent Logo"
              style={{
                width:'100%',
                height: "75px",
                display: "block",
                margin: "0 auto",
              }}
            />
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
 {(!isLoading && error !='') &&(<div className="ml-5 mt-5 overflow-auto max-h-[660px] custom-scrollbar text-red-400">
 {error}
  </div>
 )}
{(!isLoading && error==='') &&(<div className="ml-5 mt-5 overflow-auto max-h-[660px] custom-scrollbar">
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

    background-color: #a0aec0; /* Blue color */

    border-radius: 10px;

    border: 3px solid #f0f0f0; /* Adds spacing around thumb */

  }

`}</style>

 
</div>

    </div>
  );
};

export default MainPage;

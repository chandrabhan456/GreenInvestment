import React,{useEffect,useState} from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar,  Sidebar,Chatbot} from './views';
import { useStateContext } from './contexts/ContextProvider';
import MainPage from './components/Main_Page/MainPage'
import nttlogo from './data/nttdatalogo.svg';
import { SiChatbot } from "react-icons/si";
import Login from "./views/Login";
import DataPage  from './components/Data_Page/Data_Page';
const App = () => {
  localStorage.setItem('OpenAI_Configuration',true)
  localStorage.removeItem("login");
  const {secondPage,mainPage,documentation,setDocumentation,login1,setlogin1,setChatbot,chatbot} = useStateContext();
 
 
 
  return (
<div >

<BrowserRouter >
  {!login1 ? (
    <Login />
  ) : (
    <div className="flex flex-col min-h-screen">
       <div className="fixed right-16 bottom-4" style={{ zIndex: '1000' }}>
           
            <button
               type="button"
  onClick={() => {
    console.log('Button clicked!');
    setChatbot(true);
  }}
               className='text-white text-2xl bg-slate-800 shadow-xl rounded-xl p-4'>AI Assistant</button>
              </div>
      {/* Navbar - Full Width at Top */}
      <div className="fixed top-0 left-0 w-full bg-black z-50 shadow-md custom-navbar">
        <Navbar />
      </div>

      {/* Sidebar & Content Container (Below Navbar) */}
      <div className="flex flex-row mt-12">
        {/* Sidebar - Fixed on Left */}
        {<div className="w-80 h-screen fixed left-0 top-12 bg-gray-900 ">
          <Sidebar />
        </div>}
           {chatbot && (<Chatbot />)}
     {/* Main Content - Takes Remaining Space */}
 <div className={`transition-all duration-300 w-full overflow-x-hidden ml-80 `}>
  
  <Routes>
 
   
      
        {!secondPage && <Route path="/" element={<MainPage />} />}
        {secondPage && (<>
         <Route path="/" element={<DataPage />} />
           <Route path="/data_Page" element={<DataPage />} />
           </>)}
     

    {/* Documentation routes */}
    
  </Routes>
</div>

      </div>
    </div>
  )}
</BrowserRouter>

</div>  )
}

export default App

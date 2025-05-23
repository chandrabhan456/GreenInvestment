import React,{useEffect,useState} from 'react'
import './App.css'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Navbar,  Sidebar} from './views';
import { useStateContext } from './contexts/ContextProvider';
import {MainPage, } from './components'
import nttlogo from './data/nttdatalogo.svg';
import Login from "./views/Login";
const App = () => {
  localStorage.setItem('OpenAI_Configuration',true)
  localStorage.removeItem("login");
  const {mainPage,documentation,setDocumentation,login1,setlogin1, } = useStateContext();

 
 
  return (
<div >

<BrowserRouter future={{ v7_startTransition: true,v7_relativeSplatPath:true }}>
  {!login1 ? (
    <Login />
  ) : (
    <div className="flex flex-col min-h-screen">
      {/* Navbar - Full Width at Top */}
      <div className="fixed top-0 left-0 w-full bg-white z-50 shadow-md custom-navbar">
        <Navbar />
      </div>

      {/* Sidebar & Content Container (Below Navbar) */}
      <div className="flex flex-row mt-12">
        {/* Sidebar - Fixed on Left */}
        {<div className="w-80 h-screen fixed left-0 top-12 bg-[#F7F8FB] ">
          <Sidebar />
        </div>}

     {/* Main Content - Takes Remaining Space */}
 <div className={`transition-all duration-300 w-full overflow-x-hidden ml-80`}>
  <Routes>
  {mainPage && (
      <>
      
        <Route path="/" element={<MainPage />} />
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

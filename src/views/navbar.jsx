import React, { useEffect, useState } from "react";

import avatar from "../data/user-profile2.png";
import { Link, NavLink, useNavigate, Navigate } from "react-router-dom";
import { Setting, OpenAI, UserProfile } from ".";
import { useStateContext } from "../contexts/ContextProvider";
import nttlogo from "../data/nttdatalogo.svg";

import { MdKeyboardArrowDown } from 'react-icons/md';
import { MdKeyboardArrowUp } from "react-icons/md";
import "./navbar.css";

const Navbar = () => {
  const {
    
    mainPage,
    setMainPage,
    initialState,
    handleClick,
    isClicked,
    
  } = useStateContext();
  console.log("ok", initialState, isClicked);
  const navigate = useNavigate();

  const handleClick1 = () => {
  
   
    setMainPage(true);
    navigate("/"); // Navigate to the home page
  };

  return (
    <div >
      <div className="flex justify-between md:mx-0  relative w-full dark:bg-black">
        <div className="flex">
          <img
            style={{ width: "250px", marginLeft: "-5px", marginTop: "-5px" }}
            className=""
            src={nttlogo}
            alt="nttlogo"
          />
          <div
            className="mt-1.9 text-3xl"
            onClick={handleClick1}
            style={{ cursor: "pointer" }}
          >
            Green Investment
          </div>
        </div>

        <div
          className={`relative inline-flex rounded-full h-2  ${
            mainPage ? "right-24 w-24" : "right-80 w-72"
          } top-1.5`}
        >
         
          <div
            style={{ marginLeft: "-30px" }}
            className="flex items-center justify-center mt-5 cursor-pointer"
            onClick={() => handleClick("userProfile")}
          >
            <img
              className="rounded-full ml-10 w-10 h-10 border border-gray-300 shadow-md"
              src={avatar}
              alt="user-profile"
            />
               <p className='whitespace-nowrap ml-1 text-xl flex mt-1'>
              <span className="text-black-400  text-black dark:text-white "  >Hi,</span>{' '}
              <span className="flex text-black-400 font-bold ml-1  text-black dark:text-white"  >
                Michael
              {!(isClicked.userProfile) &&  <MdKeyboardArrowDown className="dark:text-white text-black text-14 mt-2" />}
              {(isClicked.userProfile) &&  <MdKeyboardArrowUp className="dark:text-white text-black text-14 mt-2" onClick={() => handleClick('userProfile')}/>}
             
              </span>
            </p>
          </div>

          {mainPage && <Navigate replace={true} to="/" />}
          {/* {isClicked.setting && <Setting /> }  */}
          {isClicked.userProfile && <UserProfile />}
         
        </div>
      </div>
    </div>
  );
};

export default Navbar;

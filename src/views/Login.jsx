import React,{useState} from 'react';
import { emailValidator, passwordValidator } from './regexValidators';
import {Navigate, useNavigate} from "react-router-dom"
import { useStateContext } from "../contexts/ContextProvider";
import { FaEye, FaEyeSlash } from 'react-icons/fa'; // Import eye icons from react-icons
import Investment from "../data/Investment.png";

import Climate from "../data/Climate.png";
import datadriven from "../data/datadriven.png";
import Return1 from "../data/Return2.png";
import Input1 from "../data/Input1.png";
import Best1 from "../data/Best.png";
import Port1 from "../data/Portofolio.png";
import GreenInvestment from "../data/GreenInvestment.png";
import "./Login.css";
const Login = () => {
    const { login1, setlogin1,setMainPage } = useStateContext();
	 const [passwordVisible, setPasswordVisible] = useState(false);
  const [loginPage,setLoginPage] = useState(true)
  const [signPage,setSignPage] = useState(false)

  const togglePasswordVisibility = () => {
    setPasswordVisible(!passwordVisible);
  };
const handleSignUp = () => {
    setLoginPage(false)
    setSignPage(true)
    // You can add additional logic here, such as navigating to a sign-up page or opening a modal
  };
  const handleLoginUp = () => {
    setLoginPage(true)
    setSignPage(false)
    // You can add additional logic here, such as navigating to a sign-up page or opening a modal
  };
	const [input, setInput] = React.useState({ email: '', password: '' });

	const [errorMessage, seterrorMessage] = React.useState('');
	const [successMessage, setsuccessMessage] = React.useState('');
   const navigate = useNavigate();
	const handleChange = e => {
		setInput({ ...input, [e.target.name]: e.target.value });
		
	};
  console.log("vidhi",login1)
	
	const formSubmitter=(e) =>{
		
		e.preventDefault();
 
		
		setsuccessMessage('');
		if (!emailValidator(input.email)) return seterrorMessage('Please enter valid email id');

		if (!passwordValidator(input.password))
			return seterrorMessage(
				'Password should have minimum 8 character with the combination of uppercase, lowercase, numbers and specialcharaters'
			);
		// setsuccessMessage('Successfully Validated');
		if(input.email !== 'admin@a.com' || input.password !== 'Password@1') return seterrorMessage('Invalid email or password');

		localStorage.setItem('login','true');
        setMainPage(true)
        setlogin1(true)
       
        console.log("logged in")
	
       
	};
	
		
	return (
		
 <div className="login">
      {/* Top Bar */}
      <div className="top-bar">
        <div className="logo-placeholder">
          <img
              src={Investment}
              alt="Agent Logo"
              style={{
                width: "75%",
                height: "145px",
                display: "block",
                margin: "0 auto",
              }}
            />
        </div>
        <div className="nav-buttons mt-7">
          <button>Start Building Portfolio</button>
          <button>Learn More</button>
        </div>
     

      {/* Login Box */}
      <div className="login-container">
      {loginPage && 
       <div className="login-box">
          <span className='text-blue-500'>Sign In</span>
          <hr className="line mt-2 " />
          <form className='mt-3' onSubmit={formSubmitter}>
            <label htmlFor="username">User Name:</label>
           <input
        type="text"
        id="username"
        name="email"
        placeholder="Enter your username"
        onChange={handleChange}
        className="text-input1"
         autoComplete='current-password'
      />
<div className="input-group mt-2" style={{ position: 'relative' }}>
            <label htmlFor="password">Password:</label>
            <input
        type={passwordVisible ? 'text' : 'password'}
        id="password"
        name="password"
        placeholder="Enter your password"
        onChange={handleChange}
        className="text-input1"
        autoComplete='current-password'
        style={{ paddingRight: '30px' }} // Add padding to accommodate the icon
      />
         <span
  onClick={togglePasswordVisibility}
  className="absolute right-2 mt-3 cursor-pointer text-xl text-black"
>
  {passwordVisible ? <FaEyeSlash /> : <FaEye />}
</span>
</div>
            <button type="submit" className="btn-login">Sign In</button>

            <div className="forgot">
              <a href="#">Forgot Password?</a>
            </div>
          </form>
            <hr className="line mt-2 " />
          <div className="signup-section">
          
            <button className="btn-signup" onClick={handleSignUp}>
        Sign Up
      </button>
          </div>
        </div>}
        {signPage && 
               <div className="login-box">
          <span className='text-blue-500'>Sign Up</span>
          <hr className="line mt-2 " />
          <form className='mt-3' >
            <label htmlFor="username"> Name:</label>
           <input
        type="text"
        id="username"
        name="email"
       
        className="text-input1"
         autoComplete='current-password'
      />
       <label htmlFor="username"> Email:</label>
           <input
        type="text"
        id="username"
        name="email"
        
        className="text-input1"
         autoComplete='current-password'
      />
       <label htmlFor="username"> Password:</label>
           <input
        type="text"
        id="username"
        name="email"
        
       
        className="text-input1"
         autoComplete='current-password'
      />
<div className="input-group mt-2" style={{ position: 'relative' }}>
            <label htmlFor="password">Confirm Password:</label>
            <input
       
        id="password"
        name="password"
        className="text-input1"
        autoComplete='current-password'
        style={{ paddingRight: '30px' }} // Add padding to accommodate the icon
      />
       
</div>
            <button type="submit" className="btn-signup">Sign Up</button>

           
          </form>
            <hr className="line mt-4 " />
          <div className="signup-section">
          
            <button className="btn-login" onClick={handleLoginUp}>
        Sign In
      </button>
          </div>
        </div>}
      </div>
 </div>
 <div className='text-box1'>
 <div className='text-box text-white text-3xl'>
 <div>Invest in a</div>
  <div>Greener Future</div>
 </div>
  <div className='text-box text-white text-xl whitespace-nowrap '>
 <div>Build a smart, sustainable</div>
  <div>portofolio with eco-conscious</div>
  <div>stocks, ETF's and Mutual funds</div>
 </div>
 </div>
    <div className='centered text-white'>
       <img
              src={GreenInvestment}
              alt="Agent Logo"
              style={{
                width: "45%",
                height: "225px",
                display: "block",
                margin: "0 auto",
              }}
            />
    </div>
   <div className="container-wrapper">
    <div className="container">
       <img
              src={Climate}
              alt="Agent Logo"
              style={{
                width: "45%",
                height: "65px",
                display: "block",
                margin: "0 auto",
              }}
            />
        <p className='text-orange-600 text-xl text-centre' style={{marginTop:'-10px',color:'orange',fontSize:'18px',whiteSpace:'nowrap'}}>Fight climate change</p>
        <div className='text-white text-sm text-centre' style={{marginTop:'-10px'}}>Support low carban and</div>
        <div className='text-white text-sm text-centre' style={{marginTop:'0px'}}>Sustainable companies</div>
        
    </div>
    <div className="container">
      
        <img
              src={Return1}
              alt="Agent Logo"
              style={{
                width: "35%",
                height: "65px",
                display: "block",
                margin: "0 auto",
              }}
              
            />
        <p className='text-orange-600 text-xl text-centre' style={{marginTop:'-10px',color:'orange',fontSize:'18px',whiteSpace:'nowrap'}}>Smart Returns</p>
        <div className='text-white text-sm text-centre whitespace-nowrap' style={{marginTop:'-10px'}}>ESG comapnies often outperform</div>
        <div className='text-white text-sm text-centre' style={{marginTop:'0px'}}>In long term</div>
        
    </div>
    <div className="container">
      
        <img
              src={datadriven}
              alt="Agent Logo"
              style={{
                width: "35%",
                height: "63px",
                display: "block",
                margin: "0 auto",
              }}
            />
        <p className='text-orange-600 text-xl text-centre' style={{marginTop:'-10px',color:'orange',fontSize:'18px',whiteSpace:'nowrap'}}>Data Driven</p>
        <div className='text-white text-sm text-centre' style={{marginTop:'-10px'}}>Backend by ESG scores, Emissions</div>
        <div className='text-white text-sm text-centre' style={{marginTop:'0px'}}>data and green impact metrices</div>
        
    </div>
    <div className="container">
         <img
              src={Input1}
              alt="Agent Logo"
              style={{
                width: "35%",
                height: "75px",
                display: "block",
                margin: "0 auto",
              }}
              
            />
        <div className='text-white text-xl text-center' style={{marginTop:'-10px'}}>Input your goals</div>
    </div>
    <div className="container">
     
       <img
              src={Best1}
              alt="Agent Logo"
              style={{
                width: "50%",
                height: "75px",
                display: "block",
                margin: "0 auto",
              }}
              
            />
         <div className='text-white text-xl text-centre' style={{marginTop:'-10px'}}>We analyze 1000+</div>
        <div className='text-white text-xl text-centre' style={{marginTop:'0px'}}>Companies and funds</div>
      
    </div>
    <div className="container">
      
         <img
              src={Port1}
              alt="Agent Logo"
              style={{
                width: "45%",
                height: "75px",
                display: "block",
                margin: "0 auto",
              }}
              
            />
         <div className='text-white text-xl text-centre' style={{marginTop:'-10px'}}>We get a personalized</div>
        <div className='text-white text-xl text-centre' style={{marginTop:'0px'}}>green portofolio</div>
      
    </div>
</div>

    </div>
  
)
};

export default Login;
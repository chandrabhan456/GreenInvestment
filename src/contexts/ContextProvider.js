import React, { createContext, useContext, useState, useEffect } from "react";

const StateContext = createContext();

const initialState = {
  setting: false,
  notification: false,
  userProfile: false,
};

export const ContextProvider = ({ children }) => {
  console.log(localStorage.getItem("openAI_Configuration"));

  console.log("loginchan", localStorage.getItem("login"));
  let initialLoginState = localStorage.getItem("login");
  if (initialLoginState === null || initialLoginState === "false") {
    // If null or true, set to false
    localStorage.setItem("login", "false");
    initialLoginState = false;
  } else {
    // Otherwise, parse as a boolean
    initialLoginState = localStorage.getItem("login");
  }
  const [isClicked, setIsClicked] = useState(initialState);
  const [mainPage, setMainPage] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [result, setResult] = useState("");
  const [login1, setlogin1] = useState(initialLoginState);
  const [sidebarCurrentStep, setSidebarCurrentStep] = useState(0);
  const [chatbot, setChatbot] = useState(false);
  const [secondPage, setSecondPage] = useState(false);
  const [stockResult1, setStockData1] = useState([]);
  const [activeStock, setActiveStock] = useState("");
  const [stockName, setStockName] = useState([]);
  const [bondData1, setBondData1] = useState([]);
  const [activebond, setActiveBond] = useState("");
  const [bondName, setBondName] = useState([]);
  const [activeTab, setActiveTab] = useState("Stocks");
  useEffect(() => {
    localStorage.setItem("login", login1);
  }, [login1]);

  const [error, setError] = useState("");
  const handleClick = (clicked) =>
    setIsClicked({ ...initialState, [clicked]: true });

  return (
    // eslint-disable-next-line react/jsx-no-constructed-context-values
    <StateContext.Provider
      value={{
        activebond,
        activeTab,
         setActiveTab,
        setActiveBond,
        bondData1,
        setBondData1,
        activeStock,
        stockName,
        setStockName,
        setActiveStock,
        stockResult1,
        setStockData1,
        secondPage,
        setSecondPage,
        chatbot,
        setChatbot,
        error,
        setError,
        sidebarCurrentStep,
        result,
        isLoading,
        setIsLoading,
        setResult,
        setSidebarCurrentStep,
        login1,
        setlogin1,
        mainPage,
        setMainPage,
        handleClick,
        setIsClicked,
        isClicked,
        initialState,
      }}
    >
      {children}
    </StateContext.Provider>
  );
};

export const useStateContext = () => useContext(StateContext);

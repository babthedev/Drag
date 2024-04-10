import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, selectDarkMode } from '../features/homeSlice';
import { Link } from 'react-router-dom';
import lightLogo from "../assets/Logo_light.png";
import darkLogo from "../assets/Logo_dark.png";
import sun from "../assets/icons8-sun-80.png"
import moon from "../assets/icons8-moon-96.png"

const Footer = ({ scrollHandler }) => {
  const dispatch = useDispatch();
  const isDarkMode = useSelector(selectDarkMode);

  useEffect(() => {
    const userTheme = localStorage.getItem("theme");
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
    if (userTheme === "dark" || (!userTheme && systemTheme)) {
      dispatch(toggleDarkMode(true));
    }
  }, [dispatch]);

  const themeSwitch = () => {
    const newTheme = !isDarkMode;
    document.documentElement.classList.toggle("dark", newTheme);
    localStorage.setItem("theme", newTheme ? "dark" : "light");
    dispatch(toggleDarkMode(newTheme));
  };

  return (
    <footer className={`w-full flex flex-col mt-8 lg:px-2 p-8 lg:py-8 items-start justify-between ${isDarkMode ? 'bg-white text-black' : 'bg-black text-white'} lg:px-20  shadow-lg`}>
        <div className={`w-full flex flex-col md:flex-row items-start justify-between`}>

      <Link to="/">
        <img src={isDarkMode ? lightLogo : darkLogo} width="100px" alt="" />
      </Link>
      <ul className='gap-3 lg:gap-6 items-start text-lg lg:text-xl justify-between lg:flex'>
        <li className={`${isDarkMode ? "hover:border-black" : "hover:border-white"}  hover:border-2 mt-2 lg:mt-0 hover:p-2`}>
            About Us
        </li>
        <li className={`${isDarkMode ? "hover:border-black" : "hover:border-white"}  hover:border-2 hover:p-2 mt-2 lg:mt-0`}>Pricing</li>
      </ul>
      <div className='flex flex-col lg:flex-row mt-2 lg:mt-0 gap-4 items-start text-base md:text-xl justify-between'>
        <Link to="/signup">
          <h2>Log in</h2>
        </Link>
        <Link to="/login">
          <h2 className={`border-2 py-1 px-3 lg:py-3  lg:px-8 rounded-full ${isDarkMode ? "border-black" : "border-white"}  hover:bg-white hover:border-white hover:text-black`}>Sign up</h2>
        </Link>
      </div>
        </div>
      <p className={`${isDarkMode ? ' text-black' : ' text-white'} lg:text-2xl mt-2 lg:mt-0 text-lg md:text-xl `}>C Copyright DRAG 2024</p>
    </footer>
  );
};

export default Footer;

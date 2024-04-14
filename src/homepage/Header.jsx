import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleDarkMode, selectDarkMode } from '../features/homeSlice';
import { Link } from 'react-router-dom';
import lightLogo from "../assets/Logo_light.png";
import darkLogo from "../assets/Logo_dark.png";
import sun from "../assets/icons8-sun-80.png"
import moon from "../assets/icons8-moon-96.png"

const Header = () => {
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
    <header className={`h-3/4 flex py-2 lg:py-0 lg:font-bold lg:text-4xl items-center justify-between sticky ${isDarkMode ? 'bg-black text-white' : 'bg-white text-black'} fixed top-0 px-6 md:px-16 lg:px-36 left-0 shadow-lg`}>
      <Link to="/">
        <img src={isDarkMode ? darkLogo : lightLogo} width="100px" alt="" />
      </Link>
      <ul className='gap-6 lg:gap-12 items-center text-lg lg:text-xl justify-between lg:flex hidden'>
        <li className={`hover:border-black hover:border-2 hover:p-2`}>
          {/* <button onClick={scrollToTestimonials}>About Us</button> */}
          <h3>About Us</h3>
        </li>
        <li className='hover:border-black hover:border-2 hover:p-2'>Pricing</li>
      </ul>
      <div className='flex gap-12 items-center text-base md:text-xl justify-between'>
        <Link to="/signup">
          <h2>Log in</h2>
        </Link>
        <Link to="/login">
          <h2 className={`border-2 py-1 px-3 lg:py-3 lg:px-8 rounded-full ${isDarkMode ? "border-black" : "border-black"}  hover:bg-black hover:border-black hover:text-white`}>Sign up</h2>
        </Link>
      </div>
      <h1 
                className={`text-base lg:text-2xl ${isDarkMode ? "hover:bg-black hover:text-gray-50 " : "hover:bg-white text-white hover:text-black"} hover:text-black font-bold lg:px-20 lg:py-6 rounded-lg`}
                onClick={themeSwitch}
            >
                <img src={sun} className={` cursor-pointer ${isDarkMode ? 'hidden' : ''} h-8`} alt="" onClick={themeSwitch} />
              <img src={moon} className={` cursor-pointer ${isDarkMode ? '' : 'hidden'} h-8`} alt="" onClick={themeSwitch} />
            </h1>
    </header>
  );
};

export default Header;

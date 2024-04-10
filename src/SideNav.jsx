import { useEffect, useState } from "react";
import lightLogo from "./assets/Logo_light.png"
import darkLogo from "./assets/Logo_dark.png"
import { useNavigate } from "react-router-dom";
import dashIcon from "./assets/icons8-dashboard-100.png"
import { NavLink, Link, Navigate } from "react-router-dom";
import { useDispatch, useSelector } from 'react-redux';
import { selectDarkMode, toggleDarkMode } from './features/homeSlice'
import { getAuth, signOut } from 'firebase/auth';
import sun from "./assets/icons8-sun-80.png"
import moon from "./assets/icons8-moon-96.png"
import walletDark from "./assets/wallet-dark.png"
import walletLight from "./assets/wallet-light.png"
import reportsDark from "./assets/reports-dark.png"
import reportsLight from "./assets/reports-light.png"
import notificationDark from "./assets/notification-dark.png"
import notificationLight from "./assets/notification-light.png"
import firebaseConfig from './firebase';
import { initializeApp } from "firebase/app";
import dashDark from "./assets/dashboard-dark.png"
import loglight from "./assets/logout-light.png"
import logDark from "./assets/logout-dark.png"

const SideNav = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const [isClose, setIsClose] = useState(false)
    const isDarkMode = useSelector(selectDarkMode);
    const auth = getAuth();
    const user = auth.currentUser;
    const userData = JSON.parse(localStorage.getItem('userData'));
    useEffect(() => {
        const userTheme = localStorage.getItem("theme");
        const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches;
        if (userTheme === "dark" || (!userTheme && systemTheme)) {
          dispatch(toggleDarkMode(true));
        }
      }, [dispatch]);
      const handleLogout = () => {
        const app = initializeApp(firebaseConfig);  // Assuming firebaseConfig is imported correctly
        const auth = getAuth(app);
        
        signOut(auth)
          .then(() => {
            // Sign-out successful.
            // Redirect or perform any other action after logout.
            localStorage.removeItem('userData');
            localStorage.removeItem('savings');
            localStorage.removeItem('theme');
            localStorage.removeItem('currentBalance');
            navigate("/")
            console.log('User signed out');
          })
          .catch((error) => {
            // An error happened.
            console.error('Error signing out:', error);
          });
      };
      
    
      const themeSwitch = () => {
        const newTheme = !isDarkMode;
        document.documentElement.classList.toggle("dark", newTheme);
        localStorage.setItem("theme", newTheme ? "dark" : "light");
        dispatch(toggleDarkMode(newTheme)); // Pass newTheme here
        // console.log(newTheme);
      };
  return (
    <div className={`${isDarkMode ? "bg-white text-black" : "bg-black text-white"}bg-black md:items-center fixed md:top-0 left-0  md:w-1/5 w-full h-1/8 flex flex-col md:gap-8 md:h-full top-0 shadow-md items-start px-8 md:px-0`}>
        <div className="flex justify-around md:hidden border-b">
        <Link to="/">
            <img src={isDarkMode ? lightLogo : darkLogo}  className='mx-auto w-28' alt="" />
        </Link>
        {!isClose && <h1 onClick={()=>{setIsClose(!isClose)}} className='md:hidden absolute right-8 top-3 text-3xl'>M</h1>}
        {isClose &&<NavLink to="/profile" onClick={()=>{setIsClose(!isClose)}} className="ml-auto">
            <div className="bg-gray-100 md:py-8 w-full rounded-xl md:px-6">
                {user.photoURL ?  
                    (<img src={user.photoURL} alt="" className='rounded-full' width="50" />) 
                    :
                    <h3 className='rounded-full text-4xl  w-36 h-36'>{user.displayName ? user.displayName.charAt(0).toUpperCase() : userData.firstName.charAt(0).toUpperCase()}</h3>
                }
                </div>
            </NavLink>}
        </div>
            {/* MOBILE NAV */}
        {isClose && 
        <div className="flex flex-col gap-4 md:items-center items-center mt-8 w-full md:hidden">
            {<h1 className='cursor-pointer ml-auto mb-4 absolute top-6 text-3xl mt- right-8' onClick={()=>{setIsClose(!isClose)}}>X</h1>}
        <NavLink to="/" className={({isActive})=> isActive && ` ${isDarkMode ? "border-black border text-white" : "border-white border text-black"}  md:w-full p-4`} onClick={()=>{setIsClose(!isClose)}}>
            <div className={`text-2xl hover:text-black font-bold md:py-6 rounded-lg ${isDarkMode ? "hover:border-black hover:border hover:text-gray-50 text-white" : "hover:border-white hover:border  hover:text-black text-white"} flex gap-2 items-center w-full hover:p-4`}>
                <img src={isDarkMode ? dashIcon : dashDark} width="40px" className={` xl:block `} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"}`}>Dashboard</h1>
            </div>
        </NavLink>
        <NavLink to="/wallet" className={({isActive})=> isActive && ` ${isDarkMode ? "border-black border text-white" : "border-white border text-black"}  md:w-full p-4`} onClick={()=>{setIsClose(!isClose)}}>
            <div className={`text-2xl hover:text-black font-bold md:py-6 rounded-lg ${isDarkMode ? "hover:border-black hover:border hover:text-gray-50 text-white" : "hover:border-white hover:border  hover:text-black text-white"} flex gap-2 items-center w-full hover:p-4`}>
                <img src={isDarkMode ? walletLight : walletDark} width="40px" className={` xl:block `} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"}`}>Wallet</h1>
            </div>
        </NavLink>
        <NavLink to="/notifications" className={({isActive})=> isActive && ` ${isDarkMode ? "border-black border text-white" : "border-white border text-black"}  md:w-full p-4`} onClick={()=>{setIsClose(!isClose)}}>
            <div className={`text-2xl hover:text-black font-bold md:py-6 rounded-lg ${isDarkMode ? "hover:border-black hover:border hover:text-gray-50 text-white" : "hover:border-white hover:border  hover:text-black text-white"} flex gap-2 items-center w-full hover:p-4`}>
                <img src={isDarkMode ? notificationLight : notificationDark} width="40px" className={` xl:block `} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"}`}>Notifications</h1>
            </div>
        </NavLink>
        <NavLink to="/reports" className={({isActive})=> isActive && ` ${isDarkMode ? "border-black border text-white" : "border-white border text-black"}  md:w-full p-4`} onClick={()=>{setIsClose(!isClose)}}>
            <div className={`text-2xl hover:text-black font-bold md:py-6 rounded-lg ${isDarkMode ? "hover:border-black hover:border hover:text-gray-50 text-white" : "hover:border-white hover:border  hover:text-black text-white"} flex gap-2 items-center w-full hover:p-4
`}>
                <img src={isDarkMode ? reportsLight : reportsDark} width="40px" className={` xl:block`} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"}`}>Reports</h1>
            </div>
        </NavLink>


            <div className={`text-2xl hover:text-black font-bold md:py-6 rounded-lg ${isDarkMode ? "hover:border-black hover:border hover:text-gray-50 text-white" : "hover:border-white hover:border  hover:text-black text-white"} flex gap-2 items-center justify-center w-full hover:p-4
 md:w-full p-4`} onClick={handleLogout}>
            <img src={isDarkMode ? loglight : logDark} width="40px" className={`xl:block `} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"}`}>Logout</h1>
            </div>
            <h1 
                className={`text-base lg:text-2xl ${isDarkMode ? "hover:border-black hover:border" : "hover:border-white hover:border"} hover:text-black font-bold px-12 py-4 rounded-lg`}
                onClick={themeSwitch}
            >
                <img src={moon} className={` cursor-pointer ${isDarkMode ? 'hidden' : ''}`} width="50" alt="" onClick={themeSwitch} />
              <img src={sun} className={` cursor-pointer ${isDarkMode ? '' : 'hidden'}`} width="50" alt="" onClick={themeSwitch} />
            </h1>
        </div>
        }
        {/* DESKTOP NAV */}
        <Link to="/">
            <img src={isDarkMode ? lightLogo : darkLogo}  className='mt-4 mx-auto -mb-2 xl:w-28 md:w-20 w-28 hidden md:block' alt="" />
        </Link>
        <div className="md:flex flex-col gap-2 md:items-center items-end md:mt-2 w-full mt-10 hidden">
        <NavLink to="/" className={({isActive})=> isActive && ` ${isDarkMode ? "border-black border text-white" : "border-white border text-black"}  md:w-full md:px-4 `}>
            <div className={`text-2xl hover:text-black font-bold md:py-4  ${isDarkMode ? "hover:border-black hover:border-2 hover:text-gray-50 text-white" : "hover:border-white hover:border-2  hover:text-black text-white"} flex gap-2 items-center justify-center w-full `}>
                <img src={isDarkMode ? dashIcon : dashDark} width="40px" className={`hidden xl:block ${isDarkMode ? "bg-white" : ""} bg-white rounded-full text-center`} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"} text-center`}>Dashboard</h1>
            </div>
        </NavLink>
        <NavLink to="/Wallet" className={({isActive})=> isActive && `  ${isDarkMode ? "border-black border-2 text-white" : "border-white border-2 text-black"} md:w-full md:px-4`}>
            <div className={`text-2xl hover:text-black font-bold md:py-4  ${isDarkMode ? "hover:border-black hover:border-2 hover:text-gray-50 text-white" : "hover:border-white hover:border-2  hover:text-black text-white"} flex gap-2 items-center justify-center w-full hover:px-4`}>
                <img src={isDarkMode ? walletLight : walletDark} width="40px" className={`hidden xl:block `} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"}`}>Wallet</h1>
            </div>
        </NavLink>
        <NavLink to="/notifications" className={({isActive})=> isActive && ` ${isDarkMode ? "border-black border-2 text-white" : "border-white border-2 text-black"} md:w-full md:px-4`}>
            <div className={`text-2xl hover:text-black font-bold md:py-4  ${isDarkMode ? "hover:border-black hover:border-2 hover:text-gray-50 text-white" : "hover:border-white hover:border-2  hover:text-black text-white"} flex gap-2 items-center justify-center w-full hover:px-4`}>
                <img src={isDarkMode ? notificationLight : notificationDark} width="40px" className={`hidden xl:block `} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"}`}>Notifications</h1>
            </div>
        </NavLink>
        <NavLink to="/reports" className={({isActive})=> isActive && ` ${isDarkMode ? "border-black border-2 text-white" : "border-white border-2 text-black"}  md:w-full md:px-4`}>
            <div className={`text-2xl hover:text-black font-bold md:py-4  ${isDarkMode ? "hover:border-black hover:border-2 hover:text-gray-50 text-white" : "hover:border-white hover:border-2  hover:text-black text-white"} flex gap-2 items-center justify-center w-full hover:px-4`}>
                <img src={isDarkMode ? reportsLight : reportsDark} width="40px" className={`hidden xl:block `} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"}`}>Reports</h1>
            </div>
        </NavLink>


            <div className={`text-2xl hover:text-black font-bold md:py-4  ${isDarkMode ? "hover:border-black hover:border-2 hover:text-gray-50 text-white" : "hover:border-white hover:border-2  hover:text-black text-white"} flex gap-2 justify-center items-center w-full hover:px-4 md:w-full md:px-16`} onClick={handleLogout}>
            <img src={isDarkMode ? loglight : logDark} width="40px" className={`hidden xl:block `} alt="" />
                <h1 className={`${isDarkMode ? " text-black" : " text-white"}`}>Logout</h1>
            </div>
            <NavLink to="/profile" className="w-full px-8">
                <div className="bg-gray-100 md:py-2 w-full rounded-xl md:px-6">
                {user.photoURL ?  
                    (<img src={user.photoURL} alt="" className='rounded-full' width="50" />) 
                    :
                    <h3 className='rounded-full text-3xl  w-36 h-36'>{user.displayName ? user.displayName : userData.firstName.charAt(0).toUpperCase()}</h3>
                }
                    <h1 className="font-bold text-black text-2xl hidden xl:block mt-5">{user.displayName}{">"}</h1>
                    <p className="text-xl text-gray-700 hidden xl:block">{user.phoneNumber ? user.phoneNumber : 49094929484942}</p>
                </div>
            </NavLink>
            <h1 
                className={`text-base lg:text-2xl ${isDarkMode ? "hover:border-black hover:border-2" : "hover:border-white hover:border-2"} hover:text-black font-bold lg:px-12 lg:py-4 `}
                onClick={themeSwitch}
            >
                <img src={moon} className={` cursor-pointer ${isDarkMode ? 'hidden ' : ''}`} width="50" alt="" onClick={themeSwitch} />
              <img src={sun} className={` cursor-pointer ${isDarkMode ? '' : 'hidden'}`}  width="50" alt="" onClick={themeSwitch} />
            </h1>
        </div>

    </div>
  )
}

export default SideNav
import React, { useState } from 'react';
import { getAuth, sendPasswordResetEmail } from 'firebase/auth'; // Import the initialized Firebase auth object
import { Link } from 'react-router-dom';
import { selectDarkMode } from '../features/homeSlice';
import { useSelector } from 'react-redux';
import lightLogo from "../assets/Logo_light.png"
import darkLogo from "../assets/Logo_dark.png"
import manFlash from "../assets/manflashingblack.jpeg"
import manFlashLight from "../assets/manflashingwhite.png"

const ResetPassword = () => {
  const [email, setEmail] = useState('');
  const [isResetSent, setIsResetSent] = useState(false);
  const [error, setError] = useState('');
  const isDarkMode = useSelector(selectDarkMode);

  const handleInputChange = (e) => {
    setEmail(e.target.value);
  };
  const auth = getAuth();
  const handleSubmit = async (e) => {
    e.preventDefault();
    sendPasswordResetEmail(auth, email)
    .then(() => {
        setIsResetSent(true);
        setError('');
      })
      .catch((error) => {
        const errorCode = error.code;
        const errorMessage = error.message;
        setError(error.message);
        // ..
      });

  };

  return (
    <div className='flex flex-row w-screen h-screen gap-0'>
        <div className={`hidden w-full h-full ${isDarkMode ? "bg-white" : "bg-black"}  md:block`}>
            <img src={isDarkMode ? lightLogo : darkLogo} width="200px" className='mt-16 mx-auto' alt="" />
            <img src={isDarkMode ? manFlashLight : manFlash} width="500px" className='mt-8 mx-auto' alt="" />
        </div>
        <div className={`w-full h-full md:mx-6 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} mx-auto`}>
        {error && <p className={`${isDarkMode ? "text-white border-white" : "text-black border-black"} text-2xl text-center p-2 mx-2 border-2  mt-6 -mb-10 lg:mb-12 font-bold`}>{error}</p>}
            <h2 className='font-extrabold lg:text-5xl text-3xl mt-16 lg:mt-28 text-center'>Reset Password</h2>
            {isResetSent ? (
                <div className='md:w-1/2 lg:mx-auto mx-12 text-2xl md:text-3xl lg:text-4xl mt-20'>
                    <p className=' '>Check your email for instructions to reset your password.</p>
                    <Link to="/signup">
                    <button type="submit" className={`w-full mx-auto text-center hover:border-2 py-4 text-2xl rounded-lg cursor-pointer mt-6  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black "}`}>Back to Login</button>
                    </Link>
                </div>
                
            ) : (
                <form onSubmit={handleSubmit} className='md:w-1/2 lg:mx-auto mx-12 text-2xl'> 
                <div className='mt-20'> 
                <div className="flex flex-col">
                    <label htmlFor="email" className=''>Email Address</label>
                    <input
                      type="text"
                      placeholder="example@123.com"
                      name='email'
                      id='email'
                      value={email}
                      onChange={handleInputChange}
                      required
                      className={`px-6 text-2xl border-2 border-gray-200 rounded-md h-16  hover:border-2hover:font-bold hover:border-black ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-white hover:text-black text-black hover:bg-white  hover:border-black "}`}
                    />
                  </div>
                </div>
                <button type="submit" className={`w-full mx-auto text-center hover:border-2 py-4 text-2xl rounded-lg cursor-pointer mt-6  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black "}`}>Reset Password</button>
                </form>
            )}
        </div>
    </div>
  );
};

export default ResetPassword;

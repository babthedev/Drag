import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { getAuth, GoogleAuthProvider, signInWithPopup, createUserWithEmailAndPassword, sendEmailVerification   } from "firebase/auth";
import { initializeApp } from "firebase/app";
import SignIn from './SignIn';
import lightLogo from "../assets/Logo_light.png"
import darkLogo from "../assets/Logo_dark.png"
import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';
import manFlash from "../assets/manflashingblack.jpeg"
import manFlashLight from "../assets/manflashingwhite.png"
import firebaseConfig from '../firebase';
import googleLight from "../assets/google-light.png"
import googleDark from "../assets/google-dark.png"

const Login = () => {
  const isDarkMode = useSelector(selectDarkMode);
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [error, setError] = useState('');
  const [signInOn, setSignInOn] = useState(false);
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: ""
  });
  
  const handleBack = () => {
    if (step !== 1) {
      setStep(step - 1);
    }
  };
  
  const handleNext = () => {
    if (step !== 3) {
      setStep(step + 1);
    }
  };
  
  
    const handleChange = (event) => {
    const { name, value } = event.target;
    setError('');
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  };
  const handleSignUp = (e) => {
    e.preventDefault()
    // Form validation
    if (!form.firstName || !form.lastName || !form.email || !form.phone || !form.password || !form.confirmPassword) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    if (!/^[a-zA-Z\s]+$/.test(form.firstName) || !/^[a-zA-Z\s]+$/.test(form.lastName)) {
      setError('First Name and Last Name should contain only letters and spaces.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    if (!/\S+@\S+\.\S+/.test(form.email)) {
      setError('Please enter a valid email address.');
      setTimeout(() => setError(''), 2000);
      return;
    }
    if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(form.password) || form.password !== form.confirmPassword) {
      setError('Password should be 6-16 characters long, and Confirm Password should match Password.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    const app = initializeApp(firebaseConfig);  // Assuming firebaseConfig is imported correctly
    const auth = getAuth(app);
    createUserWithEmailAndPassword(auth, form.email, form.password)
      .then((userCredential) => {
        // Signed up successfully
      const user = userCredential.user;
      // Send verification email
      sendEmailVerification(auth.currentUser)
        .then(() => {
          // Email verification sent!
          console.log('Email verification sent!');
          alert('Please verify your email before proceeding to the dashboard.');
        })
        .catch((error) => {
          // Handle error sending verification email
          console.error('Error sending verification email:', error);
        });
      // Redirect the user after sign-up
      console.log(user.name);
      // navigate('/dashboard');
      })
      .catch((error) => {
        // Handle sign-up errors
        setError(error.message);
        console.log(error.message);
      });
      setError('')
      localStorage.setItem("userData", JSON.stringify(form));
        // navigate('/');
  };

  const handleSignInWithGoogle = () => {
    const provider = new GoogleAuthProvider();
    
    const app = initializeApp(firebaseConfig);  // Assuming firebaseConfig is imported correctly
    const auth = getAuth(app);
    signInWithPopup(auth, provider)
        .then((result) => {
          const credential = GoogleAuthProvider.credentialFromResult(result);
          // const token = credential.accessToken;
          // The signed-in user info.
          const user = result.user;
            // Google Sign-In successful, do something with the user
            console.log('Google Sign-In successful!', user);
            navigate('/dashboard');
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          // The email of the user's account used.
          const email = error.customData.email;
          // The AuthCredential type that was used.
          const credential = GoogleAuthProvider.credentialFromError(error);
            // Handle Google Sign-In error
            console.error('Google Sign-In error:', error);
        });
};


  const handleSignInClick = () => {
    setSignInOn(true);
  };

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className='flex flex-row w-screen h-screen gap-0 '>
        {/* Side illustration and logo */}
        <div className={`hidden w-full h-full ${isDarkMode ? "bg-white" : "bg-black"}  md:block`}>
          <Link to="/">
            <img src={isDarkMode ? lightLogo : darkLogo} width="200px" className='lg:mt-16 md:mt-24 mx-auto' alt=""/>
          </Link>
            <img src={isDarkMode ? manFlashLight : manFlash} width="500px" className='lg:mt-16 md:mt-36 mx-auto' alt="" />
        </div>
        {/* Login form functionalities */}
        <div className={`w-full h-full md:mx-6 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} mx-auto md:mt-36 lg:mt-0 lg:pt-20`}>
          {signInOn ?
            <SignIn /> :
            <>
              {error && <p className={`${isDarkMode ? "text-white border-white" : "text-black border-black"} text-2xl text-center p-2 mx-2 border-2  mt-6 -mb-10 lg:mb-12 font-bold`}>{error}</p>}
        <Link to="/">
          <h1 className={`text-center justify-self-end mt-4 mx-4 w-1/5 text-xl ${isDarkMode ? "text-black bg-white" : "text-white bg-black"} p-2`}>Back</h1>
        </Link>
              <h3 className='font-extrabold lg:text-5xl text-3xl mt-8 lg:mt-0 text-center'>Get Started With DRAG</h3>
              <p className='text-xl text-gray-500 mt-6 text-center'>Please provide your name, email address and phone number</p>
              <form action="" className='lg:w-1/2 lg:mx-auto mx-12 md:mx-8 text-2xl' onSubmit={handleSignUp}>
                {step === 1 && <div className='mt-6'>
                  <div className="flex flex-col">
                    <label htmlFor="firstName" className=''>First Name</label>
                    <input
                      type="text"
                      placeholder="John"
                      name='firstName'
                      id='firstName'
                      value={form.firstName}
                      onChange={handleChange}
                      className={`px-6 text-2xl border-2 border-gray-200 rounded-md h-16  hover:border-2 hover:font-bold hover:border-black ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-white hover:text-black text-black hover:bg-white  hover:border-black "}`}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label htmlFor="lastName" className=''>Last Name</label>
                    <input
                      type="text"
                      placeholder="Doe"
                      name='lastName'
                      id='lastName'
                      onChange={handleChange}
                      value={form.lastName} 
                      className={`px-6 text-2xl border-2 border-gray-200 rounded-md h-16  hover:border-2 hover:font-bold hover:border-black ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-white hover:text-black text-black hover:bg-white  hover:border-black "}`}
                    />
                  </div>
                </div>}
                {step === 2 && <div className='mt-6'>
                  <div className="flex flex-col">
                    <label htmlFor="email" className=''>Email Address</label>
                    <input
                      type="text"
                      placeholder="example@123.com"
                      name='email'
                      id='email'
                      value={form.email}
                      onChange={handleChange}
                      className={`px-6 text-2xl border-2 border-gray-200 rounded-md h-16  hover:border-2 hover:font-bold hover:border-black ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-white hover:text-black text-white hover:bg-white  hover:border-black "}`}
                    />
                  </div>
                  <div className="flex flex-col mt-6">
                    <label htmlFor="phone" className=''>Phone Number</label>
                    <input
                      type="text"
                      placeholder="********"
                      name='phone'
                      id='phone'
                      value={form.phone}
                      onChange={handleChange}
                      className={`px-6 text-2xl border-2 border-gray-200 rounded-md h-16  hover:border-2hover:font-bold hover:border-black ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-white hover:text-black text-white hover:bg-white  hover:border-black "}`}
                    />
                  </div>
                </div>}
                {step === 3 && <div className=''>
                <div className="flex flex-col mt-6">
                    <label htmlFor="password" className=''>Password</label>
                    <input
                      type="text"
                      placeholder="********"
                      name='password'
                      id='password'
                      value={form.password}
                      onChange={handleChange}
                      className={`px-6 text-2xl border-2 border-gray-200 rounded-md h-16  hover:border-2hover:font-bold hover:border-black ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-white hover:text-black text-white hover:bg-white  hover:border-black "}`}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label htmlFor="confirmPassword" className=''>Confirm Password</label>
                    <input
                      type="text"
                      placeholder="**********"
                      name='confirmPassword'
                      id='confirmPassword'
                      value={form.confirmPassword}
                      onChange={handleChange}
                      className={`px-6 text-2xl border-2 border-gray-200 rounded-md h-16  hover:border-2hover:font-bold hover:border-black ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-white hover:text-black text-white hover:bg-white  hover:border-black "}`}
                    />
                  </div>
                  <button className={`w-full mx-auto text-center hover:border-2 py-4 text-2xl rounded-lg cursor-pointer mt-6  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black "}`}>Sign Up</button>
                  
                </div>}
              <div className='flex mx-auto mt-8 justify-center gap-4'>
                {step !== 1 && <h2 onClick={handleBack} className={`rounded-lg py-4 px-8  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black"}  hover:border-2 hover:text-black hover:font-bold`}>Back</h2>}
                {step !== 3 && <h2 onClick={handleNext} className={`rounded-lg py-4 px-8  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black"}  hover:border-2 hover:text-black hover:font-bold`}>Next</h2>}
              </div>
              </form>
              <button className={` mx-auto justify-center items-center gap-4 hover:border-2 py-4 text-2xl rounded-lg cursor-pointer mt-6  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black "} flex w-2/3 px-auto text-lg md:text-xl lg:text-2xl`} onClick={handleSignInWithGoogle}><img src={isDarkMode ? googleDark : googleLight} alt="" width="50px" className='lg:w-12 w-6'/>  Sign up with Google</button>
              <h2 className='mt-4 text-center text-xl'>Already have an account? <span className='text-gray-500 cursor-pointer' onClick={handleSignInClick}>Sign in</span></h2>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;

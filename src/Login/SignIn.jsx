import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { useSelector } from 'react-redux';
import { getAuth, signInWithEmailAndPassword, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { initializeApp } from "firebase/app";
// import {auth} from "../firebase"
import lightLogo from "../assets/Logo_light.png"
import darkLogo from "../assets/Logo_dark.png"
import googleLight from "../assets/google-light.png"
import googleDark from "../assets/google-dark.png"
import { selectDarkMode } from '../features/homeSlice';
import manFlash from "../assets/manflashingblack.jpeg"
import manFlashLight from "../assets/manflashingwhite.png"
import firebaseConfig from '../firebase';

const SignIn = (
) => {
  const isDarkMode = useSelector(selectDarkMode);
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        email: "",
        password: ""
      });
      // const provider = new GoogleAuthProvider();
    const handleEmailSignIn = (e) => {
        e.preventDefault();
      
        // 1. Access the Firebase app instance directly:
        const app = initializeApp(firebaseConfig);  // Assuming firebaseConfig is imported correctly
        const auth = getAuth(app);  // Get authentication instance from the app
      // Form validation
      if (!form.email || !form.password) {
        setError('Please fill in all fields.');
        setTimeout(() => setError(''), 2000);
        return;
      }
  
      if (!/\S+@\S+\.\S+/.test(form.email)) {
        setError('Please enter a valid email address.');
        setTimeout(() => setError(''), 2000);
        return;
      }
  
      if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(form.password)) {
        setError('Your password should be 6-16 characters long');
        setTimeout(() => setError(''), 2000);
        return;
      }
  
      // Clear previous errors
      setError('');
        signInWithEmailAndPassword(auth, form.email, form.password)
          .then((userCredential) => {
            console.log(userCredential);
            localStorage.setItem("userData", JSON.stringify(form));
            navigate('/dashboard');
          })
          .catch((error) => {
            console.log(error.message);
            setError("Invalid email address or password")
          });
      };

      const handleSignInWithGoogle = () => {
        const provider = new GoogleAuthProvider();
        
        const app = initializeApp(firebaseConfig);  // Assuming firebaseConfig is imported correctly
        const auth = getAuth(app);
//         const user = auth.currentUser;
// if (user) {
//     const uid = user.uid;
//     console.log(uid); // Output the UID to the console or use it as needed
//   } else {
//     console.log("No user is currently signed in.");
//   }
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
      
      
      const handleChange = (event) => {
        const { name, value } = event.target;
    
    
        // Clear previous errors
        setError('');
        setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
      };


  return (
    <>
    <div className='flex flex-row w-screen h-screen gap-0'>
        {/* Side illustration and logo */}
        <div className={`hidden w-full h-full ${isDarkMode ? "bg-white" : "bg-black"}  md:block`}>
            <img src={isDarkMode ? lightLogo : darkLogo} width="200px" className='mt-16 mx-auto' alt="" />
            <img src={isDarkMode ? manFlashLight : manFlash} width="500px" className='mt-8 mx-auto' alt="" />
        </div>
        <div className={`w-full h-full md:mx-6 ${isDarkMode ? "bg-black text-white" : "bg-white text-black"} mx-auto`}>

        {error && <p className={`${isDarkMode ? "text-white border-white" : "text-black border-black"} text-2xl text-center p-2 mx-2 border-2  mt-6 -mb-10 lg:mb-12 font-bold`}>{error}</p>}
        <Link to="/">
          <h1 className={`text-center justify-self-end mt-4 mx-4 w-1/5 text-xl ${isDarkMode ? "text-black bg-white" : "text-white bg-black"} p-2`}>Back</h1>
        </Link>
              <h3 className='font-extrabold lg:text-5xl text-3xl mt-4  lg:mt-20 text-center'>Log in into your account</h3>
              <form action="" className='md:w-1/2 lg:mx-auto mx-12 text-2xl' onSubmit={handleEmailSignIn}>
                <div className='mt-6'>
                  <div className="flex flex-col">
                    <label htmlFor="email" className=''>Email Address</label>
                    <input
                      type="text"
                      placeholder="example@123.com"
                      name='email'
                      id='email'
                      value={form.email}
                      onChange={handleChange}
                      className={`px-6 text-2xl border-2 border-gray-200 rounded-md h-16  hover:border-2hover:font-bold hover:border-black ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-white hover:text-black text-black hover:bg-white  hover:border-black "}`}
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <div className="flex flex-col mt-6">
                    <label htmlFor="password" className=''>Password</label>
                    <input
                      type="text"
                      placeholder="********"
                      name='password'
                      id='password'
                      value={form.password}
                      onChange={handleChange}
                      className={`px-6 text-2xl border-2 border-gray-200 rounded-md h-16  hover:border-2hover:font-bold hover:border-black ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-white hover:text-black text-black hover:bg-white  hover:border-black "}`}
                    />
                  </div>
                  <Link to="/reset">
                    <h2 className='mt-4'>Forgot password?</h2>
                  </Link>
                  </div>
                  <button className={`w-full mx-auto text-center hover:border-2 py-4 text-2xl rounded-lg cursor-pointer mt-6  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black "}`}>Log in</button>
                </div>
              </form>
              <button className={` mx-auto justify-center items-center gap-4 hover:border-2 py-4  rounded-lg cursor-pointer mt-6  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black "} flex w-2/3 px-auto text-lg md:text-xl lg:text-2xl`} onClick={handleSignInWithGoogle}><img src={isDarkMode ? googleDark : googleLight} alt="" width="50px" className='lg:w-12 w-6'/>  Sign in with Google</button>
              <Link to="/login">
                <h2 className='mt-4 text-center text-xl'>New to Drag?<span className='text-gray-500 cursor-pointer'> Create an account</span></h2>
              </Link>
        </div>
    </div>
     </>
  )
}

export default SignIn

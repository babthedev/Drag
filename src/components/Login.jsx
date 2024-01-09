import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import SignIn from './SignIn';

const Login = () => {
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

  const handleChange = (event) => {
    const { name, value } = event.target;

    // Form validation on each input field
    if (name === 'firstName' && !/^[a-zA-Z\s]+$/.test(value)) {
      setError('First Name should contain only letters and spaces.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    if (name === 'lastName' && !/^[a-zA-Z\s]+$/.test(value)) {
      setError('Last Name should contain only letters and spaces.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    if (name === 'phone' && (!/^\d+$/.test(value) || value.length !== 11)) {
      setError('Phone Number should contain only numbers and be 11 characters long.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // Clear previous errors
    setError('');
    setForm((prevFormData) => ({ ...prevFormData, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

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

    if (!/^\d+$/.test(form.phone)) {
      setError('Phone Number should contain only numbers.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(form.password) || form.password !== form.confirmPassword) {
      setError('Password should be 6-16 characters long, and Confirm Password should match Password.');
      setTimeout(() => setError(''), 2000);
      return;
    }

    // Clear previous errors
    setError('');
    window.location.reload();

    localStorage.setItem("userData", JSON.stringify(form));
    navigate('/');
  };

  const handleSignInClick = () => {
    setSignInOn(true);
  };

  return (
    <div className='w-screen h-screen overflow-hidden'>
      <div className='flex flex-row lg:w-1/2 w-2/3 mx-auto my-24 h-3/5 gap-0'>
        <div className='hidden w-full h-full bg-greenAccent md:block -mr-8 rounded-s-2xl text-center text-slightDark text-3xl '><h2 className='mt-8'>DRAG</h2></div>
        <div className='w-full h-full md:mx-6 bg-white rounded-xl md:rounded-e-2xl -ml-6 px-10 '>
          {signInOn ?
            <SignIn /> :
            <>
              {error && <p className='text-red-500 mt-6 -mb-10 font-bold'>{error}</p>}
              <h3 className='font-extrabold text-2xl mt-16'>Sign up to get started</h3>
              <form action="" className='' onSubmit={handleSubmit}>
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
                      className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
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
                      className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
                    />
                  </div>
                  <h3 className='w-full mx-auto my-2 text-lg text-center bg-slightDark py-1 rounded-lg mt-6 cursor-pointer' onClick={() => setStep(2)}>Continue</h3>
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
                      className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
                    />
                  </div>
                  <div className="flex flex-col mt-4">
                    <label htmlFor="phone" className=''>Phone Number</label>
                    <input
                      type="text"
                      placeholder="090*******"
                      name='phone'
                      id='phone'
                      value={form.phone}
                      onChange={handleChange}
                      className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
                    />
                  </div>
                  <h3 className='w-full mx-auto my-2 text-lg text-center hover:text-slightDark hover:bg-black bg-slightDark py-1 rounded-lg mt-6 cursor-pointer' onClick={() => setStep(3)}>Continue</h3>
                  <h3 className='w-1/2 mx-auto my-2 text-lg text-center hover:text-slightDark hover:bg-black bg-slightDark py-1 rounded-lg mt-3 cursor-pointer' onClick={() => setStep(1)}>Back</h3>
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
                      className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
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
                      className='bg-slightDark text-gray-800 px-2 border-gray-200 rounded-md h-8'
                    />
                  </div>
                  <button className='w-full mx-auto text-lg text-center hover:text-slightDark hover:bg-black bg-slightDark py-1 rounded-lg cursor-pointer mt-6' onClick={handleSubmit}>Submit</button>
                  <h3 className='w-1/2 mx-auto my-1 text-lg text-center hover:text-slightDark hover:bg-black bg-slightDark py-1 rounded-lg mt-3 cursor-pointer' onClick={() => setStep(2)}>Back</h3>
                </div>}
              </form>
              <h2 className='mt-4 text-center'>Already have an account? <span className='text-greenAccent cursor-pointer' onClick={handleSignInClick}>Sign in</span></h2>
            </>
          }
        </div>
      </div>
    </div>
  );
};

export default Login;

import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const SignIn = () => {
    const navigate = useNavigate();
    const [error, setError] = useState('');
    const [form, setForm] = useState({
        email: "",
        phone: "",
        password: ""
      });
      const handleChange = (event) => {
        const { name, value } = event.target;
    
        // Form validation on each input field
    
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
        if (!form.email || !form.phone || !form.password) {
          setError('Please fill in all fields.');
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
    
        if (!/^[a-zA-Z0-9!@#$%^&*]{6,16}$/.test(form.password)) {
          setError('Your password should be 6-16 characters long');
          setTimeout(() => setError(''), 2000);
          return;
        }
    
        // Clear previous errors
        setError('');
        window.location.reload();
    
        localStorage.setItem("userData", JSON.stringify(form));
        navigate('/');
      };

      const handleSignupClick = () => {
        window.location.reload();
      };

  return (
    <>
       {error && <p className='text-red-500 mt-6 -mb-10 font-bold'>{error}</p>}
              <h3 className='font-extrabold text-2xl mt-16'>Log in into your account</h3>
              <form action="" className='' onSubmit={handleSubmit}>
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
                  </div>
                  <button className='w-full mx-auto text-lg text-center hover:text-slightDark hover:bg-black bg-slightDark py-1 rounded-lg cursor-pointer mt-6' onClick={handleSubmit}>Submit</button>
                </div>
              </form>
              <h2 className='mt-4 text-center'><span className='text-greenAccent cursor-pointer' onClick={handleSignupClick}>Sign up</span></h2>
     </>
  )
}

export default SignIn

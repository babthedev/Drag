import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';
import { toast } from 'react-toastify';
import { getAuth, updateProfile, updateEmail } from "firebase/auth";
import { toggleUpdateProfile, profiler } from '../features/dashSlice';

const UpdateProfile = ({ user }) => {
  const dispatch = useDispatch();
  const auth = getAuth();
  const [form, setForm] = useState({
    displayName: user.displayName || '',
    photoURL: user.photoURL || '',
    email: user.email || '',
  });
  const [error, setError] = useState('');
  const isDarkMode = useSelector(selectDarkMode);
  const update = useSelector(profiler);
  const toggleUpdate = () => {
    const currentUpdate = !updateProfile;
    dispatch(toggleUpdateProfile(currentUpdate));
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (files) {
      // Handle file upload
      handleFileUpload(files[0]);
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleFileUpload = (file) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, photoURL: reader.result });
    };
    reader.readAsDataURL(file);
  };

  const handleFormSubmit = async (e) => {
    e.preventDefault();
    try {
      await updateProfile(auth.currentUser, form);
      toast.success("Profile updated successfully.");
    } catch (error) {
      setError(error.message);
    }
    updateEmail(auth.currentUser, form.email).then(() => {
      // Email updated!
    }).catch((error) => {
      // An error occurred
    });
    toggleUpdate();
  };

  useEffect(() => {
    // If initialValues is provided, populate the form with initialValues
    setForm({
      displayName: user.displayName || '',
      photoURL: user.photoURL || '',
      email: user.email || '',
    });
  }, [user]);

  return (
    <div className={`w-screen h-screen overflow-hidden z-50 fixed top-0 left-0`}>
      <div className='flex flex-row w-screen h-screen'>
        {/* Side illustration and logo */}
        <div className={`hidden w-full h-full bg-gray-600 md:block bg-opacity-50`} onClick={toggleUpdate}></div>
        {/* AddNewSaving form functionalities */}
        <div className={`w-full h-full ${isDarkMode ? "bg-black" : "bg-white"} px-8`}>
          {error && <p className='text-red-500 mt-6 -mb-10 font-bold'>{error}</p>}
          <h3 className='font-extrabold text-5xl mt-16 '>Update your profile</h3>
          <p className='text-xl text-gray-500 mt-2'>Fill in the details of your profile.</p>
          <form action="#" className='flex flex-col mt-8' onSubmit={handleFormSubmit}>
            <label htmlFor="displayName" className='text-2xl'>Display Name</label>
            <input
              type="text"
              id='displayName'
              name='displayName'
              value={form.displayName}
              onChange={handleChange}
              className={`px-6 text-4xl border-2 border-gray-200 rounded-md h-16 text-black`}
            />
            <label htmlFor="email" className='text-2xl'>Email</label>
            <input
              type="text"
              id='email'
              name='email'
              value={form.email}
              onChange={handleChange}
              className={`px-6 text-4xl border-2 border-gray-200 rounded-md h-16 text-black`}
            />
            <label htmlFor="photoURL" className='text-2xl mt-6'>Photo</label>
            <input
              type="file"
              id='photoURL'
              name='photoURL'
              accept="image/*"
              onChange={handleChange}
              className={`px-6 text-4xl border-2 border-gray-200 rounded-md hover:border-2 h-16 text-black`}
            />
            <div className='flex justify-between mt-6'>
              <button className={`w-1/2 mr-2 text-center hover:border-2 py-4 text-2xl rounded-lg cursor-pointer ${isDarkMode ? "bg-white text-black hover:bg-black hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white hover:border-black"} font-bold`} type='button' onClick={toggleUpdate}>Cancel</button>
              <button className={`w-1/2 ml-2 text-center hover:border-2 py-4 text-2xl rounded-lg cursor-pointer ${isDarkMode ? "bg-white text-black hover:bg-black hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white hover:border-black"} font-bold`} type='submit'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;

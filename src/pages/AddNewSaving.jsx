import React, { useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';
import { toast } from 'react-toastify';
import { Link } from 'react-router-dom';
import { addNewSaving, selectAllSavings, savingAdded, updateSaving, toggleAddSavings, addNewSavingFirestore,updateSavingFirestore } from '../features/dashSlice';
import { nanoid } from '@reduxjs/toolkit';

const AddNewSaving = ({ handleCancel, initialValues }) => {
  const dispatch = useDispatch();
  const [form, setForm] = useState(initialValues || {
    title: "",
    amount: "",
    daily: ""
  });
  const [error, setError] = useState('');
  const isDarkMode = useSelector(selectDarkMode);
  const addNotify = () => toast.success("Saving Added Successfully");
  const addNew = useSelector(addNewSaving);
  const savings = useSelector(selectAllSavings);


  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prevForm) => ({ ...prevForm, [name]: value }));
  };
  const toggleAdd = () => {
    const currentAddState = !addNew;
    dispatch(toggleAddSavings(currentAddState));
};

// const handleAddNewClick = () => {
//     toggleAdd();
// };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (initialValues) {
      // If initialValues is provided, update the existing saving
      dispatch(updateSavingFirestore(initialValues.id, form));
      toast.success("Saving Updated Successfully");
    } else {
      // Otherwise, add a new saving
      const newTargetObject = {
        id: nanoid(),
        ...form,
      };
      // dispatch(savingAdded(newTargetObject));
      // dispatch(updateSavingFirestore(form));
      dispatch(addNewSavingFirestore(newTargetObject))
      addNotify();
    }

    // Clear the form after submission
    setForm({
      title: "",
      amount: "",
      daily: "",
    });

    // Close the form
    toggleAdd();
    // handleCancel()
  };

  const validateForm = () => {
    // Form validation
    if (!form.title || !form.amount || !form.daily) {
      setError('Please fill in all fields.');
      setTimeout(() => setError(''), 2000);
      return false;
    }

    if (!/^[a-zA-Z\s]+$/.test(form.title)) {
      setError('Title should contain only letters and spaces.');
      setTimeout(() => setError(''), 2000);
      return false;
    }

    if (!/^\d+$/.test(form.amount) || !/^\d+$/.test(form.daily)) {
      setError('Amount and Daily Savings should contain only numbers.');
      setTimeout(() => setError(''), 2000);
      return false;
    }

    return true;
  };

  useEffect(() => {
    // If initialValues is provided, populate the form with initialValues
    if (initialValues) {
      setForm(initialValues);
    }
  }, [initialValues]);

  return (
    <div className={`w-screen h-screen overflow-hidden z-50 fixed top-0 left-0`}>
      <div className='flex flex-row w-screen h-screen'>
        {/* Side illustration and logo */}
        <div className={`hidden w-full h-full bg-gray-600 md:block bg-opacity-50`} onClick={initialValues ? handleCancel : toggleAdd}></div>
        {/* AddNewSaving form functionalities */}
        <div className={`w-full h-full ${isDarkMode ? "bg-black" : "bg-white"} px-8`}>
          {error && <p className='text-red-500 mt-6 -mb-10 font-bold'>{error}</p>}
          <h1 className={`text-center justify-self-end mt-6 mx-4 w-1/5 text-xl ${isDarkMode ? "text-black bg-white" : "text-white bg-black"} p-2`} onClick={initialValues ? handleCancel : toggleAdd}>Back</h1>
          <h3 className={`font-extrabold ${isDarkMode ? "text-white" : "text-black"} text-3xl lg:text-5xl mt-4`}>{initialValues ? "Update your saving" : "Start a new saving target"}</h3>
          <p className='text-xl text-gray-500 mt-2'>Fill in the details of your target.</p>
          <form action="#" className='flex flex-col mt-8' onSubmit={handleFormSubmit}>
            <label htmlFor="savingTitle" className={`text-2xl ${isDarkMode ? "text-white" : "text-black"}`}>Title</label>
            <input
              type="text"
              id='savingTitle'
              name='title'
              value={form.title}
              onChange={handleChange}
              className={`px-6 text-4xl border-2 border-gray-200 rounded-md h-16 text-black`}
            />
            <label htmlFor="savingAmount" className={`text-2xl mt-6 ${isDarkMode ? "text-white" : "text-black"}`}>Amount</label>
            <input
              type="text"
              id='savingAmount'
              name='amount'
              value={form.amount}
              onChange={handleChange}
              className={`px-6 text-4xl border-2 border-gray-200 rounded-md h-16 text-black`}
            />
            <label htmlFor="savingDaily" className={`text-2xl mt-6 ${isDarkMode ? "text-white" : "text-black"}`}>Daily Savings</label>
            <input
              type="text"
              id='savingDaily'
              name='daily'
              value={form.daily}
              onChange={handleChange}
              className={`px-6 text-4xl border-2 border-gray-200 rounded-md hover:border-2 h-16 text-black`}
            />
            <div className='flex justify-between mt-6'>
              <button className={`w-1/2 mr-2 text-center hover:border-2 py-4 text-2xl rounded-lg cursor-pointer ${isDarkMode ? "bg-white text-black hover:bg-black hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white hover:border-black"} font-bold`} type='button' onClick={initialValues ? handleCancel : toggleAdd}>Cancel</button>
              <button className={`w-1/2 ml-2 text-center hover:border-2 py-4 text-2xl rounded-lg cursor-pointer ${isDarkMode ? "bg-white text-black hover:bg-black hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white hover:border-black"} font-bold`} type='submit'>Save</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddNewSaving;

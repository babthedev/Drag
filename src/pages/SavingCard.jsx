// SavingCard.js
import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { updateSavingFirestore, deleteSavingFirestore, addNewSaving } from '../features/dashSlice';
import { selectDarkMode } from '../features/homeSlice';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { CircularProgressbar, buildStyles } from 'react-circular-progressbar';
import 'react-circular-progressbar/dist/styles.css';
import AddNewSaving from './AddNewSaving';

const SavingCard = ({ saving, progressPercentage }) => {
    const dispatch = useDispatch();
    const [isEditing, setIsEditing] = useState(false);
    const deleteNotify = () => toast.success("Saving Deleted Successfully");
    const isDarkMode = useSelector(selectDarkMode);
    const addNew = useSelector(addNewSaving);

    const handleEdit = () => {
        setIsEditing(true);
    };

    const handleSave = (formData) => {
        dispatch(updateSavingFirestore(saving.id, formData)); // Dispatch the updateSavingFirestore action
        setIsEditing(false);
    };

    const handleDelete = () => {
        dispatch(deleteSavingFirestore(saving.id)); // Dispatch the deleteSavingFirestore action
        deleteNotify()
    };
    
    const handleCancel = () => {
        setIsEditing(false)
        dispatch(!addNew)
    }


    return (
        <div>
            {!isEditing ? (
                <div className={`${isDarkMode ? "border-gray-200" : "border-black"} border-2 rounded-xl p-5`}>
                    <p className='lg:text-4xl text-2xl md:text-3xl'>Title: {saving.title}</p>
                    <p className='lg:text-2xl text-2xl md:text-3xl'>Target: {saving.amount}</p>
                    <p className='lg:text-2xl text-2xl md:text-3xl'>Daily Savings: {saving.daily}</p>
                    <p className='mb-8'></p>
                    <CircularProgressbar
        value={progressPercentage}
        text={`${progressPercentage}`}
        styles={buildStyles({
          textColor: `${isDarkMode ? "#fff" : "#000"}`, // Text color
          pathColor: `${isDarkMode ? "#000" : "#fff"}`, // Progress bar color
          trailColor: `${isDarkMode ? "#fff" : "#000"}`, // Trail color (unfilled portion)
          textSize: '16px', // Text size
          pathTransitionDuration: 0.5, // Progress bar animation duration
        })}
      />
                    <div className='mt-6'>
                    <button onClick={handleEdit} className='lg:text-xl text-2xl md:text-3xl'>Edit</button>
                    <button onClick={handleDelete} className='lg:text-xl text-2xl md:text-3xl float-right'>Delete</button>
                    </div>
                </div>
            ) : (
                <AddNewSaving
                    handleCancel={handleCancel} // Pass callback function to cancel editing
                    initialValues={saving} // Pass initial values to populate input fields
                    handleSaveSubmit={handleSave} // Pass submit handler
                    setIsEditing={setIsEditing}
                />
            )}
        </div>
    );
};

export default SavingCard;

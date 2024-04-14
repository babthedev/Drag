import { useDispatch, useSelector } from 'react-redux';
import { useEffect, useState } from "react";
import { selectDarkMode } from '../features/homeSlice';
import { updateBalance } from '../features/dashSlice';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
// import lightLogo from "../assets/Logo_light.png";
import AddNewSaving from "./AddNewSaving";
import SavingCard from './SavingCard';
 import { initializeApp } from 'firebase/app';
 import { getAuth } from 'firebase/auth';
 import firebaseConfig from '../firebase';
import { addNewSaving, toggleAddSavings, selectAllSavings, updateSaving, updateAmountSaved, currentBalance, deleteSaving } from '../features/dashSlice';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

const Dashboard = () => {
    const dispatch = useDispatch();
    const app = initializeApp(firebaseConfig);
    const auth = getAuth(app);
    const user = auth.currentUser
    const userData = JSON.parse(localStorage.getItem('userData'));

    const isDarkMode = useSelector(selectDarkMode);
    const addNew = useSelector(addNewSaving);
    const savings = useSelector(selectAllSavings);
    const initialBalance = useSelector(currentBalance);


// Inside the useEffect hook
useEffect(() => {
    const interval = setInterval(() => {
        let newTotalDailyAmount = 0;
        savings.forEach(saving => {
            const savedAmount = parseInt(saving.amountSaved) + parseInt(saving.daily);
            const check = parseInt(saving.amount) + parseInt(saving.daily)
            // console.log(saving.amountSaved);
            if (savedAmount < check) { // Check if savedAmount is less than target amount
                dispatch(updateAmountSaved({ id: saving.id, amountSaved: savedAmount, daily: saving.daily })); // Include id, amountSaved, and daily in payload
                newTotalDailyAmount += parseInt(saving.daily); // Update the total daily amount
            }
            if (initialBalance > newTotalDailyAmount && savedAmount < check ) {
                dispatch(updateBalance(initialBalance - newTotalDailyAmount));
            }
        });
    }, 10 * 1000);

    return () => clearInterval(interval);
}, [dispatch, initialBalance, savings]);


    
    

    const toggleAdd = () => {
        const currentAddState = !addNew;
        dispatch(toggleAddSavings(currentAddState));
    };

    const handleAddNewClick = () => {
        toggleAdd();
    };

    const handleDelete = (id) => {
        dispatch(deleteSaving(id));
    };

    const renderedSavings = savings.map(saving => (
        <SavingCard
            key={saving.id}
            saving={saving}
            onDelete={() => handleDelete(saving.id)}
            progressPercentage={saving.progress + '%'}
         />
    ));


    return (
        <div className={`flex flex-col md:flex-row`}>
            {addNew && <AddNewSaving/>}
            <div className="md:w-1/5 h-1/4 md:h-full "></div>
            <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} md:w-4/5 p-4 lg:-mt-8 md:p-8 lg:p-12`}>
                <h1 className="font-bold xl:text-6xl text-3xl lg:text-5xl border-b border-gray-300 mt-16 md:mt-0">Your Dashboard</h1>
                <h1 className={`text-xl md:text-2xl ${isDarkMode ? "bg-black text-gray-300" : "bg-white text-gray-500"} mt-6`}>
                    Welcome back, 
                    <span className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} font-bold text-3xl md:text-4xl`}>
                        {" "}{user.displayName ? user.displayName : userData.firstName}
                    </span>
                    <ToastContainer
                        style={
                                { 
                                    backgroundColor: `'rgba(0,0,0,0.7)'`, 
                                    padding: '10px' 
                                }
                            } 
                            className="custom-toast-container"
                    />
                </h1>
                <div className="flex flex-col lg:flex-row gap-16 mt-8">
                    <div className="w-full">
                        <h2 className={`bg-gray-50 p-2 text-lg md:text-xl rounded-xl text-black `}>Your current balance will last 0 days</h2>
                        <h1 className="text-xl mt-2">Current Balance</h1>
                        <h2 className="text-4xl md:text-6xl font-bold">{initialBalance}<span className="text-4xl">NGN</span></h2>
                        <h1 className="text-xl mt-2">Account ID</h1>
                        <h2 className="text-4xl md:text-6xl font-bold">9013276006</h2>
                        { savings.length === 10 ?
                        <p className="mt-6 text-xl md:text-2xl">Free savings limit exceeded</p> :
                        <p className="mt-6 text-xl md:text-2xl">{10 - savings.length} savings left</p> 
                        }
                        <ProgressBar
        percent={savings.length / 10 * 100}
        filledBackground={`${isDarkMode ? "#fff" : "#000"}`}
      />
                    </div>
                    <div className='flex gap-4 w-full'>
                        <div className={`p-6 md:px-4  py-4 rounded-xl w-1/2 ${isDarkMode ? "text-black bg-white" : " text-white bg-black"} `}>
                            <div className={`flex flex-col justify-center items-center gap-2`}>
                                <h1 className={`p-2 md:p-4 rounded-full ${isDarkMode ? "text-white bg-black" : " text-black bg-white"}`}>{savings.length}</h1>
                                <h1 className=" text-base text-wrap md:text-2xl">Number of Savings</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <h1 className={`p-2 md:p-4 rounded-full ${isDarkMode ? "text-white bg-black" : " text-black bg-white"}`}>0</h1>
                                <h1 className=" text-base mt-2 text-wrap md:text-2xl">Completed Savings</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <h1 className={`p-2 md:p-4 rounded-full ${isDarkMode ? "text-white bg-black" : " text-black bg-white"}`}>{savings.length}</h1>
                                <h1 className=" text-base mt-2 text-wrap md:text-2xl">Ongoing Savings</h1>
                            </div>
                        </div>
                        
                        <div className={`p-8 w-1/2 rounded-xl ${isDarkMode ? "text-black bg-white" : " text-white bg-black"} p-8rounded-xl flex flex-col items-center gap-6 pt-10`} onClick={handleAddNewClick}>
                            <h1 className={`font-bold ${isDarkMode ? "text-black" : " text-white"} text-2xl md:text-4xl text-center`}>Add a new Saving</h1>
                            <h1 className={`p-4 text-6xl font-bold rounded-full ${isDarkMode ? "text-white bg-black" : " text-black bg-white"}`}>+</h1>
                        </div>
                    </div>
                </div>
                <div className='mt-8 md:mt-12 lg:mt-20 grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-6'>
                {renderedSavings}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;

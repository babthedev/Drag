import React, { useEffect, useState, useRef } from 'react'
import { Link } from 'react-router-dom'
import SavingCard from './SavingCard'
import RecentTransaction from './RecentTransaction'
import AddNewForm from './AddNewForm'
import left from "/src/assets/left.png"
import right from "/src/assets/right.png"

const Home = ({logTransaction, currentBalance, setCurrentBalance, transactions, displayAllTransactions, setSavings, savings, totalAmount}) => {
  const [toggleAdd, setToggleAdd] = useState(false);
  const [track, setTrack] = useState(0);
  const [editingSaving, setEditingSaving] = useState(null);
  const [showScrollButtons, setShowScrollButtons] = useState(false);
  const carouselRef = useRef(null);

  const handleAddNew = ()=>{
    setToggleAdd(!toggleAdd)
  }
  useEffect(() => {
    // Fetch data from localStorage or an API and update state
    const userData = JSON.parse(localStorage.getItem('form'));
    if (userData) {
      setFormName(userData.firstName);
    }
    
    const savingsData = JSON.parse(localStorage.getItem('newTarget'));
    if (savingsData) {
      setSavings(savingsData);
    }
  }, []);
  useEffect(() => {
    const container = carouselRef.current;
    if (container) {
      // Check if the container has a horizontal scrollbar
      setShowScrollButtons(container.scrollWidth > container.clientWidth);
    }
  }, [savings]);
  
  const loadedData = localStorage.getItem('userData');
  const userData = JSON.parse(loadedData);

  
  
  useEffect(() => {
    if (currentBalance > totalAmount) {
    const interval = setInterval(() => {
      // Update current balance by deducting totalAmount
      setCurrentBalance((prevBalance) => prevBalance - totalAmount);

      // Save the updated balance to localStorage
      localStorage.setItem('currentBalance', JSON.stringify(currentBalance));
    }, 60 * 1000); // 24 hours in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }}, [currentBalance, totalAmount]);




 //Saving Progress
useEffect(() => {
  let intervalId;

  if (currentBalance > totalAmount) {
    const calculateProgress = () => {
      // Use map to create a new array with updated progress values
      const updatedSavings = savings.map((saving) => {
        const timeFrame = saving.amount / saving.daily;
        const percentage = track < timeFrame ? (100 * track) / timeFrame : 100;

        return {
          ...saving,
          progress: percentage,
        };
      });

      // Update the state with the new progress values
      setSavings(updatedSavings);
    };

    if (currentBalance > 0) {
      intervalId = setInterval(() => {
        setTrack((prevTrack) => prevTrack + 1);
        calculateProgress();
      }, 60 * 1000);

      return () => clearInterval(intervalId);
    }
  }
}, [currentBalance, totalAmount, track, savings, setSavings]);



   

  // Recent Transaction
  // Useeffect for transactions
  useEffect(() => {
    if (currentBalance > totalAmount) {
    const interval = setInterval(() => {

      const transactionTitle = savings.length > 1 ? "Daily Savings Deducted" : "Daily Saving Deducted" 
      // Log transaction details
      logTransaction({
        type: 'Debit',
        title: transactionTitle,
        amount: totalAmount,
        timestamp: new Date().toISOString(),
      });

      // Save the updated balance to localStorage
    }, 60 * 1000); // 24 hours in milliseconds

    // Clear the interval when the component unmounts
    return () => clearInterval(interval);
  }}, [currentBalance, totalAmount]);
  
  const handleDelete = (id) => {
    // Remove the item from the array
    const updatedSavings = savings.filter((saving) => saving.id !== id);
    const deletedSaving = savings.find((saving) => saving.id === id);
    setSavings(updatedSavings);
    logTransaction({
      title: deletedSaving.title,
      type: 'Deleted',
      amount: parseFloat(deletedSaving.amount),
      timestamp: new Date().toISOString(),
    });

    // Update localStorage with the modified array
    localStorage.setItem('newTarget', JSON.stringify(updatedSavings));
  };

  const handleEdit = (editedSaving) => {
    // Open the AddNewForm component with the editedSaving details
    setEditingSaving(editedSaving);
    setToggleAdd(true);
  };

  const scrollCarousel = (direction) => {
    const scrollAmount = 100; // Adjust the scroll amount based on your design
    const container = carouselRef.current;

    if (container) {
      if (direction === 'left') {
        container.scrollLeft -= scrollAmount;
      } else {
        container.scrollLeft += scrollAmount;
      }
    }
  };

  const renderedCarousel = savings.map((saving) => (
    <div key={saving.id} className='flex-none py-4'>
      <SavingCard
        saving={saving}
        onDelete={handleDelete}
        onEdit={handleEdit}
        progressPercentage={saving.progress || 0}
      />
    </div>
  ));




  return (
    <div className='relative'>
      <div className='lg:w-3/5 w-3/4 mx-auto my-8'> 
        {toggleAdd && <AddNewForm toggleAdd={toggleAdd} setToggleAdd={setToggleAdd} setEditingSaving={setEditingSaving} savings={savings} editingSaving={editingSaving} setSavings={setSavings} />}
        <div className='flex flex-col md:flex-row justify-between'>
        <div>
          <h2 className='font-bold text-4xl lg:text-5xl lg:py-1'>Welcome {userData.firstName}</h2>
          {savings.length > 0 ?
          (<p className='text-gray-500 text-base font-normal'>Here are your latest saving targets</p>) : 
          (<p className='text-gray-500 text-base font-normal'>Add a new saving target</p>)
          }
        </div>
        <div className='mt-4 md:mt-0'>
          <Link to="fundmywallet">
          <h2 className='md:border-gray-300 md:px-2 md:border-2 rounded-lg text-lg lg:text-2xl lg:px-3 lg:py-1 hover:border-greenAccent cursor-pointer '><span className='hidden lg:inline '>Current</span> Balance: #{currentBalance.toFixed(2)}</h2>
          </Link>
          <p className='text-lg lg:px-3'><span className='hidden lg:inline'>Account</span> ID: {userData.phone}</p>
        </div>
        </div>
          <h2 className='text-base mt-2 lg:text-xl'>Total Savings Amount: #{totalAmount.toFixed(2)}</h2>
        <button className='float-right border-2 border-gray-300  rounded-2xl p-2 hover:border-greenAccent hover:bg-lightGray' onClick={handleAddNew}>Add New</button>
        <section className='mt-14 flex gap-4 relative'>
            <div
            ref={carouselRef}
            className='flex overflow-x-auto space-x-4 scrollbar-hide'
          >
            {renderedCarousel}
          </div>

          {showScrollButtons && (<div className='flex justify-between absolute w-full'>
          <button onClick={() => scrollCarousel('left')} className='left-0 absolute top-24 '><img src={left} width="50px" alt="left button" /></button>
          <button onClick={() => scrollCarousel('right')} className='right-0 absolute top-24' ><img src={right} width="50px" alt="right button" /></button>
        </div>)}
        </section>
        <section className='mt-4'>
          <h2>Recent Transactions</h2>
          <>
          {currentBalance >= totalAmount && (<RecentTransaction transactions={displayAllTransactions ? transactions : transactions.slice(0, 5)} />)}
          </>
          {transactions.length > 1 ? <>
          {currentBalance >= totalAmount && (<RecentTransaction transactions={displayAllTransactions ? transactions : transactions.slice(0, 5)} />)}
          </> : <h2 className='px-2 py-1 bg-white mb-2 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl'>No transactions to display</h2>}
        </section>
      </div>
    </div>
  )
}

export default Home
import React from 'react'

const FundMyWallet = ({handleLargeIncrement, handleSmallIncrement, currentBalance, totalAmount}) => {
  const loadedData = localStorage.getItem('userData');
  const userData = JSON.parse(loadedData);
  return (
    <div className='relative lg:w-3/5 w-10/12 mx-auto my-8'>
      <div className='flex flex-col md:flex-row justify-between'>
       <div>
        <h2 className='font-extrabold text-3xl lg:py-1'>Add money to your savings</h2>
        <p className='text-gray-500 text-base font-normal'>You can add money to your account via mobile banks</p>
       </div>
       <div className='mt-4 md:mt-0'>
        <h2 className='md:border-gray-300 md:px-2 md:border-2 rounded-lg text-lg lg:text-2xl lg:px-3 lg:py-1  cursor-pointer md:mt-3'><span className='hidden lg:inline'>Current</span> Balance: #{currentBalance.toFixed(2)}</h2>
       </div>
      </div>
      <section className='lg:w-4/5 mx-auto mt-10'>
        <div onClick={handleLargeIncrement} className='flex justify-between bg-white p-4 rounded-xl hover:border-greenAccent cursor-pointer hover:border-2'>
        <div>
          <h2 className='font-extrabold text-2xl mb-4'>Bank Transfer</h2>
          <p className='text-gray-500 text-base font-normal'>Click to make a transfer</p>
        </div>
        <div>
          <h2 className='font-medium text-lg text-gray-500 mb-4'>Drag Account ID</h2>
          <p className='text-base font-normal'>{userData.phone}</p>
        </div>
        </div>
        <div className="flex flex-row gap-4 mt-4 justify-between">
        <div onClick={handleSmallIncrement} className='flex justify-between bg-white p-4 rounded-xl hover:border-greenAccent cursor-pointer hover:border-2 w-1/2'>
        <div >
          <h2 className='font-extrabold text-2xl mb-4'>Cash Deposit</h2>
          <p className='text-gray-500 text-base font-normal'>Fund your account with nearby merchants</p>
        </div>
        </div>
        <div onClick={handleSmallIncrement} className='flex justify-between bg-white p-4 rounded-xl hover:border-greenAccent cursor-pointer hover:border-2 w-1/2'>
        <div >
          <h2 className='font-extrabold text-2xl mb-4'>Top-up with your bank card</h2>
          <p className='text-gray-500 text-base font-normal'>Add money directly from your bank card</p>
        </div>
        </div>
        </div>
        {currentBalance > 1 && <>
        {currentBalance === totalAmount * 2 && <h2 className='bg-red-600 text-white text-center rounded-lg py-2 w-1/2 mt-20'>Your Current balance will last two days</h2>}
        </>}
        {currentBalance < totalAmount  && <h2 className='bg-red-600 text-white text-center rounded-lg py-2 w-1/2 mt-20'>Your balance has been exhausted</h2>}
        {currentBalance > totalAmount && <>
        {currentBalance < totalAmount * 2  && <h2 className='bg-red-600 text-white text-center rounded-lg py-2 w-1/2 mt-20'>Your Current balance will last only one day</h2>}
        </>}
        {currentBalance > totalAmount * 2 && <>
        {currentBalance < totalAmount * 3 && <h2 className='bg-red-600 text-white text-center rounded-lg py-2 w-1/2 mt-20'>Your Current balance will last two days</h2>}
        </>}
        
      </section>
    </div>
  )
}

export default FundMyWallet
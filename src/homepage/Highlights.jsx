import React from 'react'
import HighlightCard from './HighlightCard'
const Highlights = () => {
  return (
    <div className='mt-20 px-6 md:px-16 lg:px-36'>
        <h1 className='text-5xl px-30 lg:px-60 text-center'>Designed to Streamline Your Financial Journey With Ease - <span className='text-gray-500'>DRAG</span></h1>
        <div className='grid lg:grid-cols-4 grid-cols-1 md:grid-cols-2 gap-6 lg:gap-4 mt-8'>
            <HighlightCard 
                icon="" 
                head="Effortless Financial Management" 
                paragraph="Say goodbye to complex spreadsheets and overwhelming paperwork. DRAG simplifies financial management, allowing you to effortlessly track expenses, set savings goals, and monitor your progress—all in one convenient place."
            />

            <HighlightCard 
                icon="" 
                head="Smart Budgeting Tools" 
                paragraph="Take control of your finances with our intuitive budgeting tools. With customizable spending categories and real-time insights, you can make informed decisions to optimize your budget and achieve your financial goals faster."
            />
            {/* <HighlightCard 
                icon="" 
                head="Automated Savings Features" 
                paragraph=" Saving money has never been easier. DRAG offers automated savings features such as round-up transactions and recurring transfers, helping you build a healthy savings habit without lifting a finger."
            /> */}
            <HighlightCard 
                icon="" 
                head="Goal-Oriented Approach" 
                paragraph=" Whether you're saving for a vacation, a new home, or retirement, our app empowers you to set specific financial goals and track your progress along the way. Stay motivated and focused as you watch your savings grow steadily over time."
            />
            <HighlightCard 
                icon="" 
                head="Bank-Level Security" 
                paragraph=" Rest assured that your financial data is safe and secure with our state-of-the-art security measures. We employ bank-level encryption and advanced authentication protocols to safeguard your information, providing you with peace of mind as you manage your finances."
            />
        </div>
            {/* <h1 className='lg:text-3xl text-xl px-30 lg:px-60 text-center mt-16'>Experience the convenience and confidence of easy financial management with DRAG. Start your journey towards financial success today! </h1> */}
    </div>
  )
}

export default Highlights
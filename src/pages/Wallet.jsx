import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';
import { selectAllSavings, currentBalance } from '../features/dashSlice';
import { ProgressBar } from "react-step-progress-bar";
const Wallet = () => {
  const isDarkMode = useSelector(selectDarkMode);
  const savings = useSelector(selectAllSavings);
  const initialBalance = useSelector(currentBalance);
  return (
    <div className="flex">
      <div className="w-1/5 hidden md:block"></div>
      <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} md:w-4/5 lg:-mt-8 p-4 md:p-8 lg:p-12`}>
        <h1 className="font-bold xl:text-6xl text-3xl lg:text-5xl border-b border-gray-300">Your Wallet</h1>
        <div className='flex'>
          <div className="w-2/3">
            <h2 className={`bg-gray-50 p-2 text-lg md:text-xl rounded-xl text-black mt-0 md:mt-4`}>Your current balance will last 0 days</h2>
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
          <div className="w-1/3">
          </div>
          </div>
          <section className='lg:w-4/5 mx-auto mt-10'>
        <div onClick="" className='flex justify-between bg-white p-4 rounded-xl hover:border-greenAccent cursor-pointer hover:border-2 gap-2'>
        <div>
          <h2 className='font-extrabold text-2xl mb-4'>Add 1000</h2>
          <p className='text-gray-500 text-base font-normal'>Click to add 1000</p>
        </div>
        <div>
          <h2 className='font-medium text-lg text-gray-500 mb-4'>Drag Account ID</h2>
          <p className='text-base font-normal'></p>
        </div>
        </div>
        <div className="flex flex-row gap-4 mt-4 justify-between">
        <div onClick="" className='flex justify-between bg-white p-4 rounded-xl hover:border-greenAccent cursor-pointer hover:border-2 w-1/2'>
        <div >
          <h2 className='font-extrabold text-2xl mb-4'>Add 500</h2>
          <p className='text-gray-500 text-base font-normal'>Click to add 500</p>
        </div>
        </div>
        <div onClick="" className='flex justify-between bg-white p-4 rounded-xl hover:border-greenAccent cursor-pointer hover:border-2 w-1/2'>
        <div >
          <h2 className='font-extrabold text-2xl mb-4'>Add 500</h2>
          <p className='text-gray-500 text-base font-normal'>Click to add 500</p>
        </div>
        </div>
        </div>        
      </section>
      </div>
    </div>
  )
}

export default Wallet
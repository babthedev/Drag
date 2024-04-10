import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';
import SavingsTracker from './SavingsTracker';
const Reports = () => {
  const isDarkMode = useSelector(selectDarkMode);
  return (
    <div className="flex ">
      <div className="w-1/5 hidden md:block"></div>
      <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} md:w-4/5 lg:-mt-8 p-4 md:p-8 lg:p-12`}>
      <h1 className="font-bold xl:text-6xl text-3xl lg:text-5xl border-b border-gray-300">Your Reports</h1>
      <div className="flex flex-col lg:flex-row gap-16 mt-8">
      <div className={`flex flex-col justify-center items-center gap-2`}>
                                <h1 className={`p-2 md:p-4 rounded-full ${isDarkMode ? "text-white bg-black" : " text-black bg-white"}`}>12</h1>
                                <h1 className=" text-base text-wrap md:text-2xl">Number of Savings</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <h1 className={`p-2 md:p-4 rounded-full ${isDarkMode ? "text-white bg-black" : " text-black bg-white"}`}>12</h1>
                                <h1 className=" text-base mt-2 text-wrap md:text-2xl">Completed Savings</h1>
                            </div>
                            <div className="flex flex-col justify-center items-center gap-2">
                                <h1 className={`p-2 md:p-4 rounded-full ${isDarkMode ? "text-white bg-black" : " text-black bg-white"}`}>12</h1>
                                <h1 className=" text-base mt-2 text-wrap md:text-2xl">Ongoing Savings</h1>
                            </div>
                </div>
              <SavingsTracker/>
      </div>

    </div>
  )
}

export default Reports
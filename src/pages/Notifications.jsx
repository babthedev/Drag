import { useSelector } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';
import NotificationCard from './NotificationCard';

const Notifications = () => {
  const isDarkMode = useSelector(selectDarkMode);
  return (
    <div className="flex"> 
      <div className="w-1/5 hidden md:block"></div>
      <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} md:w-4/5 lg:-mt-8 p-4 md:p-8 lg:p-12`}>
      <h1 className="font-bold xl:text-6xl text-3xl lg:text-5xl border-b border-gray-300">Your Notifications</h1>
      <div className='mt-8'> 
      <NotificationCard/>
      <NotificationCard/>
      <NotificationCard/>
      <NotificationCard/>
      <NotificationCard/>
      </div>
      </div>
      
    </div>
  )
}

export default Notifications
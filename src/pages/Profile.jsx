import { useSelector, useDispatch } from 'react-redux';
import { selectDarkMode } from '../features/homeSlice';
import { getAuth } from "firebase/auth";
import UpdateProfile from './UpdateProfile';
import { profiler, toggleUpdateProfile } from '../features/dashSlice';
import "react-step-progress-bar/styles.css";
import { ProgressBar } from "react-step-progress-bar";

const Profile = () => {
  const dispatch = useDispatch()
  const isDarkMode = useSelector(selectDarkMode);
  const update = useSelector(profiler);
  const auth = getAuth();
  const user = auth.currentUser;
  const toggleUpdate = () => {
    const currentUpdate = !update;
    dispatch(toggleUpdateProfile(currentUpdate));
  };
  const handleAddNewClick = () => {
    toggleUpdate();
};
const userData = JSON.parse(localStorage.getItem('userData'));
  return (
    <div className="flex">
      {update && <UpdateProfile user={user}/>}
      <div className="w-1/5 hidden md:block"></div>
      <div className={`${isDarkMode ? "bg-black text-white" : "bg-white text-black"} md:w-4/5 lg:-mt-8 p-4 md:p-8 lg:p-12`}>
      <h1 className="font-bold xl:text-6xl text-3xl lg:text-5xl border-b border-gray-300">Your Profile</h1>
      <div>
        <div className='flex flex-col md:flex-row mt-16 items-center gap-6'>
          <div className='md:w-1/3'>
            {user.photoURL ?  (<img src={user.photoURL} alt="" className='rounded-full' width="200" />) :
            <h3 className='rounded-full text-4xl bg-white w-36 h-36'>{user.displayName ? user.displayName.charAt(0).toUpperCase() : userData.firstName.charAt(0).toUpperCase()}</h3>}
          </div>
          <div className='md:w-1/3'>
            <h2 className='text-2xl lg:text-5xl'>{user.displayName ? user.displayName : userData.firstName}</h2>
            <h2 className='text-xl lg:text-3xl mt-4'>ID: {user.phoneNumber ? user.phoneNumber : 49094929484942}</h2>
            <h2 className='text-xl lg:text-2xl mt-3'>{user.email && user.email}</h2>
          </div>
            <button className={` mx-auto justify-center items-center gap-4 hover:border-2 h-1/3 text-2xl py-4 rounded-lg cursor-pointer lg:mt-6 mt-3  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black "} md:w-1/3 px-4 md:px-0`} onClick={handleAddNewClick}>Edit Profile</button>
          
        </div>
        <div className="flex flex-col md:flex-row mt-16 gap-4">
          <div className='md:w-1/2'>
            <h2 className='text-3xl'>Currency - USD</h2>
            <select name="USD" id="" className='mt-4'>
              <option value="ngn">NGN</option>
            </select>
            <h2 className='text-2xl mt-4'>Balance</h2>
          </div>
          <div className='md:w-1/2 flex flex-col justify-center'>
            <h2 className='text-3xl'>Free tier</h2>
            <p className='text-2xl mt-4'>5 out of 10 Savings credits used</p>
            <ProgressBar
        percent={75}
        filledBackground={`${isDarkMode ? "#fff" : "#000"}`}
      />
            <button className={`w-1/2 mx-auto justify-center items-center gap-4 hover:border-2 py-4 text-2xl rounded-lg cursor-pointer mt-6  ${isDarkMode ? "bg-white text-black hover:bg-black  hover:border-white hover:text-white" : "bg-black hover:text-black text-white hover:bg-white  hover:border-black "} `}>Upgrade</button>
          </div>
        </div>
      </div>
      </div>
    </div>
  )
}

export default Profile
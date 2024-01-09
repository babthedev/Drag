import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import RecentTransaction from './Home/RecentTransaction'

const Profile = ({handleLogout, currentBalance, transactions, displayAllTransactions, setDisplayAllTransactions}) => {
  const [image, setImage] = useState(null);
  const [chooseImage, setChooseImage] = useState(false);
  const loadedData = localStorage.getItem('userData');
  const userData = JSON.parse(loadedData)
  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);

      // Save the image data to localStorage
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => {
        localStorage.setItem('uploadedImage', reader.result);
      };
    }
  };

  useEffect(() => {
    // Load the image from localStorage when the component mounts
    const storedImage = localStorage.getItem('uploadedImage');
    if (storedImage) {
      setImage(storedImage);
    }
  }, []);
  return (
    <div className='relative lg:w-3/5 w-10/12 mx-auto my-8'>
      <div className='flex flex-col md:flex-row justify-between'>
      <div className='md:flex gap-4'>
        {!image && <>
        {!chooseImage ? <button className='border-2 bg-greenAccent text-white  rounded-xl p-2 hover:border-greenAccent hover:text-greenAccent hover:bg-lightGray'
        onClick={()=> setChooseImage(true)}
        >
          Add Image
        </button> :
      (<input
        type="file"
        accept="image/*"
        onChange={handleImageChange}
      />)}
        </>}
      {image && <img src={image} className='rounded-full' width="100px" alt="Your Profile Image" />}
      <div className=''>
      <h2 className='font-extrabold text-3xl lg:py-1'>{userData.firstName} {userData.lastName}</h2>
      <button className='border-2 bg-red-600 text-white  rounded-xl p-2 hover:border-red-600 hover:text-red-600 hover:bg-lightGray' onClick={handleLogout}>LogOut</button>
       </div>
       </div>
     
       <div className='mt-4 md:mt-4'>
       <Link to="/fundmywallet">
        <h2 className='md:border-gray-300 md:px-2 md:border-2 rounded-lg text-lg lg:text-2xl lg:px-3 lg:py-1 hover:border-greenAccent cursor-pointer '><span className='hidden lg:inline '>Current</span> Balance: #{currentBalance.toFixed(2)}</h2>
        </Link>
        <p className='text-lg lg:px-3'><span className='hidden lg:inline'>Account</span> ID: {userData.phone}</p>
      </div>
      </div>
        <p className='text-lg lg:px-3 mt-3'><span className='hidden lg:inline'></span> Email: {userData.email}</p>

      <section className='mt-8'>
        <div className="flex mb-2 justify-between">
        <h2 className=''>Transaction History</h2>
        <h2 className='cursor-pointer hover:text-gray-600 hover:border-b-2 hover:border-gray-600' onClick={() => setDisplayAllTransactions(!displayAllTransactions)}>{displayAllTransactions ? 'See less>' : 'See more>'}</h2>
        </div>
        <section className=''>
          <RecentTransaction transactions={displayAllTransactions ? transactions : transactions.slice(0, 5)} />
        </section>

      </section>
    </div>
  )
}

export default Profile
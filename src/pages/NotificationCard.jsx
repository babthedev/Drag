import React from 'react'


const NotificationCard = ({handleAddNew, toggleAction, handleAction}) => {
  return (
    <div className=''>
      <div className='px-2 py-1 bg-white mb-2 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl hover:border-greenAccent hover:border-2 cursor-pointer' onClick={handleAction}>
      <div className="flex justify-between">  
      <p className='text-green-600 lg:text-xl'>Savings Complete</p>  
      <p className='text-gray-600 lg:text-xl'>Two days ago</p>
      </div>
      <div className="flex justify-between">
      <h2 className=' lg:text-xl'>Refridgerator</h2>   
      <p className='text-gray-600 lg:text-xl'>#50000</p>
      </div>
      </div>

      {toggleAction && <div className="flex justify-end gap-4 ml-auto px-2 py-1 bg-white mb-2 -mt-1 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl">
      <h2 className='text-red-600 my-auto cursor-pointer  hover:border-red-600 hover:border-2 rounded-xl p-2 hover:text-red-600 hover:bg-lightGray'>Cancel Saving</h2>   
      <button className='border-2 bg-green-600 text-white  rounded-xl p-2 hover:border-green-600 hover:text-green-600 hover:bg-lightGray' onClick={handleAddNew}>Take Action</button>
      </div>}
    </div>
  )
}

export default NotificationCard
import React from 'react'
import { formatDistanceToNow } from 'date-fns';

const SavingCard = ({saving, onDelete, progressPercentage, onEdit }) => {
  const { id, title, amount, daily } = saving;
    const handleDelete = () => {
      // Call onDelete with the id of the saving to be deleted
      onDelete(saving.id);
    };
    const handleEdit = () => {
      // Call onEdit with the current saving when Edit button is clicked
      onEdit(saving);
    };
  return (
    <div className={saving.progress === 100 ? `py-3 bg-white border-2 border-greenAccent  rounded-lg w-72 lg:w-96 lg:p-6 px-4` : `py-3 bg-white  rounded-lg w-72 lg:w-96 lg:p-6 px-4`}>
      <div className='flex flex-row justify-between mb-2'>
        <h2 className='font-medium text-lg'>{title}</h2>
        <h2 className='font-medium text-lg'>#{amount}</h2>
      </div>
      <p className='text-gray-600 mb-10'>Set Time: 
       {' '}{formatDistanceToNow(
              new Date(saving.id),
              {
                addSuffix: true,
                includeSeconds: true,
                includeMinutes: true,
                includeHours: true,
                includeDays: true,
                includeWeeks: true,
                includeMonths: true,
                includeYears: true,
              }
            )}
            
      </p>
      <div className="flex justify-between">
      <div>
      <p className='text-gray-600'>Daily Savings: #{daily}</p>
      <p className='text-gray-600'>Progress {progressPercentage.toFixed(2)}%</p>
      </div>
      <div>
      <p className='text-gray-600 cursor-pointer' onClick={handleEdit}>Edit</p>
      <p className='text-red-600 cursor-pointer' onClick={handleDelete}>Delete</p>
      </div>
      </div>
    </div>
  )
}

export default SavingCard
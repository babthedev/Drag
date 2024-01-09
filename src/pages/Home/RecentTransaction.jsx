import React from 'react'
import { formatDistanceToNow } from 'date-fns';

const RecentTransaction = ({ transactions = [] }) => {
  return (
    <div className=''>
      {/* <h2>Recent Transactions</h2> */}
      <ul>
        {transactions.map((transaction) => (
          <li key={transaction.timestamp} className='px-2 py-1 bg-white mb-2 lg:px-4 lg:py-2 rounded-lg lg:rounded-xl'>
            <div className="flex justify-between">
              <h2 className=''>{transaction.title}</h2>   
              <p className='text-gray-600'>#{transaction.amount}</p>
              </div>
              <div className="flex justify-between">  
              <p className={transaction.type === 'Credit' ? 'text-green-600' : 'text-red-600'}>{transaction.type}</p>  
              <p className='text-gray-600'>{formatDistanceToNow(
              new Date(transaction.timestamp),
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
            )}</p>
          </div>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default RecentTransaction;
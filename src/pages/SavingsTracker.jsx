import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { selectDarkMode } from '../features/homeSlice';
import { selectAllSavings } from '../features/dashSlice';

const SavingsTracker = () => {
  const [chartData, setChartData] = useState([]);
  const isDarkMode = useSelector(selectDarkMode);
  const savings = useSelector(selectAllSavings);

  useEffect(() => {
    const currentDate = new Date();
    const data = [];
    
    for (let i = 4; i >= 0; i--) {
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() - i);
      const savingsForDate = savings.filter(saving => {
        const savingDate = new Date(saving.date);
        return savingDate.toDateString() === date.toDateString();
      });
      data.push({
        date: date.toLocaleDateString(),
        savings: savingsForDate.length,
      });
    }
    
    setChartData(data);
  }, [savings]);

  // Track the number of new savings targets entered by each user every day for the last 5 days
  const dailySavingsCounts = chartData.map(item => item.savings);

  return (
    <div className="overflow-hidden rounded-lg shadow-md">
      <div className="p-4 md:p-6 lg:p-8">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold mb-4">Savings Tracker</h2>
        <div className="w-full h-96 md:h-80 lg:h-96">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="savings" fill={isDarkMode ? "#ffffff" : "#000000"} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default SavingsTracker;

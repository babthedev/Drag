import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';
import { selectDarkMode } from '../features/homeSlice';
import { selectAllSavings } from '../features/dashSlice';

const SavingsTracker = () => {
  const isDarkMode = useSelector(selectDarkMode);
  const savings = useSelector(selectAllSavings);
  const [renderedBalance, setRenderedBalance] = useState(0);
  console.log(savings);

  useEffect(() => {
    // Fetch current date
    const currentDate = new Date();

    // Generate data for 5 consecutive days
    const data = [];
    for (let i = 0; i < 5; i++) {
      // Calculate date for each day
      const date = new Date(currentDate);
      date.setDate(currentDate.getDate() + i);

      // Filter savings for the current date
      const savingsForDate = savings.filter(saving => {
        const savingDate = new Date(saving.date);
        return savingDate.toDateString() === date.toDateString();
      });

      // Push data for the current date
      data.push({
        date: date.toLocaleDateString(), // Format date as string
        savings: savingsForDate.length, // Number of savings for the current date
      });
    }

    // Set the data for the chart
    setChartData(data);
  }, [savings]);

  const [chartData, setChartData] = useState([]);

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

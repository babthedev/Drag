import { useState, useEffect } from "react"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import Login from "./components/Login"
import Home from "./pages/Home/Home"
import FundMyWallet from "./pages/FundMyWallet"
import Profile from "./pages/Profile"
import NotFound from "./components/NotFound"
import Layout from "./components/Layout"
import Notifications from "./pages/Notifications/Notifications"
function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [savings, setSavings] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(() => {
    const storedBalance = localStorage.getItem('currentBalance');
    return storedBalance ? parseFloat(storedBalance) : 0;
  });
  const logTransaction = (transactionDetails) => {
    // Prepend the new transaction to the existing transactions
    const updatedTransactions = [transactionDetails, ...transactions];
  
    // Keep only the latest 20 transactions
    const latest20Transactions = updatedTransactions.slice(0, 20);
  
    // Update state and local storage with the latest 20 transactions
    setTransactions(latest20Transactions);
    localStorage.setItem('transactions', JSON.stringify(latest20Transactions));
  };
  
  const [transactions, setTransactions] = useState(() => {
    const storedTransactions = localStorage.getItem('transactions');
    return storedTransactions ? JSON.parse(storedTransactions) : [];
  });
  const [displayAllTransactions, setDisplayAllTransactions] = useState(false);
  const totalAmount = savings.reduce((acc, saving) => acc + parseFloat(saving.daily), 0);

  useEffect(() => {
    // Check local storage on component mount
    const userData = JSON.parse(localStorage.getItem('userData'));

    // Update login status based on local storage data
    setLoggedIn(!!userData);
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    // Clear data from local storage
    localStorage.removeItem('userData');
    localStorage.removeItem('currentBalance');
    localStorage.removeItem('transactions');
    localStorage.removeItem('newTarget');
    localStorage.removeItem('uploadedImage');
    
    // Update login status to false
    setLoggedIn(false);
  };

  const handleLargeIncrement = () => {
    const incrementAmount = 1000;

    // Update current balance
    setCurrentBalance((prevBalance) => {
      const newBalance = prevBalance + incrementAmount;

      // Save the updated balance to localStorage
      localStorage.setItem('currentBalance', newBalance.toString());

      return newBalance;
    });

    // Log transaction details
    logTransaction({
      title: 'Balance Increased',
      type: 'Credit',
      amount: incrementAmount,
      timestamp: new Date().toISOString(),
    });
  };
  const handleSmallIncrement = () => {
    const incrementAmount = 500;

    // Update current balance
    setCurrentBalance((prevBalance) => {
      const newBalance = prevBalance + incrementAmount;

      // Save the updated balance to localStorage
      localStorage.setItem('currentBalance', newBalance.toString());

      return newBalance;
    });

    // Log transaction details
    logTransaction({
      title: 'Balance Increased',
      type: 'Credit',
      amount: incrementAmount,
      timestamp: new Date().toISOString(),
    });
  };
   return (
    <>
    
    <Router>
      <Routes>
      {loggedIn ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Home 
            currentBalance={currentBalance} 
            setCurrentBalance={setCurrentBalance} 
            logTransaction={logTransaction} 
            transactions={transactions} 
            setTransactions={setTransactions} 
            displayAllTransactions={displayAllTransactions} 
            setDisplayAllTransactions={setDisplayAllTransactions}
            savings={savings}
            totalAmount={totalAmount}
            setSavings={setSavings}
            />} 
            />
            <Route path="*" element={<NotFound />} />
            <Route path="fundmywallet" element={<FundMyWallet 
            handleSmallIncrement={handleSmallIncrement} 
            handleLargeIncrement={handleLargeIncrement} 
            currentBalance={currentBalance} 
            totalAmount={totalAmount}
            />} 
            />
            <Route path="profile" element={<Profile 
            handleLogout={handleLogout} 
            currentBalance={currentBalance} 
            transactions={transactions}  
            displayAllTransactions={displayAllTransactions} 
            setDisplayAllTransactions={setDisplayAllTransactions}
            />} 
            />
            <Route path="notifications" element={<Notifications />} />
        </Route>
        ) : (
          <Route path="*" element={<Login />} />
        )}
      </Routes>
    </Router>
    
    </>
  )
}

export default App

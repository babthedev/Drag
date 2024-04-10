import { useState, useEffect } from "react";
import Homepage from "./homepage/Homepage";
import Wallet from "./pages/Wallet";
import Reports from "./pages/Reports";
import {useSelector} from "react-redux"
import { selectDarkMode } from './features/homeSlice';
import Layout from "./pages/Layout";
import Notifications from "./pages/Notifications";
import Profile from "./pages/Profile";
// import NotFound from "./pages/NotFound";
import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import Dashboard from "./pages/Dashboard";
import Login from "./Login/Login"; // Import the Login page component
import SignUp from "./Login/SignIn"; // Import the SignUp page component
import firebaseConfig from './firebase'; // Import Firebase configuration
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { initializeApp } from "firebase/app";
import ResetPassword from "./Login/ResetPassword";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const isDarkMode = useSelector(selectDarkMode);
  useEffect(() => {
    initializeApp(firebaseConfig)
  }, []);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setLoggedIn(true);
      } else {
        setLoggedIn(false);
      }
    });

    return () => unsubscribe();
  }, []);
  useEffect(() => {
    const body = document.getElementsByTagName("body")[0];
    if (isDarkMode) {
      body.classList.add("black");
    } else {
      body.classList.remove("black");
    }
  }, [isDarkMode]);
  return (
    <main className={`${isDarkMode ? "bg-white" : "bg-black "}`}>
      <Router>
      <Routes>
        {loggedIn ? (
          <Route path="/" element={<Layout />}>
            <Route index element={<Dashboard />} />
            <Route path="wallet" element={<Wallet />} />
            <Route path="notifications" element={<Notifications />} />
            <Route path="profile" element={<Profile />} />
            <Route path="reports" element={<Reports />} />
            <Route path="*" element={<Navigate to="/" />} />
          </Route>
        ) : (
          <>
            <Route path="/" element={<Homepage />} />
            <Route path="/login" element={<Login setLoggedIn={setLoggedIn} />} />
            <Route path="/signup" element={<SignUp setLoggedIn={setLoggedIn} />} />
            <Route path="/reset" element={<ResetPassword setLoggedIn={setLoggedIn} />} />
            <Route path="*" element={<Navigate to="/login" />} />
          </>
        )}
      </Routes>
    </Router>
    </main>
  )
}

export default App;

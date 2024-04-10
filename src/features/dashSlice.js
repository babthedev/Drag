import { createSlice } from "@reduxjs/toolkit";
import { getFirestore, collection, getDocs, updateDoc, deleteDoc, doc, addDoc } from 'firebase/firestore';
import { initializeApp } from "firebase/app";
import { getAuth, onAuthStateChanged  } from "firebase/auth";
import firebaseConfig from "../firebase";
import { toast } from 'react-toastify';

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app)

// const getUserSavingsCollectionRef = (userId) =>collection(db, `users/${userId}/savings`)



const initialState = {
    addNew: false,
    updateProfile: false,
    mobileNav: true,
    currentBalance: 10000, // Assuming initial balance is 10000
    savings: [],
};

const calculateProgress = (amountSaved, targetAmount) => {
    return Math.min((amountSaved / targetAmount) * 100);
};

const dashSlice = createSlice({
    name: "dashboard",
    initialState,
    reducers: {
        initializeSavings(state, action) {
            state.savings = action.payload;
        },
        toggleAddSavings(state, action) {
            state.addNew = action.payload;
        },
        toggleUpdateProfile(state, action) {
            state.updateProfile = action.payload;
        },
        toggleMobileNav(state, action) {
            state.mobileNav = action.payload;
        },
        savingAdded(state, action) {
            state.savings.push({ ...action.payload, progress: 0, amountSaved: 0 });
        },
        updateSaving(state, action) {
            const { id, amount, daily, title, amountSaved, progress } = action.payload;
            const savingIndex = state.savings.findIndex(saving => saving.id === id);
            if (savingIndex !== -1) {
                const progress = calculateProgress(amountSaved, amount);
                state.savings[savingIndex] = {
                    ...state.savings[savingIndex],
                    amount,
                    daily,
                    title,
                    amountSaved,
                    progress,
                };

                if (progress === 100) {
                    toast.success(`Congratulations! ${title} reached 100% progress.`);
                }
            }
        },
        updateAmountSaved(state, action){
            const { id, daily } = action.payload;
            const savingIndex = state.savings.findIndex(saving => saving.id === id);
            if (savingIndex !== -1) {
              const currentAmountSaved = state.savings[savingIndex].amountSaved;
              const updatedAmountSaved = currentAmountSaved + daily;
              state.savings[savingIndex].amountSaved = updatedAmountSaved;
              const progress = Math.min((updatedAmountSaved / state.savings[savingIndex].amount) * 100, 100);
              state.savings[savingIndex].progress = progress;
          
              if (progress === 100) {
                // toast.success(`Congratulations! ${state.savings[savingIndex].title} reached 100% progress.`);
                // Dynamically update the total daily amount when a saving target reaches its target amount
                state.totalDailyAmount -= daily;
              }
            }
          },
        deleteSaving(state, action) {
            state.savings = state.savings.filter(saving => saving.id !== action.payload);
        },
        updateBalance(state, action) {
            state.currentBalance = action.payload;
        },
    }
});

export const { toggleAddSavings, savingAdded, updateSaving, updateAmountSaved, deleteSaving, initializeSavings, updateBalance, toggleMobileNav, toggleUpdateProfile } = dashSlice.actions;


  

export const fetchInitialSavings = () => async (dispatch) => {
    try {
        let userId;
        // Listen for authentication state changes
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                userId = user.uid;
                const savingsCollectionRef = collection(db, `users/${userId}/savings`);
                const snapshot = await getDocs(savingsCollectionRef);
                let savingsData = [];
                snapshot.docs.forEach((doc) => {
                    const data = doc.data();
                    const parsedAmount = parseFloat(data.amountSaved || 0);
                    const parsedProgress = parseFloat(data.progress || 0);
                    savingsData.push({ ...data, id: doc.id, amountSaved: parsedAmount, progress: parsedProgress });
                });
                dispatch(initializeSavings(savingsData));
            } else {
                console.log("No user is currently signed in.");
            }
        });
    } catch (error) {
        console.error("Error fetching initial savings: ", error);
        toast.error("Error fetching initial savings data");
    }
};
export const fetchInitialBalance = () => async (dispatch) => {
    try {
        let userId;
        // Listen for authentication state changes
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                userId = user.uid;
                const balanceCollectionRef = collection(db, `users/${userId}/balance`);
                const snapshot = await getDocs(balanceCollectionRef);
                console.log(snapshot);
                let balance = 0;
                // snapshot.docs.forEach((doc) => {
                //     savingsData.push({ ...doc.data(), id: doc.id });
                // });
                // dispatch(initializeSavings(savingsData));
            } else {
                console.log("No user is currently signed in.");
            }
        });
    } catch (error) {
        console.error("Error fetching initial savings: ", error);
        toast.error("Error fetching initial savings data");
    }
};


export const addNewSavingFirestore = (savingData) => async (dispatch) => {
    try {
        let userId;
        // Listen for authentication state changes
        onAuthStateChanged(auth, async (user) => {
            if (user) {
                userId = user.uid;
                const savingsCollectionRef = collection(db, `users/${userId}/savings`);

                const { amount, daily, amountSaved, progress } = savingData;
                savingData.amount = parseInt(amount);
                savingData.daily = parseInt(daily);
                savingData.amountSaved = parseInt(amountSaved);
                savingData.progress = parseInt(progress);

                const docRef = await addDoc(savingsCollectionRef, savingData);
                dispatch(savingAdded({ ...savingData, id: docRef.id }));
                toast.success("Saving Added Successfully");
            } else {
                console.log("No user is currently signed in.");
            }
        });
    } catch (error) {
        console.error("Error adding document: ", error);
        toast.error("Failed to add new saving");
    }
};


export const updateSavingFirestore = (id, updatedData) => async (dispatch) => {
    try {
        const auth = getAuth(app);
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
            console.log("User ID:", userId);
            if (typeof id === 'string' && id.trim() !== '') { // Check if id is a non-empty string
                // console.log("Valid document ID detected.");
                const { amount, daily, amountSaved, progress } = savingData;
                savingData.amount = parseInt(amount);
                savingData.daily = parseInt(daily);
                savingData.amountSaved = parseInt(amountSaved);
                savingData.progress = parseInt(progress);
                
                const savingsCollectionRef = collection(db, `users/${userId}/savings`);
                await updateDoc(doc(savingsCollectionRef, id), updatedData);
                dispatch(updateSaving({ id, ...updatedData }));
                toast.success("Saving Updated Successfully");
            } else {
                console.error("Invalid document ID:", id);
                throw new Error("Invalid document ID");
            }
        } else {
            console.error("No user is currently signed in.");
            throw new Error("User not authenticated");
        }
    } catch (error) {
        console.error("Error updating document: ", error);
        toast.error("Failed to update saving");
    }
};



export const deleteSavingFirestore = (id) => async (dispatch, getState) => {
    try {
        const auth = getAuth(app);
        const currentUser = auth.currentUser;
        if (currentUser) {
            const userId = currentUser.uid;
            console.log("Deleting document with ID:", id);
            if (typeof id === 'string' && id.trim() !== '') { // Check if id is a non-empty string
                console.log("Valid document ID detected.");
                const savingsCollectionRef = collection(db, `users/${userId}/savings`);
                await deleteDoc(doc(savingsCollectionRef, id));
                dispatch(deleteSaving(id));
                toast.success("Saving Deleted Successfully");
            } else {
                console.error("Invalid document ID:", id);
                throw new Error("Invalid document ID");
            }
        } else {
            console.error("No user is currently signed in.");
            throw new Error("User not authenticated");
        }
    } catch (error) {
        console.error("Error deleting document: ", error);
        toast.error("Failed to delete saving");
    }
};






export const selectAllSavings = (state) => state.dashboard.savings;
export const addNewSaving = (state) => state.dashboard.addNew;
export const profiler = (state) => state.dashboard.updateProfile;
export const mobileNavClick = (state) => state.dashboard.mobileNav;
export const currentBalance = (state) => state.dashboard.currentBalance;

export default dashSlice.reducer;

import React from 'react';
import ReactDOM from "react-dom/client";
import App from './App';
import './index.css';
import {store} from './app/store'; // Change the import to use default export
import { Provider } from 'react-redux';
import {thunk} from 'redux-thunk';
import { fetchInitialSavings } from './features/dashSlice';

// Dispatch fetchInitialSavings action to fetch initial savings data from Firestore
store.dispatch(fetchInitialSavings());

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Provider store={store}>
      <App />
    </Provider>
  </React.StrictMode>
);

// homeSlice.js

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  isDarkMode: false,
};

const homeSlice = createSlice({
  name: 'homepage', //  the slice name to match the configured reducer name in the store
  initialState,
  reducers: {
    toggleDarkMode(state, action) {
      state.isDarkMode = action.payload; //  the state based on the payload
    },
  },
});

export const { toggleDarkMode } = homeSlice.actions;
export const selectDarkMode = (state) => state.homepage.isDarkMode; //  selector to match the slice name

export default homeSlice.reducer;

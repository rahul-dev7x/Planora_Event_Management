import { createSlice } from "@reduxjs/toolkit";

const initialState = {
 
  totalEvents: 0,
  totalAttendees: 0,
  totalRevenue: 0,
};

const dashboardSlice = createSlice({
  name: "dashInfo",
  initialState,
  reducers: {
    
    setTotalEvents: (state, action) => {
      state.totalEvents = action.payload;
    },
    setTotalAttendees: (state, action) => {
      state.totalAttendees = action.payload;
    },
    setTotalRevenue: (state, action) => {
      state.totalRevenue = action.payload;
    },
  },
});

export const { setTotalEvents, setTotalAttendees, setTotalRevenue } = dashboardSlice.actions;

export default dashboardSlice.reducer;

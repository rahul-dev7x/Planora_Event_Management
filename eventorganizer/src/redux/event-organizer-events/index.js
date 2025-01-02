import { createSlice } from "@reduxjs/toolkit";

const initialState={
    org_events:[],
    single_org_event:null,
    attendees_info:null
}

const orgEventsSlice = createSlice({
    name: "orgEvent",
    initialState,
    reducers: {
      setOrganizerEvents: (state, action) => {
        state.org_events= action.payload;
      },
      setSingleOrgEvent:(state,actions)=>{
        state.single_org_event=actions.payload;
      },setAttendeesOrgEvent:(state,action)=>{
        state.attendees_info=action.payload;
      }
      
    },
  });
  export const { setOrganizerEvents ,setSingleOrgEvent,setAttendeesOrgEvent} = orgEventsSlice.actions;
  
  
 
  export default orgEventsSlice.reducer;
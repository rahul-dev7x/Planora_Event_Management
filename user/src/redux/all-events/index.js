import { createSlice } from "@reduxjs/toolkit";

const initialState={
    all_events:[],
    filters:{
      search_keyword:"",
      date:"",
      location:"",
      ticket_price:""
    },single_event:null
}

const eventSlice = createSlice({
    name: "allEvent",
    initialState,
    reducers: {
      setAllEvents: (state, action) => {
        state.all_events= action.payload;
      },
      setFilter:(state,action)=>{
        state.filters={...state.filters,...action.payload}
      },
      setSingleEvent:(state,actions)=>{
        state.single_event=actions.payload
      }
      
    },
  });
  export const { setAllEvents,setFilter ,setSingleEvent} = eventSlice.actions;
  
  
 
  export default eventSlice.reducer;
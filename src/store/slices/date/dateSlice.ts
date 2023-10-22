import { createSlice } from '@reduxjs/toolkit';
import { DateInterface } from './dateInterface';


const initialState : DateInterface = {
  date: '',
  dateStatus: '',
}
const dateSlice = createSlice({

  name: 'date',
  initialState,
  reducers: {

    dateLoading(state) {
      state.dateStatus = 'loading';
    },
    dateAll( state, action) {
      state.date = action.payload;
      state.dateStatus = 'full';
    },
  }
});

export const { dateAll, dateLoading } = dateSlice.actions;

export default dateSlice.reducer;
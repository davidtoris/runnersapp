import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from './winnersInterface';


const initialState : UserInterface = {
  winners: null,
  winnerLoading: false,
}
const userSlice = createSlice({

  name: 'user',
  initialState,
  reducers: {

    winners( state, action) {
      state.winners = action.payload;
      state.winnerLoading = false;
    },
    winnerLoading(state, action) {
      state.winnerLoading = action.payload;
    },
  }
});

export const { winners, winnerLoading } = userSlice.actions;

export default userSlice.reducer;
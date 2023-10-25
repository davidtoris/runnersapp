import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from './userInterface';


const initialState : UserInterface = {
  users: null,
  userItem: null,
  userFounded: null,

  userLoading: false,
  userStatus: null,
}
const userSlice = createSlice({

  name: 'user',
  initialState,
  reducers: {

    userAll( state, action) {
      state.users = action.payload;
      state.userLoading = false;
    },
    userItem( state, action) {
      state.userItem = action.payload;
      state.userLoading = false;
    },
    userFounded( state, action ) {
      state.userFounded = action.payload;
    },
    userLoading(state, action) {
      state.userLoading = action.payload;
    },
    userStatusFunc( state, action ) {
      state.userStatus = action.payload;
      state.userLoading = false;
    },
  }
});

export const { userAll, userItem, userFounded, userStatusFunc, userLoading } = userSlice.actions;

export default userSlice.reducer;
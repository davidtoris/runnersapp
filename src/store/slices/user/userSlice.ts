import { createSlice } from '@reduxjs/toolkit';
import { UserInterface } from './userInterface';


const initialState : UserInterface = {
  users: null,
  userItem: null,
  userStatus: '',
  userUpdate: false,
  userFounded: null,
  userRespStatus: null,
}
const userSlice = createSlice({

  name: 'user',
  initialState,
  reducers: {

    userLoading(state) {
      state.userStatus = 'loading';
    },
    userAll( state, action) {
      state.users = action.payload;
      state.userStatus = 'full';
    },
    userItem( state, action) {
      state.userItem = action.payload;
      state.userStatus = 'full';
    },
    userUpdate( state, action ) {
      state.userUpdate = action.payload;
    },
    userRespStatusAct( state, action ) {
      state.userRespStatus = action.payload;
    },
    userFounded( state, action ) {
      state.userFounded = action.payload;
    },
    userError(state) {
      state.userStatus = 'error'; 
    }
  }
});

export const { userAll, userItem, userUpdate, userRespStatusAct, userFounded, userLoading, userError } = userSlice.actions;

export default userSlice.reducer;
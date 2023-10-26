import { createSlice } from '@reduxjs/toolkit';

interface PathInterface {
  path: string;
}

const initialState : PathInterface = {
  path: '',
}
const pathSlice = createSlice({

  name: 'path',
  initialState,
  reducers: {

    pathFunc(state, action) {
      state.path = action.payload;
    },
  }
});

export const { pathFunc } = pathSlice.actions;

export default pathSlice.reducer;
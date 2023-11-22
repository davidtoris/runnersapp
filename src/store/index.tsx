import { configureStore } from '@reduxjs/toolkit';
import userReducer from './slices/user/userSlice';
import imagesReducer from './slices/images/imagesSlice';
import dateReducer from './slices/date/dateSlice';
import pathReducer from './slices/path/pathSlice';


import { useDispatch, TypedUseSelectorHook, useSelector } from 'react-redux';

export const store = configureStore({
  reducer: {
    pathData: pathReducer,
    dateData: dateReducer,
    userData: userReducer,
    imagesData: imagesReducer,
  },
})

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch: () => AppDispatch = useDispatch;
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
import { configureStore } from '@reduxjs/toolkit';
import userReducer from './userReducer/userReducer';

export const store = configureStore({
  reducer: {
    userReducer,
  },
});

export type StateType = ReturnType<typeof store.getState>;
export type DispatchType = typeof store.dispatch;

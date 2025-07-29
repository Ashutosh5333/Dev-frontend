
import { configureStore } from '@reduxjs/toolkit';
import authReducer from "./AuthSlice/authSlice"
import projectReducer from './ProjectSlice/projectSlice';
import userSlicereducer from './userSlice/userSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    project: projectReducer,
    user:userSlicereducer
  },
});

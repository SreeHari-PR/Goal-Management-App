import { configureStore } from '@reduxjs/toolkit'
import authReducer from '../features/auth/authSlice'
import goalReducer from '../features/goals/goalSlice'
import adminReducer from '../features/adminauth/adminAuthSlice'

export const store = configureStore({
  reducer: {
    auth: authReducer,
    goals: goalReducer,
    adminAuth:adminReducer
  },
})
import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import hostelReducer from './slices/hostelSlice';
import bookingReducer from './slices/bookingSlice';

const store = configureStore({
  reducer: {
    auth: authReducer,
    hostels: hostelReducer,
    bookings: bookingReducer
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }),
});

export default store; 
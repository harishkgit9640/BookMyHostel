import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { bookingAPI } from '../../services/api';

// Async thunks
export const fetchUserBookings = createAsyncThunk(
  'bookings/fetchUserBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.getUserBookings();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch bookings' });
    }
  }
);

export const fetchAllBookings = createAsyncThunk(
  'bookings/fetchAllBookings',
  async (_, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.getAllBookings();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch bookings' });
    }
  }
);

export const createBooking = createAsyncThunk(
  'bookings/createBooking',
  async (bookingData, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.createBooking(bookingData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create booking' });
    }
  }
);

export const updateBooking = createAsyncThunk(
  'bookings/updateBooking',
  async ({ id, bookingData }, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.updateBooking(id, bookingData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update booking' });
    }
  }
);

export const cancelBooking = createAsyncThunk(
  'bookings/cancelBooking',
  async (id, { rejectWithValue }) => {
    try {
      const response = await bookingAPI.cancelBooking(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to cancel booking' });
    }
  }
);

const initialState = {
  bookings: [],
  userBookings: [],
  currentBooking: null,
  loading: false,
  error: null
};

const bookingSlice = createSlice({
  name: 'bookings',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentBooking: (state) => {
      state.currentBooking = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch User Bookings
      .addCase(fetchUserBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUserBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings = action.payload;
      })
      .addCase(fetchUserBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch bookings';
      })
      // Fetch All Bookings
      .addCase(fetchAllBookings.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllBookings.fulfilled, (state, action) => {
        state.loading = false;
        state.bookings = action.payload;
      })
      .addCase(fetchAllBookings.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch bookings';
      })
      // Create Booking
      .addCase(createBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createBooking.fulfilled, (state, action) => {
        state.loading = false;
        state.userBookings.push(action.payload);
      })
      .addCase(createBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create booking';
      })
      // Update Booking
      .addCase(updateBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userBookings.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.userBookings[index] = action.payload;
        }
        if (state.currentBooking?._id === action.payload._id) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(updateBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update booking';
      })
      // Cancel Booking
      .addCase(cancelBooking.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(cancelBooking.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.userBookings.findIndex(b => b._id === action.payload._id);
        if (index !== -1) {
          state.userBookings[index] = action.payload;
        }
        if (state.currentBooking?._id === action.payload._id) {
          state.currentBooking = action.payload;
        }
      })
      .addCase(cancelBooking.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to cancel booking';
      });
  }
});

export const { clearError, clearCurrentBooking } = bookingSlice.actions;
export default bookingSlice.reducer; 
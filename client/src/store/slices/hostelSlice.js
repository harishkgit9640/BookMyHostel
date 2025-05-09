import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { hostelAPI } from '../../services/api';

// Async thunks
export const fetchHostels = createAsyncThunk(
  'hostels/fetchHostels',
  async (_, { rejectWithValue }) => {
    try {
      const response = await hostelAPI.getAllHostels();
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch hostels' });
    }
  }
);

export const fetchHostelById = createAsyncThunk(
  'hostels/fetchHostelById',
  async (id, { rejectWithValue }) => {
    try {
      const response = await hostelAPI.getHostelById(id);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to fetch hostel' });
    }
  }
);

export const createHostel = createAsyncThunk(
  'hostels/createHostel',
  async (hostelData, { rejectWithValue }) => {
    try {
      const response = await hostelAPI.createHostel(hostelData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to create hostel' });
    }
  }
);

export const updateHostel = createAsyncThunk(
  'hostels/updateHostel',
  async ({ id, hostelData }, { rejectWithValue }) => {
    try {
      const response = await hostelAPI.updateHostel(id, hostelData);
      return response.data.data;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to update hostel' });
    }
  }
);

export const deleteHostel = createAsyncThunk(
  'hostels/deleteHostel',
  async (id, { rejectWithValue }) => {
    try {
      await hostelAPI.deleteHostel(id);
      return id;
    } catch (error) {
      return rejectWithValue(error.response?.data || { message: 'Failed to delete hostel' });
    }
  }
);

const initialState = {
  hostels: [],
  currentHostel: null,
  loading: false,
  error: null
};

const hostelSlice = createSlice({
  name: 'hostels',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
    clearCurrentHostel: (state) => {
      state.currentHostel = null;
    }
  },
  extraReducers: (builder) => {
    builder
      // Fetch All Hostels
      .addCase(fetchHostels.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHostels.fulfilled, (state, action) => {
        state.loading = false;
        state.hostels = action.payload;
      })
      .addCase(fetchHostels.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch hostels';
      })
      // Fetch Hostel by ID
      .addCase(fetchHostelById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchHostelById.fulfilled, (state, action) => {
        state.loading = false;
        state.currentHostel = action.payload;
      })
      .addCase(fetchHostelById.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to fetch hostel';
      })
      // Create Hostel
      .addCase(createHostel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createHostel.fulfilled, (state, action) => {
        state.loading = false;
        state.hostels.push(action.payload);
      })
      .addCase(createHostel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to create hostel';
      })
      // Update Hostel
      .addCase(updateHostel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateHostel.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.hostels.findIndex(h => h._id === action.payload._id);
        if (index !== -1) {
          state.hostels[index] = action.payload;
        }
        if (state.currentHostel?._id === action.payload._id) {
          state.currentHostel = action.payload;
        }
      })
      .addCase(updateHostel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to update hostel';
      })
      // Delete Hostel
      .addCase(deleteHostel.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteHostel.fulfilled, (state, action) => {
        state.loading = false;
        state.hostels = state.hostels.filter(h => h._id !== action.payload);
        if (state.currentHostel?._id === action.payload) {
          state.currentHostel = null;
        }
      })
      .addCase(deleteHostel.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || 'Failed to delete hostel';
      });
  }
});

export const { clearError, clearCurrentHostel } = hostelSlice.actions;
export default hostelSlice.reducer; 
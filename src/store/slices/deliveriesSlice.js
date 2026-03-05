import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// Fetch all deliveries
export const fetchDeliveries = createAsyncThunk(
  "deliveries/fetchDeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/deliveries");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch deliveries"
      );
    }
  }
);

// Create new delivery
export const createDelivery = createAsyncThunk(
  "deliveries/createDelivery",
  async (deliveryData, { rejectWithValue }) => {
    try {
      const response = await api.post("/deliveries", deliveryData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create delivery"
      );
    }
  }
);

// Update delivery status
export const updateDeliveryStatus = createAsyncThunk(
  "deliveries/updateStatus",
  async ({ id, status }, { rejectWithValue }) => {
    try {
      const response = await api.patch(`/deliveries/${id}/status`, { status });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to update delivery status"
      );
    }
  }
);

// Delete delivery
export const deleteDeliveryAsync = createAsyncThunk(
  "deliveries/deleteDelivery",
  async (id, { rejectWithValue }) => {
    try {
      await api.delete(`/deliveries/${id}`);
      return id;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to delete delivery"
      );
    }
  }
);

const deliveriesSlice = createSlice({
  name: "deliveries",
  initialState: {
    orders: [],
    loading: false,
    error: null,
  },
  reducers: {
    setDeliveries(state, action) {
      state.orders = action.payload;
    },
    addDelivery(state, action) {
      state.orders.push(action.payload);
    },
    removeDelivery(state, action) {
      state.orders = state.orders.filter(
        (order) => order.id !== action.payload
      );
    },
  },
  extraReducers: (builder) => {
    builder
      // Fetch deliveries
      .addCase(fetchDeliveries.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchDeliveries.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
      })
      .addCase(fetchDeliveries.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Create delivery
      .addCase(createDelivery.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(createDelivery.fulfilled, (state, action) => {
        state.loading = false;
        state.orders.push(action.payload);
      })
      .addCase(createDelivery.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Update delivery status
      .addCase(updateDeliveryStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateDeliveryStatus.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.orders.findIndex((order) => order.id === action.payload.id);
        if (index !== -1) {
          state.orders[index] = action.payload;
        }
      })
      .addCase(updateDeliveryStatus.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      })
      // Delete delivery
      .addCase(deleteDeliveryAsync.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteDeliveryAsync.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order.id !== action.payload);
      })
      .addCase(deleteDeliveryAsync.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setDeliveries, addDelivery, removeDelivery } =
  deliveriesSlice.actions;
export default deliveriesSlice.reducer;

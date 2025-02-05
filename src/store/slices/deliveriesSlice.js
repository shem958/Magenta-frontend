import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk
export const fetchDeliveries = createAsyncThunk(
  "deliveries/fetchDeliveries",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/deliveries");
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      const data = await response.json();
      return data;
    } catch (error) {
      return rejectWithValue(error.message);
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
      });
  },
});

export const { setDeliveries, addDelivery, removeDelivery } =
  deliveriesSlice.actions;
export default deliveriesSlice.reducer;

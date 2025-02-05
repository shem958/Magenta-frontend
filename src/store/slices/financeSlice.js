// src/store/slices/financeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// Define the async thunk
export const fetchFinanceData = createAsyncThunk(
  "finance/fetchFinanceData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await fetch("/api/finance");
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

const initialState = {
  revenue: 0,
  expenses: 0,
  debts: 0,
  loading: false,
  error: null,
};

const financeSlice = createSlice({
  name: "finance",
  initialState,
  reducers: {
    setRevenue(state, action) {
      state.revenue = action.payload;
    },
    setExpenses(state, action) {
      state.expenses = action.payload;
    },
    setDebts(state, action) {
      state.debts = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setError(state, action) {
      state.error = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchFinanceData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchFinanceData.fulfilled, (state, action) => {
        state.loading = false;
        state.revenue = action.payload.revenue;
        state.expenses = action.payload.expenses;
        state.debts = action.payload.debts;
      })
      .addCase(fetchFinanceData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload;
      });
  },
});

export const { setRevenue, setExpenses, setDebts, setLoading, setError } =
  financeSlice.actions;
export default financeSlice.reducer;

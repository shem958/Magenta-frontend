// src/store/slices/financeSlice.js
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import api from "../../lib/api";

// Fetch finance overview data
export const fetchFinanceData = createAsyncThunk(
  "finance/fetchFinanceData",
  async (_, { rejectWithValue }) => {
    try {
      const response = await api.get("/finance");
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch finance data"
      );
    }
  }
);

// Fetch transactions
export const fetchTransactions = createAsyncThunk(
  "finance/fetchTransactions",
  async (params, { rejectWithValue }) => {
    try {
      const response = await api.get("/finance/transactions", { params });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch transactions"
      );
    }
  }
);

// Create transaction
export const createTransaction = createAsyncThunk(
  "finance/createTransaction",
  async (transactionData, { rejectWithValue }) => {
    try {
      const response = await api.post("/finance/transactions", transactionData);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create transaction"
      );
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

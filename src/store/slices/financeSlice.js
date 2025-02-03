// src/store/slices/financeSlice.js
import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setRevenue, setExpenses, setDebts, setLoading, setError } =
  financeSlice.actions;
export default financeSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

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
});

export const { setDeliveries, addDelivery, removeDelivery } =
  deliveriesSlice.actions;
export default deliveriesSlice.reducer;

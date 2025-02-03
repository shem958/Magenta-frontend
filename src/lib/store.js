import { configureStore } from "@reduxjs/toolkit";
import inventoryReducer from "../store/slices/inventorySlice";
import employeesReducer from "../store/slices/employeesSlice";
import financeReducer from "../store/slices/financeSlice";
import deliveriesReducer from "../store/slices/deliveriesSlice";

const store = configureStore({
  reducer: {
    inventory: inventoryReducer,
    employees: employeesReducer,
    finance: financeReducer,
    deliveries: deliveriesReducer,
  },
});

export default store;

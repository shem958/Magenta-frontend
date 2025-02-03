import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  list: [],
  loading: false,
  error: null,
};

const employeesSlice = createSlice({
  name: "employees",
  initialState,
  reducers: {
    setEmployees(state, action) {
      state.list = action.payload;
    },
    addEmployee(state, action) {
      state.list.push(action.payload);
    },
    updateEmployee(state, action) {
      const index = state.list.findIndex((emp) => emp.id === action.payload.id);
      if (index !== -1) {
        state.list[index] = action.payload;
      }
    },
    removeEmployee(state, action) {
      state.list = state.list.filter((emp) => emp.id !== action.payload);
    },
  },
});

export const { setEmployees, addEmployee, updateEmployee, removeEmployee } =
  employeesSlice.actions;
export default employeesSlice.reducer;

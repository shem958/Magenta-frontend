// src/lib/providers/ReduxProvider.js
"use client"; // Mark this as a Client Component

import { Provider } from "react-redux";
import store from "../store";

export default function ReduxProvider({ children }) {
  return <Provider store={store}>{children}</Provider>;
}

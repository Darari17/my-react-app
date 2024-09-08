import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./slice/authSlice";
import productReducer from "./slice/productSlice";
import customerReducer from "./slice/customerSlice";
import transactionReducer from "./slice/transactionSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,
    product: productReducer,
    customer: customerReducer,
    transaction: transactionReducer,
  },
});
window.__REDUX_DEVTOOLS_EXTENSION__ /
  window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__;

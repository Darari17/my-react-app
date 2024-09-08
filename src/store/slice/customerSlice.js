import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getCustomer = createAsyncThunk(
  "customer/getCustomer",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/customers");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const postCustomer = createAsyncThunk(
  "customer/postCustomer",
  async (item, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/customers", item);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const putCustomer = createAsyncThunk(
  "customer/putCustomer",
  async (item, thunkAPI) => {
    try {
      const response = await axiosInstance.put("/customers", item);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const delCustomer = createAsyncThunk(
  "customer/delCustomer",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/customers/${id}`);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const customerSlice = createSlice({
  name: "customer",
  initialState: {
    customers: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getCustomer.fulfilled, (state, action) => {
        state.customers = action.payload;
      })
      .addCase(postCustomer.fulfilled, (state, action) => {
        state.customers.push(action.payload);
      })
      .addCase(putCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(delCustomer.fulfilled, (state, action) => {
        state.customers = state.customers.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});

export default customerSlice.reducer;

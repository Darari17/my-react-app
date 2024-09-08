import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getTranscation = createAsyncThunk(
  "transaction/getTranscation",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/bills");

      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const postTransaction = createAsyncThunk(
  "transaction/postTransaction",
  async (data, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/bills", data);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const getBillDetail = createAsyncThunk(
  "transaction/getBillDetail",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.get(`/bills/${id}`);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const transactionSlice = createSlice({
  name: "transaction",
  initialState: {
    bills: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getTranscation.fulfilled, (state, action) => {
        state.bills = action.payload;
      })
      .addCase(postTransaction.fulfilled, (state, action) => {
        state.bills.push(action.payload);
      })
      .addCase(getBillDetail.fulfilled, (state, action) => {
        state.bills = [...state.bills, action.payload];
      });
  },
});

export default transactionSlice.reducer;

import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { axiosInstance } from "../../lib/axios";

export const getProduct = createAsyncThunk(
  "product/getProduct",
  async (_, thunkAPI) => {
    try {
      const response = await axiosInstance.get("/products");
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const postProduct = createAsyncThunk(
  "product/postProduct",
  async (item, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/products", item);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const putProduct = createAsyncThunk(
  "product/putProduct",
  async (item, thunkAPI) => {
    try {
      const response = await axiosInstance.put("/products", item);
      return response.data.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

export const delProduct = createAsyncThunk(
  "product/delProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axiosInstance.delete(`/products/${id}`);
      return { id };
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  }
);

const productSlice = createSlice({
  name: "product",
  initialState: {
    products: [],
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProduct.fulfilled, (state, action) => {
        state.products = action.payload;
      })
      .addCase(postProduct.fulfilled, (state, action) => {
        state.products.push(action.payload);
      })
      .addCase(putProduct.fulfilled, (state, action) => {
        state.products = state.products.map((item) =>
          item.id === action.payload.id ? action.payload : item
        );
      })
      .addCase(delProduct.fulfilled, (state, action) => {
        state.products = state.products.filter(
          (item) => item.id !== action.payload.id
        );
      });
  },
});

export default productSlice.reducer;

import {createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {getCartItems, postChangeCart} from "../api/cartApi";
import {logout} from "./loginSlice";

export const getCartItemsAsync = createAsyncThunk("getCartItemsAsync", () => {
  return getCartItems();
});

export const postChangeCartAsync = createAsyncThunk("postChangeCartAsync", (param) => {
  return postChangeCart(param);
});

const initState = {items: [], status: ""};

const cartSlice = createSlice({
  name: "cartSlice",
  initialState: initState,
  extraReducers: (builder) => {
    builder
      .addCase(getCartItemsAsync.fulfilled, (state, action) => ({items: action.payload, status: "fulfilled"}))
      .addCase(getCartItemsAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(getCartItemsAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(postChangeCartAsync.fulfilled, (state, action) => ({items: action.payload, status: "fulfilled"}))
      .addCase(postChangeCartAsync.pending, (state) => {
        state.status = "pending";
      })
      .addCase(postChangeCartAsync.rejected, (state) => {
        state.status = "rejected";
      })
      .addCase(logout, () => initState);
  },
});

export default cartSlice.reducer;

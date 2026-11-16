import {configureStore} from "@reduxjs/toolkit";
import loginSlice from "./slices/loginSlice";
import cartSlice from "./slices/cartSlice";

export default configureStore({
  reducer: {
    loginSlice,
    cartSlice,
  },
});

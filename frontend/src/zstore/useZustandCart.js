import {create} from "zustand";
import {getCartItems, postChangeCart} from "../api/cartApi";

const initState = {items: [], status: ""};

const request = async (set, call) => {
  set({status: "pending"});

  try {
    set({items: await call(), status: "fulfilled"});
  } catch (error) {
    console.error(error);
    set({status: "rejected"});
  }
};

const useZustandCart = create((set) => ({
  ...initState,
  getItems: () => request(set, getCartItems),
  requestChangeCart: (cartItem) => request(set, () => postChangeCart(cartItem)),
  reset: () => set({...initState}),
}));

export default useZustandCart;

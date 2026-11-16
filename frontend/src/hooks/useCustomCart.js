import {useEffect} from "react";
import {useDispatch, useSelector} from "react-redux";
import {getCartItemsAsync, postChangeCartAsync} from "../slices/cartSlice";
import useCustomLogin from "./useCustomLogin";

const useCustomCart = () => {
  const {loginState, isLogin} = useCustomLogin();

  const cartItems = useSelector((state) => state.cartSlice);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLogin) {
      dispatch(getCartItemsAsync());
    }
  }, [isLogin, dispatch]);

  const changeCart = (cino, pno, amount) => {
    const email = loginState.email;

    let qty = 1;

    if (cino) {
      const target = cartItems.items.find((item) => item.cino === cino);

      if (target) {
        qty = target.qty + amount;
      }
    }

    dispatch(postChangeCartAsync(cino ? {email, cino, pno, qty} : {email, pno, qty}));
  };

  return {loginState, isLogin, cartItems, changeCart};
};

export default useCustomCart;

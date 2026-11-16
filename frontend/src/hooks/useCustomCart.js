import {useEffect} from "react";
import useZustandCart from "../zstore/useZustandCart";
import useCustomLogin from "./useCustomLogin";

const useCustomCart = () => {
  const {loginState, isLogin} = useCustomLogin();

  const {items, status, getItems, requestChangeCart} = useZustandCart();

  useEffect(() => {
    if (isLogin) {
      getItems();
    }
  }, [isLogin, getItems]);

  const changeCart = (cino, pno, amount) => {
    const email = loginState.email;

    let qty = 1;

    if (cino) {
      const target = items.find((item) => item.cino === cino);

      if (target) {
        qty = target.qty + amount;
      }
    }

    requestChangeCart(cino ? {email, cino, pno, qty} : {email, pno, qty});
  };

  return {loginState, isLogin, cartItems: {items, status}, changeCart};
};

export default useCustomCart;

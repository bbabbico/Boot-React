import useCustomCart from "../../hooks/useCustomCart";
import CartItemComponent from "../cart/CartItemComponent";

const CartComponent = () => {
  const {loginState, isLogin, cartItems, changeCart} = useCustomCart();

  if (!isLogin) {
    return <div className="w-full"/>;
  }

  return (
    <div className="w-full">
      {cartItems.status === "pending" ? <div>Loading....</div> : null}
      {cartItems.status === "fulfilled" ? (
        <>
          <div className="text-2xl">{loginState.email}님 Cart</div>
          <div className="bg-orange-600 text-center text-white font-bold w-1/5 rounded-full m-1">
            {cartItems.items.length}
          </div>
          <ul>
            {cartItems.items.map((item) => (
              <CartItemComponent key={item.cino} cartItem={item} changeCart={changeCart}/>
            ))}
          </ul>
        </>
      ) : null}
    </div>
  );
};

export default CartComponent;

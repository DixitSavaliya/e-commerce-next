"use client";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store";
import {
  removeFromCart,
  updateCartItemQuantity,
} from "../../redux/slices/cartSlice";
import { useRouter } from "next/navigation";
import { IoAddCircle } from "react-icons/io5";
import { FaCircleMinus } from "react-icons/fa6";
import { MdArrowBack } from 'react-icons/md';

const ShoppingCart = () => {
  const router = useRouter();

  const cartItems = useSelector((state: RootState) => state.cart);
  const dispatch = useDispatch();

  const handleRemoveFromCart = (id: number) => {
    dispatch(removeFromCart(id));
  };

  const handleQuantityChange = (id: number, newQuantity: number) => {
    const itemToUpdate = cartItems.find(item => item.id === id);

    if (!itemToUpdate) {
      return;
    }

    const quantity = Math.min(Math.max(0, newQuantity), 99);

    // If quantity is 0, remove the item from the cart
    if (quantity === 0) {
      dispatch(removeFromCart(id));
    } else {
      dispatch(updateCartItemQuantity({ id, quantity }));
    }
  };

  const subtotal = cartItems.reduce(
    (total, item: any) => total + item.price * item.quantity,
    0
  );
  const total = subtotal;

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleBackToShopping = () => {
    router.push('/');
  };

  return (
    <div className="p-4 bg-gray-100 rounded-lg w-full md:w-1/2 mx-auto my-8">
      <h2 className="text-2xl font-bold mb-4">Shopping Cart</h2>
      <div className="mt-4">
        <button onClick={handleBackToShopping} className="text-sm text-gray-600 flex items-center justify-center hover:underline focus:outline-none">
          <MdArrowBack className="mr-1" /> Back to Shopping
        </button>
      </div>
      <ul>
        {cartItems.map((item: any) => (
          <li
            key={item.id}
            className="flex flex-col md:flex-row items-start md:items-center py-4 border-b border-gray-200"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-20 h-20 object-cover rounded-md mr-0 md:mr-4 mb-2 md:mb-0"
            />
            <div className="flex-grow">
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p className="text-gray-700 mb-2">${item.price}</p>
              <div className="flex items-center">
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity - 1)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <FaCircleMinus />
                </button>
                <span className="mx-2">{item.quantity}</span>
                <button
                  onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  className="text-gray-500 hover:text-gray-700 focus:outline-none"
                >
                  <IoAddCircle />
                </button>
              </div>
              <button
                onClick={() => handleRemoveFromCart(item.id)}
                className="text-red-500 hover:text-red-700 focus:outline-none"
              >
                Remove
              </button>
            </div>
          </li>
        ))}
      </ul>
      {cartItems?.length ? (
        <div className="mt-4">
          <p className="text-gray-700">Subtotal: ${subtotal}</p>
          <p className="text-gray-700">Total: ${total}</p>
          <button
            onClick={handleCheckout}
            className="mt-2 w-full md:w-auto px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
          >
            Checkout
          </button>
        </div>
      ) : (
        <div className="text-center">Cart is empty</div>
      )}
    </div>
  );
};

export default ShoppingCart;

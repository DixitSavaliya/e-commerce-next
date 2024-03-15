"use client";
import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { RootState } from "../../store";
import { CartItem } from "../../app/types";
import { clearCart } from "@/redux/slices/cartSlice";

const OrderSummaryPage = () => {
  const router = useRouter();
  const dispatch = useDispatch();

  // Form state
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [errors, setErrors] = useState({
    name: "",
    email: "",
    address: "",
  });
  const [orderPlaced, setOrderPlaced] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    let formValid = true;
    const newErrors = { ...errors };

    if (!formData.name.trim()) {
      newErrors.name = "Name is required";
      formValid = false;
    } else {
      newErrors.name = "";
    }

    if (!formData.email.trim()) {
      newErrors.email = "Email is required";
      formValid = false;
    } else {
      newErrors.email = "";
    }

    if (!formData.address.trim()) {
      newErrors.address = "Address is required";
      formValid = false;
    } else {
      newErrors.address = "";
    }

    if (formValid) {
      setFormData({
        name: "",
        email: "",
        address: "",
      });
      setErrors({
        name: "",
        email: "",
        address: "",
      });
      dispatch(clearCart());
      setOrderPlaced(true);
    } else {
      setErrors(newErrors);
    }
  };

  const backToHome = () => {
    setOrderPlaced(false);
    router.push('/');
  }

  const cartItems = useSelector((state: RootState) => state.cart);

  const totalPrice = cartItems.reduce(
    (total, item: any) => total + item.price * item.quantity,
    0
  );

  return (
    <div className="p-4 bg-gray-100 rounded-lg md:w-1/2 w-[80%] mx-auto my-8">
      <h1 className="text-2xl font-bold mb-4">Order Summary</h1>
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        {cartItems.map((item: CartItem) => (
          <div
            key={item.id}
            className="flex items-center p-4 bg-white rounded-lg shadow-md"
          >
            <img
              src={item.image}
              alt={item.title}
              className="w-16 h-16 object-cover rounded-md mr-4"
            />
            <div>
              <h3 className="text-lg font-semibold mb-1">{item.title}</h3>
              <p>Quantity: {item.quantity}</p>
              <p>Price: ${item.price}</p>
            </div>
          </div>
        ))}
      </div>
      <h2 className="mt-4 text-xl font-semibold">Total Price: ${totalPrice}</h2>
      <form onSubmit={handleSubmit} className="mt-4">
        <div className="grid grid-cols-1 gap-4 md:grid-cols-1   ">
          <div>
            <label
              htmlFor="name"
              className="block text-sm font-medium text-gray-700"
            >
              Name:
            </label>        
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.name && (
              <p className="mt-1 text-sm text-red-600">{errors.name}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="email"
              className="block text-sm font-medium text-gray-700"
            >
              Email:
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.email && (
              <p className="mt-1 text-sm text-red-600">{errors.email}</p>
            )}
          </div>
          <div>
            <label
              htmlFor="address"
              className="block text-sm font-medium text-gray-700"
            >
              Address:
            </label>
            <input
              type="text"
              id="address"
              name="address"
              value={formData.address}
              onChange={handleChange}
              className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:border-blue-500"
            />
            {errors.address && (
              <p className="mt-1 text-sm text-red-600">{errors.address}</p>
            )}
          </div>
        </div>
        <button
          type="submit"
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none"
        >
          Place Order
        </button>
      </form>
       {/* Popup for order placed successfully */}
       {orderPlaced && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-8 rounded-lg">
            <h2 className="text-xl font-semibold mb-4">Order Placed Successfully!</h2>
            <button
              onClick={() => backToHome()}
              className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none mr-4"
            >
              Back to Home
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default OrderSummaryPage;

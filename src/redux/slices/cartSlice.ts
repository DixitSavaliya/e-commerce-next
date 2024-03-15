import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '../../store';
import { CartItem } from '../../app/types';

const initialState: CartItem[] = [];

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    reducers: {

        // Add Item To Cart Functionality
        addToCart: (state, action: PayloadAction<CartItem>) => {
            const { id } = action.payload;
            const existingItem: any = state.find(item => item.id === id);
            if (existingItem) {
                existingItem.quantity += 1;
            } else {
                state.push({ ...action.payload, quantity: 1 });
            }
        },

        // Remove Item From Cart Functionality
        removeFromCart: (state, action: PayloadAction<number>) => {
            const index = state.findIndex(item => item.id === action.payload);
            if (index !== -1) {
                state.splice(index, 1);
            }
        },

        // Update Item Quantity Based On Increment or Decrement
        updateCartItemQuantity: (state, action: PayloadAction<{ id: number; quantity: number }>) => {
            const { id, quantity } = action.payload;
            const item = state.find(item => item.id === id);
            if (item) {
                item.quantity = quantity;
            }
        },

        // Clear Cart Functionality
        clearCart: (state) => {
            state.length = 0;
        },
    },
});

export const { addToCart, removeFromCart, updateCartItemQuantity, clearCart } = cartSlice.actions;

export const selectCartItems = (state: RootState) => state.cart;

export default cartSlice.reducer;

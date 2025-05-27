import { createSlice } from "@reduxjs/toolkit";

export const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
  },
  reducers: {
    increaseByQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      item.quantity += 1;
    },
    decreaseByQuantity: (state, action) => {
      const item = state.cartItems.find((item) => item.id === action.payload);
      item.quantity = item.quantity <= 1 ? 1 : (item.quantity -= 1);
    },
    addToCart: (state, action) => {
      const index = state.cartItems.findIndex(
        (item) => item.product === action.payload.product
      );
      if (index >= 0) {
        state.cartItems[index].quantity += 1;
      } else {
        state.cartItems.push({ ...action.payload, quantity: 1 });
      }
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },

    removeItem: (state, action) => {
      state.cartItems = state.cartItems.filter(
        (item) => item.product !== action.payload
      );
      localStorage.setItem("cartItems", JSON.stringify(state.cartItems));
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  increaseByQuantity,
  decreaseByQuantity,
  incrementByAmount,
  removeItem,
  addToCart,
} = cartSlice.actions;

export default cartSlice.reducer;

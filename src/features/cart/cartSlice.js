import { createSlice } from "@reduxjs/toolkit";
import { toast } from "react-toastify";
import { infoMsg, successMsg } from "../../utils/msgService";

const defaultState = {
  cartItems: [],
  // numItemsInCart: 0,
  cartTotal: 0,
  shipping: 500,
  tax: 0,
  orderTotal: 0,
};
const getCartFromLocalStorage = () => {
  return JSON.parse(localStorage.getItem("cart")) || defaultState;
};
const cartSlice = createSlice({
  name: "cart",
  initialState: getCartFromLocalStorage(),
  reducers: {
    addItem: (state, action) => {
      const { product } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === product.cartID);
      // state.numItemsInCart += product.amount;
      action.payload = {
        id,
        stock,
        name,
        price,
        amount,
        image,
      };
      const tempItem = state.cartItems.find((item) => item.id === id);
      let newCart = [...state.cartItems];
      if (tempItem) {
        newCart = state.cartItems.map((item) => {
          if (item.id === id) {
            if (amount + item.amount > item.stock) {
              infoMsg(
                `Only ${
                  item.stock - item.amount
                } items left in stock for ${name}`
              );
              state.cartTotal += item.price * item.stock;
              return { ...item, amount: item.stock };
            } else {
              state.cartTotal += item.price * item.amount + amount;
              successMsg("Item added to cart");
              return { ...item, amount: item.amount + amount };
            }
          }
          return item;
        });
      } else {
        newCart = [...newCart, { id, amount, stock, name, price, image }];
        state.cartTotal += price * amount;
        successMsg("Item added to cart");
      }
      state.cartItems = newCart;
      cartSlice.caseReducers.calculateTotals(state);
      state.showModal = true;
    },
    clearCart: (state) => {
      localStorage.setItem("cart", JSON.stringify(defaultState));
      return defaultState;
    },
    removeItem: (state, action) => {
      const { id } = action.payload;
      const product = state.cartItems.find((i) => i.cartID === cartID);
      state.cartItems = state.cartItems.filter((i) => i.cartID !== cartID);
      state.cartTotal -= product.price * product.amount;
      cartSlice.caseReducers.calculateTotals(state);
      successMsg("Item removed from cart");
    },
    editItem: (state, action) => {
      const { cartID, amount } = action.payload;
      const item = state.cartItems.find((i) => i.cartID === cartID);
      state.numItemsInCart += amount - item.amount;
      state.cartTotal += item.price * (amount - item.amount);
      item.amount = amount;
      cartSlice.caseReducers.calculateTotals(state);
      toast.success("Cart updated");
    },
    calculateTotals: (state) => {
      state.tax = 0.1 * state.cartTotal;
      state.orderTotal = state.cartTotal + state.shipping + state.tax;
      localStorage.setItem("cart", JSON.stringify(state));
    },
    increaseAmount: (state, { payload: { id } }) => {
      const newCart = state.cartItems.map((item) => {
        const { amount, stock } = item;
        if (item.id === id) {
          return { ...item, amount: amount + 1 > stock ? amount : amount + 1 };
        }
        return item;
      });
      state.cartItems = newCart;
    },
    decreaseAmount: (state, { payload: { id } }) => {
      const newCart = state.cartItems.map((item) => {
        const { amount } = item;
        if (item.id === id) {
          return { ...item, amount: amount - 1 <= 0 ? 1 : amount - 1 };
        }
        return item;
      });
      state.cartItems = newCart;
    },
  },
});

export const { addItem, clearCart, removeItem, editItem } = cartSlice.actions;

export default cartSlice.reducer;

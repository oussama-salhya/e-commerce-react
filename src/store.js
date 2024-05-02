import { configureStore } from "@reduxjs/toolkit";

import cartReducer from "./features/cart/cartSlice";
import userReducer from "./features/user/userSlice";
// import reviewsReducer from "./features/reviews/reviewsSlice";
// import productReducer from "./features/product/productSlice";
// import orderReducer from "./features/orders/orderSlice";
// import categoriesReducer from "./features/categories/categoriesSlice";
// import allProductReducer from "./features/allProduct/allProductSlice";

export const store = configureStore({
  reducer: {
    cartState: cartReducer,
    userState: userReducer,
    // reviewsState: reviewsReducer,
    // productState: productReducer,
    // orderState: orderReducer,
    // categoriesState: categoriesReducer,
    // allProductState: allProductReducer,
  },
});

import { combineReducers } from "redux";
import { configureStore } from "@reduxjs/toolkit";
import { thunk } from "redux-thunk";

import {
  productReducers,
  productDetailsReducer,
  newReviewReducer,
  newProductReducer,
  productReducer,
  productReviewsReducer,
  reviewReducer,
} from "./reducers/productReducers";

import {
  authReducer,
  userReducer,
  allUserReducer,
  forgotPasswordReducer,
  userDetailsReducer,
} from "./reducers/userReducers";

import { cartReducers } from "./reducers/cartReducers";
import {
  newOrderReducer,
  myOrdersReducer,
  orderDetailsReducer,
  orderReducer,
  allOrderReducer,
} from "./reducers/orderReducers";

const rootReducer = combineReducers({
  products: productReducers,
  productDetails: productDetailsReducer,
  newProduct: newProductReducer,
  auth: authReducer,
  user: userReducer,
  allUsers: allUserReducer,
  userDetails: userDetailsReducer,
  forgotPassword: forgotPasswordReducer,
  cart: cartReducers,
  newOrder: newOrderReducer,
  myOrders: myOrdersReducer,
  order: orderReducer,
  allOrders: allOrderReducer,
  orderDetails: orderDetailsReducer,
  newReview: newReviewReducer,
  review: reviewReducer,
  productReviews: productReviewsReducer,
  product: productReducer,
});

let initialState = {
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems"))
      : [],
    shippingInfo: localStorage.getItem("shippingInfo")
      ? JSON.parse(localStorage.getItem("shippingInfo"))
      : {},
  },
};

const store = configureStore({
  reducer: rootReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ thunk: true }).concat(thunk),
  preloadedState: initialState,
});

export default store;

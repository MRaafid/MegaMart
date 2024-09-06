import { useEffect, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import axios from "axios";

import ProtectedRoute from "./components/route/protectedRoute";
import Home from "./components/Home";
import { loadUser } from "./actions/userActions";
import store from "./store";

//layout
import Header from "./components/layout/Header";
import Footer from "./components/layout/Footer";

//product
import ProductDetails from "./components/product/productDetails";

//cart
import Cart from "./components/cart/cart";
import Shipping from "./components/cart/shipping";
import ConfirmOrder from "./components/cart/confirmOrder";
import Payment from "./components/cart/payment";
import OrderSuccess from "./components/cart/orderSuccess";

//order
import ListOrders from "./components/order/listOrders";
import OrderDetails from "./components/order/orderDetails";

//user
import Login from "./components/user/login";
import Register from "./components/user/register";
import Profile from "./components/user/profile";
import UpdateProfile from "./components/user/updateProfile";
import UpdatePassword from "./components/user/updatePassword";
import ForgotPassword from "./components/user/forgotPassword";
import NewPassword from "./components/user/newPassword";

// Payment
import { Elements } from "@stripe/react-stripe-js";
import { loadStripe } from "@stripe/stripe-js";

//admin
import Dashboard from "./components/admin/dashboard";
import ProductList from "./components/admin/productList";
import NewProduct from "./components/admin/newProduct";
import UpdateProduct from "./components/admin/updateProduct";
import OrdersList from "./components/admin/ordersList";
import ProcessOrder from "./components/admin/processOrder";
import UsersList from "./components/admin/usersList";
import UpdateUser from "./components/admin/updateUser";
import ProductReviews from "./components/admin/productReviews";

function App() {
  const [stripeApiKey, setStripeApiKey] = useState("");

  useEffect(() => {
    store.dispatch(loadUser());

    async function getStripeApiKey() {
      const { data } = await axios.get("/api/v1/stripeapi");
      setStripeApiKey(data.stripeApiKey);
    }
    getStripeApiKey();
  }, []);

  return (
    <Router>
      <div className="App">
        <Header />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/search/:keyword" element={<Home />} />
          <Route path="/product/:id" element={<ProductDetails />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/password/forgot" element={<ForgotPassword />} />
          <Route path="/password/reset/:token" element={<NewPassword />} />
          <Route path="/cart" element={<Cart />} />
          <Route
            path="/shipping"
            element={<ProtectedRoute element={<Shipping />} />}
          />
          <Route
            path="/shipping/confirm"
            element={<ProtectedRoute element={<ConfirmOrder />} />}
          />
          <Route
            path="/profile"
            element={<ProtectedRoute element={<Profile />} />}
          />
          <Route
            path="/profile/update"
            element={<ProtectedRoute element={<UpdateProfile />} />}
          />
          <Route
            path="/password/update"
            element={<ProtectedRoute element={<UpdatePassword />} />}
          />
          <Route
            path="/success"
            element={<ProtectedRoute element={<OrderSuccess />} />}
          />
          <Route
            path="/orders/profile"
            element={<ProtectedRoute element={<ListOrders />} />}
          />
          <Route
            path="/order/:id"
            element={<ProtectedRoute element={<OrderDetails />} />}
          />
          {stripeApiKey && (
            <Route
              path="/payment"
              element={
                <Elements stripe={loadStripe(stripeApiKey)}>
                  <ProtectedRoute element={<Payment />} />
                </Elements>
              }
            />
          )}
          <Route
            path="/dashboard"
            element={<ProtectedRoute isAdmin={true} element={<Dashboard />} />}
          />
          <Route
            path="/admin/products"
            element={
              <ProtectedRoute isAdmin={true} element={<ProductList />} />
            }
          />
          <Route
            path="/admin/product"
            element={<ProtectedRoute isAdmin={true} element={<NewProduct />} />}
          />
          <Route
            path="/admin/products/:id"
            element={
              <ProtectedRoute isAdmin={true} element={<UpdateProduct />} />
            }
          />
          <Route
            path="/admin/orders"
            element={<ProtectedRoute isAdmin={true} element={<OrdersList />} />}
          />
          <Route
            path="/admin/orders/:id"
            element={
              <ProtectedRoute isAdmin={true} element={<ProcessOrder />} />
            }
          />
          <Route
            path="/admin/users"
            element={<ProtectedRoute isAdmin={true} element={<UsersList />} />}
          />
          <Route
            path="admin/users/:id"
            element={<ProtectedRoute isAdmin={true} element={<UpdateUser />} />}
          />
          <Route
            path="admin/reviews"
            element={
              <ProtectedRoute isAdmin={true} element={<ProductReviews />} />
            }
          />
        </Routes>
        <Footer />
      </div>
    </Router>
  );
}

export default App;

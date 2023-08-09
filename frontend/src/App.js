import React, { useEffect } from 'react';
import {BrowserRouter, Routes, Route, useNavigate, Navigate } from "react-router-dom";
import {LoginPage, SignupPage, ActivationPage, HomePage, ProductPage, BestSellingPage, EventsPage, FAQPage, 
ProductDetailsPage, PaymentPage, OrderSuccessPage, CheckoutPage, ProfilePage, ShopCreatePage, SellerActivationPage,
ShopLoginPage, 
} from "./Routes.js";
import './App.css';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import {toast} from "react-toastify";
import Store from "./redux/store";
import {loadShop, loadUser} from "./redux/actions/userActions.js"
import ProtectedRoute from './ProtectedRoute.js';
import { useSelector } from "react-redux";
import {ShopHomePage} from "./ShopRoutes.js"
import ShopProtectedRoute from './ShopProtectedRoute.js';


const App = () => {
  const {loading, isAuthenticated} = useSelector((state) => state.user);
  const { isShopLoading, isShopAuthenticated, shop } = useSelector((state) => state.shop)


  useEffect(() => {
    Store.dispatch(loadUser());
    Store.dispatch(loadShop());
  
     
  }, [])


  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/Login" element={<LoginPage />} />
        <Route path="/sign-up" element={<SignupPage />} />
        <Route
          path="/activation/:activation_token"
          element={<ActivationPage />}
        />

        <Route
          path="/shop/activation/:activation_token"
          element={<SellerActivationPage />}
        />
        <Route path="/shop-login" element={<ShopLoginPage />} />

        <Route
          path="/shop/:id"
          element={
            <ShopProtectedRoute isShopAuthenticated={isShopAuthenticated}>
              <ShopHomePage />
            </ShopProtectedRoute>
          }
        />

        <Route path="/shop-create" element={<ShopCreatePage />} />
     
        <Route path="/products" element={<ProductPage />} />
        <Route path="/product/:name" element={<ProductDetailsPage />} />
        <Route path="best-selling" element={<BestSellingPage />} />

        <Route path="/events" element={<EventsPage />} />
        <Route path="/faq" element={<FAQPage />} />
        <Route
          path="/profile"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <ProfilePage />
            </ProtectedRoute>
          }
        />

        <Route path="/payment" element={<PaymentPage />} />
        <Route path="/order/success/:d" element={<OrderSuccessPage />} />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute isAuthenticated={isAuthenticated}>
              <CheckoutPage />
            </ProtectedRoute>
          }
        />
      </Routes>
      <ToastContainer
        position="bottom-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"
      />
    </BrowserRouter>
  );
}

export default App

import React, { useContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import LoginBox from "./Components/Auth/LoginBox.jsx";
import UserSignupBox from "./Components/Auth/UserSignnupBox.jsx";
import SellerSignupBox from "./Components/Auth/SellerSignupBox.jsx";
import "react-tooltip/dist/react-tooltip.css";
import MainAdminContainer from "./Components/AdminDashboard/MainAdminContainer.jsx";
import {
  Offers,
  Home,
  BuyAgain,
  AboutUser,
  Cart,
  UserFavourite,
  Search,
  Authentication,
  Product,
} from "./pages/index.js";
import TopLayout from "./Components/Home/TopLayout.jsx";
import { AuthProvider } from "./Components/Context/AuthContext.jsx";
import { ProductProvider } from "./Components/Context/ProductContext.jsx";
import { AdminProvider } from "./Components/Context/AdminContext.jsx";
<<<<<<< HEAD
import Category from "./pages/Category.jsx";

=======
import MainDashboard from "./Components/AdminDashboard/AdminComponents/MainDashboard.jsx";
import ProductAdmin from "./Components/AdminDashboard/ProductComponents/ProductAdmin.jsx"
>>>>>>> a2838a7f4185a21c3bceaf81d97c093ea1149830
const App = ({ location }) => {
  return (
    <ProductProvider>
      <AuthProvider>
        <AdminProvider>
          <div>
            <Routes>
              <Route path="/" element={<TopLayout />}>
                <Route exact path="/" element={<Home />} />

                <Route exact path="/offers" element={<Offers />} />
                <Route exact path="/buy-again" element={<BuyAgain />} />
                <Route exact path="/my-account" element={<AboutUser />} />
                <Route exact path="/cart" element={<Cart />} />
                <Route exact path="/favourites" element={<UserFavourite />} />
                <Route path="/search" element={<Search />} />
                <Route path="/category/*" element={<Category />} />
                <Route path="/product/*" element={<Product />} />
              </Route>

              <Route path="auth" element={<Authentication />}>
                <Route index element={<LoginBox />} />
                <Route path="login" element={<LoginBox />} />
                <Route path="register-user" element={<UserSignupBox />} />
                <Route path="register-seller" element={<SellerSignupBox />} />
              </Route>
              <Route path="/admin" element={<MainAdminContainer />}>
                <Route
                  exact
                  path="/admin/dashboard"
                  element={<MainDashboard/>}
                  
                />
                <Route
                  exact
                  path="/admin/products"
                  element={<ProductAdmin/>}
                  
                />
              </Route>
            </Routes>
          </div>
        </AdminProvider>
      </AuthProvider>
    </ProductProvider>
  );
};

const MainApp = () => {
  const location = useLocation();
  return <App location={location} />;
};

const AppWithRouter = () => (
  <BrowserRouter>
    <MainApp />
  </BrowserRouter>
);

export default AppWithRouter;

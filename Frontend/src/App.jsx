import React, { useState } from "react";
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
} from "./pages/index.js";
import TopLayout from './Components/Home/TopLayout.jsx'
import { AuthProvider } from "./Components/Context/AuthContext.jsx";
import { ProductProvider } from "./Components/Context/ProductContext.jsx";

const App = ({ location }) => {
  // const [isModalOpen, setIsModalOpen] = useState(false);
  // const handleModal = () => {
  //   setIsModalOpen(true);
  // };
  // const [searchTerm, setSearchTerm] = useState("");
  // const [category, setCategory] = useState("All Category");

  // const setHome = () => {
  //   return <Navigate to="/" />;
  // };
  // const isAuth = location.pathname.startsWith("/auth");

  return (
    <ProductProvider>
      <AuthProvider>
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
            </Route>

            <Route path="auth" element={<Authentication />}>
              <Route index element={<LoginBox />} />
              <Route path="login" element={<LoginBox />} />
              <Route path="register-user" element={<UserSignupBox />} />
              <Route path="register-seller" element={<SellerSignupBox />} />
            </Route>
            <Route path="/admin">
              <Route path="/admin/dashboard" element={<MainAdminContainer />} />
            </Route>
          </Routes>
        </div>
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

import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import {
  SearchNav,
  Navbar,
  ShopByCategoryModal,
  LoginBox,
  UserSignupBox,
  SellerSignupBox,
} from "./Components/index.js";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "./Components/Context/ThemeContext.jsx";
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

import LocationOnOutlinedIcon from "@mui/icons-material/LocationOnOutlined";
import LocalShippingOutlinedIcon from "@mui/icons-material/LocalShippingOutlined";
import PersonIcon from "@mui/icons-material/Person";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

const App = ({ location }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Category");

  const setHome = () => {
    console.log("Home");
    <Navigate to="/" />;
  };

  const homePage = location.pathname === "/";
  const { theme, toggleTheme } = useContext(ThemeContext);
  const [isUserLogin, setIsUserLogin] = useState(false);
  return (
    <div>
      {homePage && (
        <>
          <div
            className={`flex px-7 py-2 justify-center sm:justify-between  text-text text-sm font-normal flex-col sm:flex-row bg-slate-100 dark:bg-slate-800 dark:text-slate-100`}
          >
            <span className=" text-center">WELCOME TO ELECTRO STORE</span>
            <div className="sm:flex gap-4 text-xs sm:text-base hidden">
              <span onClick={toggleTheme} className=" cursor-pointer ">
                {theme === "dark" ? (
                  <LightModeIcon className=" hover:text-yellow-400" />
                ) : (
                  <DarkModeIcon className=" hover:text-purple-600" />
                )}
              </span>
              <span className="cursor-pointer hover:text-blue-600 ">
                <LocationOnOutlinedIcon /> Store Locator
              </span>
              <span className="cursor-pointer hover:text-blue-600">
                <LocalShippingOutlinedIcon /> Free Shipping & Returns
              </span>
              <span className="cursor-pointer hover:text-blue-600">
                <Link to={isUserLogin ? "/my-account" : "/auth/login"}>
                  <PersonIcon /> {isUserLogin ? "My Account" : "Login"}
                </Link>
              </span>
            </div>
          </div>
          <SearchNav
            category={category}
            searchTerm={searchTerm}
            setCategory={setCategory}
            setSearchTerm={setSearchTerm}
          />
          <Tooltip id="my-account-tooltip" />
          <Navbar openmodal={handleModal} />
        </>
      )}

      <Routes>
        <Route path="/" element={<Home />}>
          <Route index element={<Home />} />
          <Route path="/offers" element={<Offers />} />
          <Route path="/buy-again" element={<BuyAgain />} />
          <Route path="/my-account" element={<AboutUser />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/favourites" element={<UserFavourite />} />
          <Route
            path="/search"
            element={<Search category={category} keyword={searchTerm} />}
          />
        </Route>
        <Route path="auth" element={<Authentication />}>
          <Route index element={<LoginBox />} />
          <Route path="login" element={<LoginBox />} />
          <Route path="register-user" element={<UserSignupBox />} />
          <Route path="register-seller" element={<SellerSignupBox />} />
        </Route>
      </Routes>

      {homePage && (
        <ShopByCategoryModal
          open={isModalOpen}
          close={() => setIsModalOpen(false)}
          home={setHome}
        />
      )}
    </div>
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

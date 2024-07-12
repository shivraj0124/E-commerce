import React, { useState, useEffect, useContext } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  Navigate,
  useLocation,
} from "react-router-dom";
import { SearchNav, Navbar, ShopByCategoryModal } from "./Components/index";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
import { ThemeContext } from "./ThemeContext";
import {
  Offers,
  Home,
  BuyAgain,
  AboutUser,
  Cart,
  UserFavourite,
  Search,
  Login,
} from "./pages/index";
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

  const loginPage = location.pathname === "/login";

  const { theme, toggleTheme } = useContext(ThemeContext);

  const [isUserLogin, setIsUserLogin] = useState(false);
  return (
    <div>
      {!loginPage && (
        <>
          <div
            className={`flex px-7 py-2 justify-center sm:justify-between  text-text text-sm font-normal flex-col sm:flex-row bg-slate-100 dark:bg-slate-800 dark:text-slate-100`}
          >
            <span className=" text-center">WELCOME TO ELECTRO STORE</span>
            <div className="sm:flex gap-4 text-xs sm:text-base hidden">
              <span onClick={toggleTheme} className=" cursor-pointer ">
                {theme === "dark" ? <LightModeIcon className=" hover:text-yellow-400"/> : <DarkModeIcon className=" hover:text-purple-600"/>}
              </span>
              <span className="cursor-pointer hover:text-blue ">
                <LocationOnOutlinedIcon /> Store Locator
              </span>
              <span className="cursor-pointer hover:text-blue">
                <LocalShippingOutlinedIcon /> Free Shipping & Returns
              </span>
              <span className="cursor-pointer hover:text-blue">
                <Link to={isUserLogin ? "/my-account" : "/login"}>
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
        <Route path="/" element={<Home />} />
        <Route path="/offers" element={<Offers />} />
        <Route path="/buy-again" element={<BuyAgain />} />
        <Route path="/my-account" element={<AboutUser />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/favourites" element={<UserFavourite />} />
        <Route
          path="/search"
          element={<Search category={category} keyword={searchTerm} />}
        />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>

      {!loginPage && (
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

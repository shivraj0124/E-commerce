import React, { useContext, useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
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
  TopNav,
} from "./Components/index.js";
import "react-tooltip/dist/react-tooltip.css";
import { Tooltip } from "react-tooltip";
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
import { AuthProvider  } from "./Components/Context/AuthContext.jsx";
// admin components
import MainAdminContainer from "./Components/AdminDashboard/MainAdminContainer";
const App = ({ location }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const handleModal = () => {
    setIsModalOpen(true);
  };
  const [searchTerm, setSearchTerm] = useState("");
  const [category, setCategory] = useState("All Category");
  
  const setHome = () => {
    return <Navigate to="/" />;
  };
  const isAuth = location.pathname.startsWith("/auth");
  
  return (
    <AuthProvider>
      <div>
        {!isAuth && (
          <>
            <TopNav />
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
        <ShopByCategoryModal
          open={isModalOpen}
          close={() => setIsModalOpen(false)}
          home={setHome}
        />
      </div>
    </AuthProvider>
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

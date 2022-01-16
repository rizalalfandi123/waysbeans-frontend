import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Shop from "../pages/shop";
import Login from "../pages/login";
import Register from "../pages/register";
import AlertPage from "../pages/alert";
import DetailProduct from "../pages/detail-product";

const GuestRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route
          path="cart"
          element={
            <AlertPage
              message="You must login to access this page"
              action="Login Now"
              actionLink="/login"
            />
          }
        />
        <Route path="product/:id" element={<DetailProduct />} />
        <Route path="shop" element={<Shop />} />
        <Route
          path="transaction"
          element={
            <AlertPage
              message="You must login to access this page"
              action="Login Now"
              actionLink="/login"
            />
          }
        />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
      </Route>
    </Routes>
  );
};

export default GuestRoutes;

import { Routes, Route } from "react-router-dom";
import App from "../App";
import Home from "../pages/home";
import Cart from "../pages/cart";
import Transaction from "../pages/transaction";
import Shop from "../pages/shop";
import Login from "../pages/login";
import Register from "../pages/register";
import Checkout from "../pages/checkout";
import DetailProduct from "../pages/detail";


const UserRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Home />} />
        <Route path="cart" element={<Cart />}/>
        <Route path="product/:id" element={<DetailProduct />}/>
        <Route path="shop" element={<Shop />} />
        <Route path="transaction" element={<Transaction />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        {/* <Route path="profile/:id" element={<Profile />}></Route>*/}
        <Route path="checkout/:id" element={<Checkout />}></Route>
      </Route>
    </Routes>
  );
};

export default UserRoutes;

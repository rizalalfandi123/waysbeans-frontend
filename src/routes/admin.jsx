import { Routes, Route } from "react-router-dom";
import App from "../App";
import Income from "../pages/income";
import Products from "../pages/products";
import EditProduct from "../pages/edit-product";

const AdminRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<App />}>
        <Route index element={<Income />} />
        <Route path="products" element={<Products />} />
        <Route path="product/:id" element={<EditProduct />} />
      </Route>
    </Routes>
  );
};

export default AdminRoutes;

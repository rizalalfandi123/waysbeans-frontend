import ProductCard from "../components/shop/card";
import { API } from "../config/api";
import { useEffect, useState } from "react";

const Products = () => {

  const [products, setProducts] = useState([]);

  const getProducts = async () => {
    try {
      const response = await API.get("/products");
      setProducts(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  return (
    <section className="w-full grid grid-cols-2 gap-[0.5rem] xl:gap-[1rem] xs:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6">
      {products?.map((value, index) => {
        return (
          <ProductCard
            key={index}
            product={value}
          />
        );
      })}
    </section>
  );
};

export default Products;

import { Button } from "../components/basic";
import { useParams } from "react-router-dom";
import { useState, useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import { API } from "../config/api";
import { Alert } from "../components/basic";

const DetailProduct = () => {
  const { id } = useParams();

  const [product, setProduct] = useState({});

  const [message, setMessage] = useState(null);

  const getDetailProduct = async () => {
    try {
      const response = await API.get(`/product/${id}`);
      setProduct(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getDetailProduct();
    return () => {
      setProduct({});
    };
  }, []);

  const removeMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 2000);
  };

  const handleAddToCart = async () => {
    try {
      const response = await API.post("/cart", { productId: id });
      // socket.emit("cart changed", {
      //   buyerId: state.user.id,
      // });
      if (response.data.status === "success") {
        setMessage(
          <Alert message="Success to add product to your cart" type="success" className="w-full text-center" />
        );
        removeMessage();
      } else {
        setMessage(
          <Alert message="Failed to add product to your cart" type="failed" className="w-full text-center" />
        );
        removeMessage();
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center landscape:flex-row min-h-[90vh]">
      <img
        src="/images/1.jpeg"
        alt="p"
        className="w-[75%] py-4 md:w-[50%] landscape:w-[45%] xl:landscape:w-[55%]"
      />
      <div className="w-[90%] landscape:px-4 flex flex-col items-center landscape:items-start h-full justify-center">
        {message && message}
        <h1 className="mb-4">{product && product.name}</h1>
        <h4 className="font-semibold mb-2 text-center landscape:text-left">
          {product && product.price}
          <br />
          stock: {product && product.stock}
        </h4>
        <p className="text-center landscape:text-left">
          {product && product.description}
        </p>
        <div className="w-full flex justify-center items-center">
          <Button
            onClick={() => handleAddToCart()}
            className="w-full h-[3.5rem] md:h-[4rem] xl:h-[5rem] md:w-[80%] xl:w-[70%] 2xl:w-[60%] mt-6 mb-4"
          >
            Add to cart
          </Button>
        </div>
      </div>
    </section>
  );
};

export default DetailProduct;

import { TrashIcon } from "@heroicons/react/outline";
import { useEffect, useState } from "react";
import { API } from "../config/api";
import toRupiah from "@develoka/angka-rupiah-js";
import { Button } from "../components/basic";
import { useNavigate } from "react-router-dom";
import { Alert } from "../components/basic";

const Cart = () => {
  const [cart, setCart] = useState({});

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  const removeMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 4000);
  };

  const getCarts = async () => {
    try {
      const response = await API.get("/carts");
      const cart = response.data.userCart;
      setCart(cart);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getCarts();

    return () => {
      setCart({});
    };
  }, []);

  const handleCheckout = async () => {
    try {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { totalProduct, totalPrice, subTotal, shippingCost } = cart;

      let orders = cart.carts.map((i) => {
        return { productId: i.product.id, qty: i.qty };
      });

      let transaction = {
        totalProduct,
        totalPrice,
        subTotal,
        shippingCost,
        status: "waiting payment",
        orders,
      };

      const response = await API.post("/transaction", transaction, config);

      if (response.data.status === "success") {
        navigate(`/checkout/${response.data.transaction.id}`);
      } else {
        setMessage(
          <Alert
            message="Failed to checkout"
            type="failed"
            className="w-full text-center"
          />
        );
        removeMessage();
        console.log(response.data);
      }
    } catch (error) {
      setMessage(
        <Alert message={error} type="failed" className="w-full text-center" />
      );
      removeMessage();
      console.log(error);
    }
  };

  return (
    <section className="w-full flex flex-col justify-center items-center">
      {cart.carts?.map((value, index) => {
        return <CartCard key={index} cart={value} getCarts={getCarts} />;
      })}
      {message && message}
      {cart.carts?.length < 1 ? (
        <h1>Kosong</h1>
      ) : (
        <div className="py-4 w-full px-2 mt-4 flex items-center justify-between shadow-md border-[1px] rounded-lg md:rounded-xl md:w-[80%] lg:w-[70%] xl:w-[65%]">
          <h3>Sub Total : {cart.subTotal && toRupiah(cart.subTotal)}</h3>
          <h3>
            Shipping Cost : {cart.shippingCost && toRupiah(cart.shippingCost)}
          </h3>
          <h3>Total Price : {cart.totalPrice && toRupiah(cart.totalPrice)}</h3>
          <Button onClick={() => handleCheckout()}>
            <h3>Checkout</h3>
          </Button>
        </div>
      )}
    </section>
  );
};

const CartCard = ({ cart, getCarts }) => {
  const id = cart.id;

  const handleIncrement = async () => {
    try {
      await API.patch(`/increment-cart/${id}`);
      getCarts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDecrement = async () => {
    try {
      await API.patch(`/decrement-cart/${id}`);
      getCarts();
    } catch (error) {
      console.log(error);
    }
  };

  const handleDelete = async () => {
    try {
      await API.delete(`/cart/${id}`);
      getCarts();
    } catch (error) {
      console.log(error);
    }
  };

  const { name, image, price } = cart.product;
  return (
    <div className="w-full h-[8rem] 2xs:h-[10rem] md:h-[12rem] flex items-center shadow-md border-[1px] rounded-lg md:rounded-xl md:w-[80%] lg:w-[70%] xl:w-[65%]">
      <img
        src={image ? image : "/images/1.jpeg"}
        alt="product"
        className="h-[90%] w-auto max-w-[35%] object-cover"
      />
      <div className="p-[2%] flex flex-col w-full justify-center">
        <div className="w-full flex justify-between items-center py-[2%]">
          <div className="">
            <h4 className="font-medium">{name && name}</h4>
            <h3>{price && toRupiah(price)}</h3>
          </div>
          <TrashIcon
            className="h-6 text-red-500 hover:animate-bounce"
            onClick={() => handleDelete()}
          />
        </div>
        <div className="flex flex-col md:flex-row md:justify-between md:items-center py-[2%] md:p-[2px]">
          <div className="flex items-center">
            <button
              onClick={
                cart.qty === 1 ? () => handleDelete() : () => handleDecrement()
              }
              className="px-2 py-1 bg-primary-color text-white rounded-md active:bg-gray-400"
            >
              -
            </button>
            <span className="px-2 font-semibold">{cart.qty}</span>
            <button
              onClick={() => handleIncrement()}
              className="px-2 py-1 bg-primary-color text-white rounded-md active:bg-gray-400"
            >
              +
            </button>
          </div>
          <div className="font-bold tracking-wider pt-[2%] md:text-xl lg:text-2xl md:pt-0">
            {toRupiah(price * cart.qty)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;

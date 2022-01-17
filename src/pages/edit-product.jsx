import { Button } from "../components/basic";
import { useParams, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { API } from "../config/api";
import ProductCard from "../components/shop/card";
import classNames from "classnames";

const EditProduct = () => {
  const [showModal, setShowModal] = useState(false);

  const [message, setMessage] = useState(null);

  const navigate = useNavigate();

  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    stock: "",
    price: "",
    description: "",
    image: "",
  });

  const { name, stock, price, description, image } = form;

  const getProducts = async () => {
    try {
      const response = await API.get(`/product/${id}`);
      console.log(response.data.product);
      setForm(response.data.product);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getProducts();
  }, []);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Configuration
      const config = {
        headers: {
          "Content-type": "multipart/form-data",
        },
      };

      // Store data with FormData as object
      const formData = new FormData();
      if (typeof image === "object") {
        formData.set("image", form.image[0], form.image[0].name);
      }
      formData.set("name", form.name);
      formData.set("price", form.price);
      formData.set("description", form.description);
      formData.set("stock", form.stock);

      // Insert product data
      const response = await API.patch(`/product/${id}`, formData, config);

      if (response.data.status) {
        setMessage("Data saved");

        setShowModal(true);
      } else {
        setMessage("Failed edit product");

        setShowModal(true);
      }
    } catch (error) {
      setMessage("Error");

      setShowModal(true);
    }
  };

  return (
    <section className="flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" border-[1px] w-full sm:w-[80%] md:w-[70%] xl:w-[60%] 2xl:w-[50%] rounded-xl px-4 py-8 shadow-md"
      >
        <div className="w-full flex justify-center items-center">
          <div className="w-[80%] xs:w-[60%] lg:w-[40%] xl:w-[35%]">
            <ProductCard product={form} />
          </div>
        </div>
        {/* {message && message} */}
        <label htmlFor="name" className="block py-2 w-full">
          <span className="block font-medium">Name</span>
          <input
            type="text"
            id="name"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="price" className="block py-2 w-full">
          <span className="block font-medium">Price</span>
          <input
            type="number"
            id="price"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={price}
            name="price"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="stock" className="block py-2 w-full">
          <span className="block font-medium">Stock</span>
          <input
            type="number"
            id="stock"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={stock}
            name="stock"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="description" className="block py-2 w-full">
          <span className="block font-medium">Description</span>
          <textarea
            type="text"
            id="description"
            rows={10}
            className="border-[1px] resize-none w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={description}
            name="description"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="image" className="block py-2 w-full">
          <span className="block font-medium">Attachment</span>
          <input
            type="file"
            id="image"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color file:bg-primary-color file:text-white file:rounded-xl file:px-6 file:border-0 file:py-3 font-semibold"
            name="image"
            onChange={handleChange}
          />
        </label>
        <Button
          type="submit"
          className="w-full mt-6 h-[12%] lg:rounded-xl max-h-[4rem]"
        >
          Save
        </Button>
        <Button
          type="button"
          className="w-full mt-4 h-[12%] mb-[4%] lg:rounded-xl max-h-[4rem] bg-red-400"
        >
          Delete this product
        </Button>
      </form>
      <div
        className={classNames(
          "fixed w-full h-[100vh] z-30 top-0",
          showModal ? "block" : "hidden"
        )}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className="border-2 border-primary-color rounded-md flex flex-col p-2 bg-background-color w-[75vw] max-w-[25rem]">
            <p>{message}</p>
            <Button
              className="w-full h-[3.5rem] mt-4"
              onClick={() => {
                setShowModal(false);
                navigate("/products");
              }}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default EditProduct;

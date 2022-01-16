import { useState } from "react";
import { Button } from "../components/basic";
import TransactionCard from "../components/transaction/card";
import { API } from "../config/api";
import { useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import classNames from "classnames";

const Checkout = () => {
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    postCode: "",
    address: "",
    image: "",
  });

  const { name, email, phone, postCode, address, image } = form;

  const [transaction, setTransaction] = useState(null);

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]:
        e.target.type === "file" ? e.target.files : e.target.value,
    });
  };

  const getTransaction = async () => {
    try {
      const response = await API.get(`/transaction/${id}`);
      setTransaction(response.data.transaction);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTransaction();

    return () => {
      setTransaction(null);
    };
  }, []);

  const [message, setMessage] = useState(null);

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();

      // Store data with FormData as object
      const formData = new FormData();
      formData.set("image", form.image[0], form.image[0].name);
      formData.set("name", form.name);
      formData.set("email", form.email);
      formData.set("phone", form.phone);
      formData.set("postCode", form.postCode);
      formData.set("address", form.address);
      formData.set("transactionId", transaction.id);

      // Insert product data
      const response = await API.post("/shipping", formData, {
        headers: {
          "Content-type": "multipart/form-data",
        },
      });

      console.log(response);

      if (response.data.status === "success") {
        setMessage(
          "Thank you for ordering in us, please wait 1 x 24 hours to verify you order"
        );

        // setShowModal(true);
      } else {
        setMessage(response.data.message);
        // setShowNotificationModal(true);
      }
    } catch (error) {
      setMessage(error);
      // setShowNotificationModal(true);
      console.log(error);
    }
  };

  return (
    <section className="w-full flex flex-col items-center">
      {transaction && <TransactionCard transaction={transaction} />}
      <form
        onSubmit={handleSubmit}
        className=" border-[1px] w-full md:w-[80%] lg:w-[70%] xl:w-[65%] rounded-xl px-4 py-8 shadow-md"
      >
        <h1 className="w-full mb-[1rem]" onClick={() => setShowModal(true)}>
          Ship to
        </h1>
        {message && message}
        <label htmlFor="name" className="block py-2 w-full">
          <span className="block font-medium">Fullname</span>
          <input
            type="text"
            id="name"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={name}
            name="name"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email" className="block py-2 w-full">
          <span className="block font-medium">Email</span>
          <input
            type="text"
            id="email"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="phone" className="block py-2 w-full">
          <span className="block font-medium">Number Phone</span>
          <input
            type="number"
            id="phone"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={phone}
            name="phone"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="postCode" className="block py-2 w-full">
          <span className="block font-medium">Post Code</span>
          <input
            type="number"
            id="postCode"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={postCode}
            name="postCode"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="address" className="block py-2 w-full">
          <span className="block font-medium">Address</span>
          <input
            type="text"
            id="address"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={address}
            name="address"
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
          className="w-full mt-6 py-2 sm:py-4 lg:py-5 xl:py-6 lg:rounded-xl"
        >
          Pay
        </Button>
      </form>
      <div
        className={classNames(
          "fixed w-full h-[90vh] z-30",
          showModal ? "block" : "hidden"
        )}
      >
        <div className="w-full h-full flex justify-center items-center">
          <div className=" border-2 border-primary-color rounded-md flex flex-col p-2 bg-background-color w-[75vw] max-w-[25rem]">
            <p>{message}</p>
            <Button
              className="w-full h-[3.5rem] mt-4"
              onClick={() => setShowModal(false)}
            >
              OK
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Checkout;

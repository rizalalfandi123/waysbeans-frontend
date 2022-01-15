import { Button, Alert } from "../components/basic";
import { Link } from "react-router-dom";
import { API } from "../config/api";
import { useState } from "react";

const Register = () => {
  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    fullname: "",
    email: "",
    password: "",
  });
  const { fullname, email, password } = form;

  const removeMessage = () => {
    setTimeout(() => {
      setMessage(null);
    }, 5000);
  };

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    try {
      e.preventDefault();
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const body = JSON.stringify(form);

      const response = await API.post("/register", body, config);
      console.log(response);
      if (response.data.status === "success") {
        const alert = <Alert type="success" message={response.data.message} />;

        setMessage(alert);

        removeMessage();

        setForm({
          fullname: "",
          email: "",
          password: "",
        });
      } else {
        const alert = (
          <Alert variant="failed" message={response.data.message} />
        );
        setMessage(alert);
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <section className="w-full h-[90vh] landscape:h-auto landscape:min-h-[90vh] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" border-[1px] w-full sm:w-[70%] md:w-[60%] xl:w-[50%] 2xl:w-[40%] rounded-xl px-4 py-8 shadow-md"
      >
        <h1 className="w-full mb-[5%]">Register</h1>
        {message && message}
        <label htmlFor="fullname" className="block py-2 w-full">
          <span className="block font-medium">Fullname</span>
          <input
            type="text"
            id="fullname"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={fullname}
            name="fullname"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="email" className="block py-2 w-full">
          <span className="block font-medium">Email</span>
          <input
            type="email"
            id="email"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={email}
            name="email"
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password" className="block py-2 w-full">
          <span className="block font-medium">Password</span>
          <input
            type="text"
            id="password"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <Button
          type="submit"
          className="w-full mt-6 h-[12%] mb-[4%] lg:rounded-xl"
        >
          Login
        </Button>
      </form>
      <span className="my-4 text-center">
        Already an account ?{" "}
        <Link to="/login" className="text-primary-color font-medium">
          LOGIN HERE
        </Link>
      </span>
    </section>
  );
};

export default Register;

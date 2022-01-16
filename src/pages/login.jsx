import { Button } from "../components/basic";
import { Link, useNavigate } from "react-router-dom";
import { useState, useContext } from "react";
import { UserContext } from "../context/UserContext";
import jwt_decode from "jwt-decode";
import { API } from "../config/api";
import { Alert } from "../components/basic";

const Login = () => {
  const [state, dispatch] = useContext(UserContext);

  const navigate = useNavigate();

  const [message, setMessage] = useState(null);

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const { email, password } = form;

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
      const response = await API.post("/login", body, config);

      if (response.data.status === "success") {
        const token = response.data.user.token;

        localStorage.setItem("token", token);

        let decoded = jwt_decode(token);

        dispatch({
          type: "LOGIN_SUCCESS",
          payload: { ...decoded },
        });

        navigate("/");
      } else {
        const alert = <Alert type="danger" message={response.data.message} />;
        setMessage(alert);
        removeMessage();
      }
    } catch (error) {
      const alert = <Alert variant="danger" message="Failed to login" />;
      setMessage(alert);
      console.log(error);
    }
  };

  return (
    <section className="w-full h-[90vh] landscape:h-auto landscape:min-h-[90vh] flex flex-col justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className=" border-[1px] w-full sm:w-[70%] md:w-[60%] xl:w-[50%] 2xl:w-[40%] rounded-xl px-4 py-8 shadow-md"
      >
        <h1 className="w-full mb-[5%]">Login</h1>
        {message && message}
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
        <label htmlFor="password" className="block py-2 w-full">
          <span className="block font-medium">Password</span>
          <input
            type="password"
            id="password"
            className="border-[1px] w-full px-2 py-3 rounded-lg mt-1 focus:outline-none focus:border-primary-color focus:ring-1 focus:ring-primary-color"
            value={password}
            name="password"
            onChange={handleChange}
          />
        </label>
        <Button type="submit" className="w-full mt-6 py-[4%] lg:rounded-xl">
          Login
        </Button>
      </form>
      <span className="my-4 text-center">
        Don't have an account ?{" "}
        <Link to="/register" className="text-primary-color font-medium">
          CREATE HERE
        </Link>
      </span>
    </section>
  );
};

export default Login;

import UserRoutes from "./user";
import { useContext, useEffect } from "react";
import { UserContext } from "../context/UserContext";
import GuestRoutes from "./guest";
import { API, setAuthToken } from "../config/api";
import jwt_decode from "jwt-decode";
import AdminRoutes from "./admin";

const LoginRoutes = () => {
  const [state] = useContext(UserContext);
  const role = state.user.role;

  if (role === "user") {
    return <UserRoutes />;
  } else if (role === "admin") {
    return <AdminRoutes />;
  } else {
    <GuestRoutes />;
  }
};

const AppRoutes = () => {
  if (localStorage.token) {
    setAuthToken(localStorage.token);
  }

  const [state, dispatch] = useContext(UserContext);
  const isLogin = state.isLogin;

  const checkUser = async () => {
    try {
      const response = await API.get("/check-auth");
      // If the token incorrect
      if (response.status === 404) {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }

      if (response.data.status === "success") {
        const token = localStorage.token;

        let decoded = jwt_decode(token);

        dispatch({
          type: "USER_SUCCESS",
          payload: { ...decoded },
        });
      } else {
        return dispatch({
          type: "AUTH_ERROR",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    checkUser();
  }, []);

  if (isLogin === true) {
    return <LoginRoutes />;
  } else {
    return <GuestRoutes />;
  }
};

export default AppRoutes;

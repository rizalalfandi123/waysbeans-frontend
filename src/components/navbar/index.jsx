import {
  HomeIcon,
  ShoppingBagIcon,
  ShoppingCartIcon,
  CreditCardIcon,
  ArchiveIcon,
} from "@heroicons/react/outline";
import {
  HomeIcon as HomeIconSolid,
  ShoppingBagIcon as ShoppingBagIconSolid,
  ShoppingCartIcon as ShoppingCartIconSolid,
  CreditCardIcon as CreditCardIconSolid,
  ArchiveIcon as ArchiveIconSolid,
  LogoutIcon,
} from "@heroicons/react/solid";
import { Button } from "../basic";
import classNames from "classnames";
import { useState, useContext } from "react";
import NavItem from "./navbar-item";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { useNavigate } from "react-router-dom";

const NavBar = () => {
  const [state, dispatch] = useContext(UserContext);

  let navigate = useNavigate();

  const logout = () => {
    dispatch({
      type: "LOGOUT",
    });
    navigate("/");
  };

  return (
    <nav className="flex justify-between items-center p-2 h-16 lg:h-20 bg-background-color">
      <Link to="/">
        <img
          src="/icons/Brand.svg"
          alt="icon"
          className="w-[12vw] min-w-[8rem] max-w-[12rem]"
        />
      </Link>
      <div className="w-full h-16 lg:h-20 px-2 fixed bottom-0 left-0 md:top-0 md:bottom-auto md:static grid content-center bg-background-color">
        {state.user.role === "admin" ? (
          <ul className="flex justify-evenly xs:justify-center xs:gap-x-8">
            <NavItem
              title="Home"
              OutlineIcon={HomeIcon}
              SolidIcon={HomeIconSolid}
              to="/"
            />
            <NavItem
              title="Products"
              OutlineIcon={ArchiveIcon}
              SolidIcon={ArchiveIconSolid}
              to="/products"
            />
          </ul>
        ) : (
          <ul className="flex justify-evenly xs:justify-center xs:gap-x-8">
            <NavItem
              title="Home"
              OutlineIcon={HomeIcon}
              SolidIcon={HomeIconSolid}
              to="/"
            />
            <NavItem
              title="Shop"
              OutlineIcon={ShoppingBagIcon}
              SolidIcon={ShoppingBagIconSolid}
              to="/shop"
            />
            <NavItem
              title="Cart"
              OutlineIcon={ShoppingCartIcon}
              SolidIcon={ShoppingCartIconSolid}
              to="/cart"
            />
            <NavItem
              title="Transaction"
              OutlineIcon={CreditCardIcon}
              SolidIcon={CreditCardIconSolid}
              to="/transaction"
            />
          </ul>
        )}
      </div>
      {state.isLogin ? (
        state.user.role === "user" ? (
          <UserProfilePicture logout={logout} />
        ) : (
          <Button
            className="h-[80%] px-5 md:px-10 landscape:px-10"
            onClick={() => logout()}
          >
            <h3>Logout</h3>
          </Button>
        )
      ) : (
        <Link to="/login">
          <Button className="h-[80%] px-5 md:px-10 landscape:px-10">
            <h3>Login</h3>
          </Button>
        </Link>
      )}
    </nav>
  );
};

const UserProfilePicture = ({ logout }) => {
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <div className="relative inline-block h-full group">
      <div
        className="h-full aspect-square rounded-full bg-fuchsia-400"
        onClick={() => setShowDropdown(!showDropdown)}
      ></div>
      <div
        className={classNames(
          "absolute right-[50%] top-[110%] z-20",
          showDropdown ? " block" : " hidden"
        )}
      >
        <div className="shadow-md border-[1px] bg-background-color p-3 rounded-lg">
          <button onClick={() => logout()}>
            <div className="flex items-center py-2 px-4 my-2 bg-primary-color w-[8rem] text-white rounded-lg justify-between">
              <span>Logout</span>
              <LogoutIcon className="h-4" />
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NavBar;

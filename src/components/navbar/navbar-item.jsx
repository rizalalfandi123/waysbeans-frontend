import { NavLink } from "react-router-dom";

const NavItem = ({ title, OutlineIcon, to, SolidIcon }) => {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        isActive ? "text-primary-color" : "text-gray-400"
      }
    >
      {({ isActive }) => (
        <li className="flex flex-col justify-center items-center">
          {isActive ? (
            <SolidIcon className="h-8 md:hidden" />
          ) : (
            <OutlineIcon className="h-8 md:hidden" />
          )}
          <span className={`${styles.title}`}>{title}</span>
        </li>
      )}
    </NavLink>
  );
};

const styles = {
  title: ["text-xs", "md:text-base md:font-semibold", "lg:text-xl"].join(" "),
};

export default NavItem;

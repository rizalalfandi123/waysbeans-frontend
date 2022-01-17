import classNames from "classnames";
import { useState } from "react";

const Button = ({ children, className, onClick }) => {
  return (
    <button
      onClick={onClick}
      className={classNames(
        "px-3 py-2 bg-primary-color text-white rounded-md font-medium",
        className
      )}
    >
      {children}
    </button>
  );
};

const Alert = ({ message, type, className }) => {
  return (
    <div
      role="alert"
      className={classNames(
        "p-4 mb-4 text-sm rounded-lg",
        type === "success" ? "bg-green-200" : "bg-red-200",
        className
      )}
    >
      {message}
    </div>
  );
};


export { Button, Alert };

// src/components/ui/AppButton.jsx
import React from "react";

const baseClasses = `
  flex justify-center items-center font-bold
  bg-(--text3-c) text-white
  transition-all duration-300
  hover:bg-white hover:text-(--text3-c)
  hover:border hover:border-(--text3-c)
  disabled:opacity-60 disabled:cursor-not-allowed
`;

const Button = ({ children, className = "", type = "button", ...props }) => {
  return (
    <button
      type={type}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      <span className="flex cent items-center gap-2 py-px">
        {children}
      </span>
    </button>
  );
};

export default Button;
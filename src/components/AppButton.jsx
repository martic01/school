// src/components/ui/AppButton.jsx
import { useState } from "react";
import { Edit } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";

const baseClasses = `
  flex justify-center items-center font-bold
  bg-(--text3-c) text-(--text1-c)
  transition-all duration-300
  hover:bg-white hover:text-(--text3-c)
  hover:border hover:border-(--text3-c)
  disabled:opacity-60 disabled:cursor-not-allowed
`;

const Button = ({ children,icon = "no" , className = "", type = "button", ...props }) => {

  return (
    <button
      type={type}
      className={`${baseClasses} ${className}`}
      {...props}
    >
      <span className="flex cent items-center gap-2 py-px">
        <Edit  className={icon === "edit" ? "block" : "hidden"} />
        {children}
        <FaWhatsapp  className={icon === "chat" ? "block" : "hidden"} />
      </span>
    </button>
  );
};

export default Button;
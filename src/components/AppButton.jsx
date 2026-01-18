// src/components/ui/AppButton.jsx
import { Edit, Lock } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import clsx from 'clsx'; // You might need to install: npm install clsx

const baseClasses = `
  flex justify-center items-center font-bold
  bg-(--text3-c) text-(--text1-c)
  transition-all duration-300
  hover:bg-white hover:text-(--text3-c)
  hover:border hover:border-(--text3-c)
`;

const Button = ({
  children,
  icon = "no",
  className = "",
  type = "button",
  disabled = false,
  onClick,
  ...props
}) => {

  const handleClick = (e) => {
    if (disabled) {
      e.preventDefault();
      alert("Coming soon");
      return;
    }

    if (onClick) {
      onClick(e);
    }
  };

  return (
    <button
      type={type}
      className={clsx(
        baseClasses,
        'disabled:opacity-70 disabled:cursor-not-allowed',
        disabled && 'bg-gray-800 text-gray-700 border-gray-200',
        className
      )}
      disabled={disabled}
      onClick={handleClick}
      {...props}
    >
      <span className="flex  cent items-center gap-2 py-px">
        {disabled ? (
          <>
            <Lock className="h-4 w-4 mr-1" />
            <p>
              <p className="flex">
                {children}
              </p>
              <p className="text-[10px]">Coming very soon</p>
            </p>
          </>
        ) : (
          <>
            {icon === "edit" && <Edit />}
            {children}
            {icon === "chat" && <FaWhatsapp />}
          </>
        )}
      </span>
    </button>
  );
};

export default Button;
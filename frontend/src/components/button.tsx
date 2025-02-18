import React from "react";
type props = {
  classname?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?: () => void;
};
export default function Button({ classname, children, type, onClick}: props) {
  return (
    <button
      className={`${classname} w-full bg-black h-10 rounded-md text-white font-bold text-md `} type={type} onClick={onClick}

    >
      {children}
    </button>
  );
}

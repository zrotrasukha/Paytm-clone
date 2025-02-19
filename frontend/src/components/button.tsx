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
      className={` w-fit px-2 bg-black h-10 rounded-md font-bold text-md ${classname} `} type={type} onClick={onClick}

    >
      {children}
    </button>
  );
}

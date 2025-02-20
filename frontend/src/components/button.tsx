import React from "react";
type props = {
  classname?: string;
  children?: React.ReactNode;
  type?: "button" | "submit" | "reset";
  onClick?:React.MouseEventHandler<HTMLButtonElement> | undefined ;
  disabled?: boolean;
};
export default function Button({ classname, children, type, onClick, disabled }: props) {
  return (
    <button
      className={` w-fit disabled:bg-neutral-700 px-2 bg-black h-10 rounded-md font-bold text-md ${classname}`}
      type={type}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  );
}

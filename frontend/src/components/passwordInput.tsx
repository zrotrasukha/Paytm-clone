import { PasswordContextType, usePasswordContext } from "../context/context.ts";

import { FaEye as EyeIcon } from "react-icons/fa6";
import { FaRegEyeSlash as ClosedEyeIcon } from "react-icons/fa";

export const PasswordInput = () => {
const {
    password,
    passwordToggle,
    setPassword,
    setPasswordToggle,
  }: PasswordContextType = usePasswordContext();
  return (
    <div className="mb-5">
      <label className="text-md font-bold">Password</label>
      <div className="focus-within:border-zinc-500 border-2 rounded-md border-gray-300 flex  items-center  pr-4">
        <input
          type={passwordToggle ? "password" : "text"}
          value={password}
          placeholder="*****"
          className="p-2 text-sm border-none text-gray-700 font-semibold w-full outline-none mt-1"
          onChange={(e) => setPassword(e.target.value)}
        />
        <button
          type="button"
          onClick={() => setPasswordToggle((prev) => !prev)}
        >
          {passwordToggle ? <ClosedEyeIcon /> : <EyeIcon />}
        </button>
      </div>
    </div>
  );
};

import Heading from "../components/heading";
import Subheading from "../components/subheading";
import Button from "../components/button";
import { useState } from "react";
import { PasswordProvider } from "../context/context";
import { PasswordInput } from "../components/passwordInput";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";

export const SignupPage = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordToggle, setPasswordToggle] = useState(true);
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        { firstName, lastName, email, password },
      );

      if (response.status === 200) {
        console.log(response.data);
        toast.success("User created successfully");
        navigate("/signin");
        return;
      }
      throw new Error();
    } catch (error) {
      console.error(error);
      toast.error("User already exists");
    }
  };
  return (
    <PasswordProvider
      value={{ password, setPassword, passwordToggle, setPasswordToggle }}
    >
      <div className="bg-zinc-900 text-white flex flex-col justify-center items-center h-screen w-screen">
        <div className="w-96 flex flex-col justify-center items-center rounded-2xl h-[700px] bg-white text-black py-10 px-7">
          <Heading heading="Sign Up" />
          <Subheading
            subheading="Create an account to continue"
            className="p-2"
          />
          <form className="mt-3 flex flex-col w-full" onSubmit={handleSubmit}>
            <div className="mb-5">
              <label className="text-md font-bold">First Name</label>
              <input
                type="text"
                value={firstName}
                placeholder="John"
                className="p-2 text-sm outline-none focus:border-zinc-500 text-gray-700 font-semibold border-2 w-full border-gray-300 rounded-md mt-1"
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="text-md font-bold">Last Name</label>
              <input
                type="text"
                value={lastName}
                placeholder="Doe"
                className=" outline-none focus:border-zinc-500 p-2 text-sm text-gray-700 font-semibold border-2 w-full border-gray-300 rounded-md mt-1"
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="mb-5">
              <label className="text-md font-bold">Email</label>
              <input
                type="text"
                value={email}
                placeholder="johndoe@email.com"
                className=" outline-none focus:border-zinc-500 p-2 text-sm text-gray-700 font-semibold border-2 w-full border-gray-300 rounded-md mt-1"
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <PasswordInput></PasswordInput>
            <Button type="submit">Submit</Button>
          </form>
        </div>
      </div>
    </PasswordProvider>
  );
};

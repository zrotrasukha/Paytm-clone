import toast from "react-hot-toast";
import { Link, useNavigate } from "react-router";
import Headings from "../components/header";
import InputBox from "../components/input";
import { useAppContext } from "../context/context";
import { PasswordInput } from "../components/passwordInput";
import Button from "../components/button";
import axios from "axios";
import Subheading from "../components/subheading";
import { useEffect, useRef } from "react";

export default function SigninPage() {
  const { email, setEmail, password } = useAppContext();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signin",
        {
          email,
          password,
        },
        { withCredentials: true },
      );
      if (response.status === 200) {
        toast.success(`${email} signed in successfully!`);
        navigate("/dashboard");
      }
      return;
    } catch (error) {
      console.error("AXIOS ERROR:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response Data:", error.response?.data);
        console.error("Status Code:", error.response?.status);
      }
      toast.error("Something went wrong!");
    }
  };
  const hasToastFired = useRef(false);
  useEffect(() => {
    const getUser = async () => {
      try {
        const response = await axios.get(
          "http://localhost:3000/api/v1/user/getuser", {withCredentials: true})
        if (response.status === 200) {
          console.log("✅ User already logged in, redirecting...");
          navigate("/dashboard");
          if(!hasToastFired.current) {
            hasToastFired.current = true;
            toast("Welcom back!");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [])

  return (
    <div className="bg-zinc-900 text-white flex flex-col justify-center items-center h-screen w-screen">
      <div className="w-96 flex flex-col justify-center items-center rounded-2xl h-[460px] bg-white text-black py-10 px-7">
        <Headings
          heading="Sign In"
          subheading="Enter your details to continue"
        />
        <form className="mt-3 flex flex-col w-full" onSubmit={handleSubmit}>
          <InputBox
            label="Email"
            value={email}
            placeholder="johndoe@gmail.com"
            onChange={(e) => setEmail(e.target.value)}
          />

          <PasswordInput />
          <Button type="submit" classname="w-full text-white">Submit</Button>
          <Subheading />
        </form>

        <Subheading className="mt-3">
          Don't have an account?
          <Link to={"/signup"} className="font-bold ml-1">
            Sign-up
          </Link>
        </Subheading>
      </div>
    </div>
  );
}

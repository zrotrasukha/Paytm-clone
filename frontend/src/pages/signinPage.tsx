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
import Card from "../components/card";

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
      if (response.status !== 200) {
        throw new Error;
      }
      toast.success(`${email} signed in successfully!`);
      navigate("/dashboard");
      
    } catch (error) {
      toast.error("Something went wrong!");
      console.error("AXIOS ERROR:", error);
      if (axios.isAxiosError(error)) {
        console.error("Response Data:", error.response?.data);
        console.error("Status Code:", error.response?.status);
      }
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
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
    getUser();
  }, [])

  const isFormFilled = email && password ? false : true;
  return (
    <Card>
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
          <Button type="submit" disabled={isFormFilled} classname="w-full text-white">Submit</Button>
          <Subheading />
        </form>

        <Subheading className="mt-3">
          Don't have an account?
          <Link to={"/signup"} className="font-bold ml-1">
            Sign-up
          </Link>
        </Subheading>
    </Card>
  );
}

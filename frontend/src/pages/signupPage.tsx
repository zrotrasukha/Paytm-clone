import Button from "../components/button";
import { PasswordInput } from "../components/passwordInput";
import axios from "axios";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
import { useAppContext } from "../context/context";
import InputBox from "../components/input";
import Headings from "../components/header";
import Subheading from "../components/subheading";
import { Link } from "react-router";
import Card from "../components/card";

export const SignupPage = () => {
  const {
    firstName,
    setFirstName,
    lastName,
    setLastName,
    email,
    setEmail,
    password,
  } = useAppContext();

  const navigate = useNavigate();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:3000/api/v1/user/signup",
        { firstName, lastName, email, password },
        {
          withCredentials: true,
        },
      );

      if (response?.status === 200) {
        console.log(response.data);
        toast.success("User created successfully");
        navigate("/signin");
      }

      return;
    } catch (error: any) {
      console.error(error);
      toast.error("Something went wrong while signing up");
      return;
    }
  };

  const isFormFilled = firstName && lastName && email && password ? false : true;
  return (
    <Card classname="h-fit">
      <Headings
        heading="Sign Up"
        subheading="Create an account to continue"
      />
      <form className="mt-3 flex flex-col w-full" onSubmit={handleSubmit}>
        <InputBox
          label="First Name"
          value={firstName}
          placeholder="John"
          onChange={(e) => setFirstName(e.target.value)}
        />
        <InputBox
          label="Last Name"
          placeholder="Doe"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
        />
        <InputBox
          label="Email"
          placeholder="johnDoe@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <PasswordInput />
        <Button disabled={isFormFilled} type="submit" classname="w-full text-white">Submit</Button>
      </form>
      <Subheading className="mt-3">
        Already have an account?
        <Link to={"/signin"} className="font-bold ml-1">
          Sign in
        </Link>
      </Subheading>
    </Card>
  );
};

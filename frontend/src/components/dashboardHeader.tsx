import axios from "axios";
import { useEffect } from "react";
import * as React from "react";
import { useNavigate } from "react-router";

export default function DashboardHeader() {
  const [username, setUsername] = React.useState("");
  const navigate = useNavigate()
  const getUser = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/v1/user/getuser", {withCredentials: true}); 
      if(response.status === 404 || response.status === 500){
        navigate("/signin")
        throw new Error("User not found");
      }
      setUsername(response.data.user.firstName);
      console.log(response.data.username);
    } catch (error) {
      console.log(error);
      navigate('/signin')
      return { error: "Error while fetching user" }; 
    }
  }
  useEffect(() => {
    try {
      getUser()
      console.log("User was fetched from useEffect and has been set to state");
    } catch (error) {
      console.log(error);
    }
   }, [username, setUsername]);

  return (
    <section className=" text-black flex justify-between px-4 items-center w-full h-15 bg-white">
      <h1> Payments App</h1>
      <div>
        <h3>Hello {username}</h3>

      </div>
    </section>
  );
}

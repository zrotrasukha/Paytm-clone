import axios from "axios";
import { useAppContext } from "../context/context";
import Button from "./button";
import ProfilePicture from "./profilePicture";
import { useNavigate } from "react-router";
import toast from "react-hot-toast";
export default function DashboardHeader() {
  const {username } = useAppContext();
  const firstLetterCapital = username.charAt(0).toUpperCase() + username.slice(1);
  const navigate = useNavigate();
  const logout = async () => {
    try {
      const response = await axios.post("http://localhost:3000/api/v1/user/logout", {}, {
        withCredentials: true,});
      if (!response || response.status !== 200) {
        throw new Error("Error while logging out");
      }
      navigate('/signin');
      toast.success("Logged out successfully");
    } catch (error) {
      toast.error("Error while logging out");
      console.log(error);
      
    }
  } 
  return (
    <section className="flex justify-between px-4 items-center w-full h-15 bg-zinc-800 text-white border-b-2 border-b-neutral-300">
      <div className="font-extrabold text-xl">Payments App</div>
      <div className="flex justify-center items-center gap-3">
        <h3>Hello {firstLetterCapital}!</h3>
        <ProfilePicture name={username} className="bg-white"/>
        <Button onClick={logout} classname="bg-neutral-900" >logout</Button>
      </div>
    </section>
  );
}

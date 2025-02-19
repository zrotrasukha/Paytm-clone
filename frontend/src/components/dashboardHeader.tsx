import { useAppContext } from "../context/context";
import ProfilePicture from "./profilePicture";
export default function DashboardHeader() {
  const {username } = useAppContext();
  
  return (
    <section className="flex justify-between px-4 items-center w-full h-15 bg-zinc-800 text-white border-b-2 border-b-neutral-300">
      <div className="font-extrabold text-xl">Payments App</div>
      <div className="flex">
        <h3>Hello {username}!</h3>
        <ProfilePicture name={username}/>
      </div>
    </section>
  );
}

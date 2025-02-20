import ProfilePicture from "./profilePicture";
import Button from "./button";
import { useNavigate } from "react-router";
type props = {
  username: string;
  className?: string;
  to?: string; 
}
export default function SearchedUserBox({ username, className, to }: props) {
  
  const navigate = useNavigate();
  const handleEvent = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate(`/transfer/${to}`);
  };
  const userWithFirstLetterInCaps = username.charAt(0).toUpperCase() + username.slice(1);
  return (
    <div className={`flex hover:bg-neutral-800 hover:rounded-xl justify-between items-center p-2 text-white h-fit ${className}`}>
      <div className="flex items-center gap-5">
        <ProfilePicture 
        name={userWithFirstLetterInCaps}
        className="bg-white"
        />
        <h4 className="font-medium ">{userWithFirstLetterInCaps}</h4>
      </div>
      <Button
        classname="bg-white text-black font-semibold hover:bg-neutral-200"
        onClick={handleEvent}>
        Send Money
      </Button>

    </div>
  );
}

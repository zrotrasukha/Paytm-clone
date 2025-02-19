import ProfilePicture from "./profilePicture";
import Button from "./button";

type props = {
  username: string;
}
export default function SearchedUserBox({ username }: props) {
  const userWithFirstLetterInCaps = username.charAt(0).toUpperCase() + username.slice(1);
  return (
    <div className="flex justify-between items-center mt-10 p-2 text-white h-fit">
      <div className="flex items-center gap-5">
        <ProfilePicture name={userWithFirstLetterInCaps} />
        <h4 className="font-medium ">{userWithFirstLetterInCaps}</h4>
      </div>
      <Button classname="bg-white text-black font-semibold hover:bg-neutral-200">
        Send Money
      </Button>
    </div>
  );
}

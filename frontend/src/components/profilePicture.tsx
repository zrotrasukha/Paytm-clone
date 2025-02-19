import { getProfilePictureColor } from "../utils/generateColor";


export default function ProfilePicture({name}: {name: string}) {
  const colors = getProfilePictureColor({name});
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div
      className="rounded-full text-center h-8 w-8 flex ml-2  items-center px-3 "
      style={{ backgroundColor: colors.color, color: colors.textColor }}
    >
      {firstLetter}
    </div>
  );
}

export default function ProfilePicture({name}: {name: string}) {
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div
      className=" bg-white text-black rounded-full text-center h-8 w-8 flex items-center justify-center"

    >
      {firstLetter}
    </div>
  );
}

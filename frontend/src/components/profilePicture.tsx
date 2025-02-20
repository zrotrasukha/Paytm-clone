export default function ProfilePicture({name, className}: {name: string, className?: string}) {
  const firstLetter = name.charAt(0).toUpperCase();
  return (
    <div
      className={`text-black rounded-full text-center h-8 w-8 flex items-center justify-center ${className}`}

    >
      {firstLetter}
    </div>
  );
}

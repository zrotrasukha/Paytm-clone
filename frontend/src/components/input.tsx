type props = {
  label: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
  placeholder?: string;
};

export default function InputBox({
  label,
  value,
  onChange,
  className,
  placeholder,
}: props) {
  return (
    <div className="mb-5">
      <label className="text-md font-bold">{label}</label>
      <input
        type="text"
        value={value}
        placeholder={placeholder}
        className={`${className} outline-none focus:border-zinc-500 p-2 text-sm text-gray-700 border-2 w-full border-gray-300 rounded-md mt-1 text-md font-semibold`}
        onChange={onChange}
      />
    </div>
  );
}

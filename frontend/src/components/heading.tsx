type props = {
  heading: string;
  className?: string;
};

const Heading = ({ heading, className }: props) => {
  return (
    <div className={`text-black text-4xl font-bold ${className}`}>
      {heading}
    </div>
  );
};

export default Heading;

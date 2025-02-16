type props = {
  subheading: string;
  className?: string;
};

const Subheading = ({ subheading, className }: props) => {
  return <div className={`text-black text-sm ${className}`}>{subheading}</div>;
};

export default Subheading;

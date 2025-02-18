type props = {
  className?: string;
  children?: React.ReactNode;
};

const Subheading = ({  className, children }: props) => {
  return <div className={`text-black text-sm ${className}`}>{children}</div>;
};

export default Subheading;

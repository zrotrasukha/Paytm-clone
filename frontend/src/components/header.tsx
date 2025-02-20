import Heading from "./heading";
import Subheading from "./subheading";

export default function Headings({
  heading,
  subheading,
  className
}: {
  heading: string;
  subheading: string;
  className?: string;
}) {
  return (
  <div className={`flex flex-col ${className}`}>

      <Heading heading={heading} />
      <Subheading children={subheading} className="p-2" />
  </div>
  );
}

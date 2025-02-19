import Heading from "./heading";
import Subheading from "./subheading";

export default function Headings({
  heading,
  subheading,
}: {
  heading: string;
  subheading: string;
}) {
  return (
    <>
      <Heading heading={heading} />
      <Subheading children={subheading} className="p-2" />
    </>
  );
}

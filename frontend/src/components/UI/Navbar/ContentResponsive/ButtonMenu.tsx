import { AiOutlineMenu } from "react-icons/ai";

export default function ButtonMenu({
  setIsActive,
}: {
  setIsActive: (x: boolean) => void;
}) {
  return (
    <button
      className="size-fit block sm:hidden"
      onClick={() => setIsActive(true)}
    >
      <AiOutlineMenu className="text-white text-2xl" />
    </button>
  );
}

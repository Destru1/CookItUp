import { IconType } from "react-icons/lib";

interface CategoryInputProps {
  icon: IconType;
  label: string;
  selected?: boolean;
  onClick: (value: string) => void;
}
const CategoryInput = ({
  icon: Icon,
  label,
  selected,
  onClick,
}: CategoryInputProps) => {
  return (
    <div
      onClick={() => onClick(label)}
      className={`flex flex-col cursor-pointer items-center flex-shrink-0  rounded-lg p-4 transition hover:bg-neutral-100
       ${selected ? "outline outline-1 outline-black" : "border-neutral-200"}`}
    >
      <Icon size={26} />
      <div className="font-light mt-1">{label}</div>
    </div>
  );
};

export default CategoryInput;

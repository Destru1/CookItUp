import { IconType } from "react-icons/lib";
import { useCallback } from "react";
import queryString from "query-string";
import { useRouter, useSearchParams } from "next/navigation";
interface CategoryBoxProps {
  icon: IconType;
  label: string;
  selected?: boolean;
}
export const CategoryBox = ({
  icon: Icon,
  label,
  selected,
}: CategoryBoxProps) => {
  const router = useRouter();
  const params = useSearchParams();

  const handleClick = useCallback(() => {
    let currQuery = {};

    if (params) {
      currQuery = queryString.parse(params.toString());
    }

    const updatedQuery: any = {
      ...currQuery,
      category: label,
    };

    if (params?.get("category") == label) {
      delete updatedQuery.category;
    }

    const url = queryString.stringifyUrl(
      {
        url: "/",
        query: updatedQuery,
      },
      { skipNull: true },
    );
    router.push(url);
  }, [label, params, router]);
  return (
    <div
      onClick={handleClick}
      className={`flex flex-shrink-0 cursor-pointer flex-col items-center  justify-center gap-2 border-b-2 p-3 transition hover:text-neutral-800 
      ${selected ? "border-b-neutral-800" : "border-transparent"}
      ${selected ? "text-neutral-800" : "text-neutral-500"}`}
    >
      <Icon size={24} />
      <div className="text-sm font-medium">{label}</div>
    </div>
  );
};

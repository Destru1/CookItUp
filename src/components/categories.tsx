import Container from "./container";


import { usePathname, useSearchParams } from "next/navigation";
import { CategoryBox } from "./category-box";
import { categories } from "~/data/categories";


const Categories = () => {
  const params = useSearchParams();
  const category = params?.get("category");
  const pathname = usePathname();
  const isMainPage = pathname == "/";

  if (!isMainPage) {
    return null;
  }
  return (
    <Container>
      <div className="flex items-center justify-between overflow-x-auto pt-4">
        {categories.map((item) => (
          <CategoryBox
            key={item.label}
            label={item.label}
            selected={category == item.label}
            icon={item.icon}
          />
        ))}
      </div>
    </Container>
  );
};

export default Categories;

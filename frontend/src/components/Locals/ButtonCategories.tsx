import { useEffect, useState } from "react";
import type { Category } from "../../interface";

export default function ButtonCategories({
  item,
  categories,
}: {
  item: string;
  categories: Category[];
}) {
  const [isValueCate, setIsValueCate] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idCategory = params.get("c");

    if (idCategory) {
      setIsValueCate(idCategory.toLocaleLowerCase());
    }
  }, []);

  const filterCategories = (category: string) => {
    const filtered = categories.filter(
      (item) => item.types?.toLocaleLowerCase() === category.toLocaleLowerCase()
    );
    return filtered || [];
  };

  return (
    <li className="flex flex-col gap-y-2 h-fit w-full">
      <span className="font-semibold text-xl">{item}</span>
      <ul className="flex gap-x-2 gap-y-5 flex-wrap ">
        {filterCategories(item).map((subItem: Category) => (
          <li key={subItem.id} className="size-fit">
            <a
              className={`bg-red-white text-red-500 border border-red-500 rounded-lg py-2 px-3 size-fit capitalize ${
                isValueCate === subItem.title.toLocaleLowerCase()
                  ? "text-white bg-red-500 "
                  : "text-red-500 border border-red-500 size-fit"
              }`}
              href={`/locals?c=${subItem.title}`}
              onClick={() => {
                if (
                  isValueCate &&
                  isValueCate === subItem.title.toLocaleLowerCase()
                ) {
                  setIsValueCate("");
                  window.location.href = "/locals";
                }
              }}
            >
              {subItem.title}
            </a>
          </li>
        ))}
      </ul>
    </li>
  );
}

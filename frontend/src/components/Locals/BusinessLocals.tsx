import { useEffect, useState } from "react";
import type { BusinessItemCard } from "../../interface";
import { strapiFetch } from "../../utils/fetch";
import Cards from "../UI/Cards/Tag/Cards.astro";
import ReactCardFilter from "./ReactCardFilter/ReactCardFilter";

export default function BusinessLocals() {
  const [isFilterCategory, seyIsFilterCategory] = useState<BusinessItemCard[]>(
    []
  );

  const fetchAndFilter = async (id: string) => {
    const res = await strapiFetch(
      "/businesses?fields[0]=title&fields[1]=shortdescription&populate[imagelogo][fields][0]=url&populate[tags][fields][0]=*&populate=categories",
      {
        method: "GET",
      }
    );

    const fetchBusiness = res.data as BusinessItemCard[];
    //console.log(fetchBusiness, id);

    const filtered = id
      ? fetchBusiness.filter((item) =>
          item?.categories?.some(
            (subItem) =>
              subItem.title.toLocaleLowerCase() === id.toLocaleLowerCase()
          )
        )
      : fetchBusiness;

    //console.log(filtered);

    seyIsFilterCategory(filtered);
  };

  const fetchAndSearch = async (id: string) => {
    const res = await strapiFetch(
      "/businesses?fields[0]=title&fields[1]=shortdescription&populate[imagelogo][fields][0]=url&populate[tags][fields][0]=*&populate=categories",
      {
        method: "GET",
      }
    );
    const fetchBusiness = res.data as BusinessItemCard[];

    const filtered = id
      ? fetchBusiness.filter((item) => {
          // 1. Condición para el título de la categoría
          const isCategoryMatch = item.categories?.some(
            (subItem) =>
              subItem.title.toLocaleLowerCase() === id.toLocaleLowerCase()
          );

          // 2. Condición para la descripción
          const isDescriptionMatch = item.shortdescription
            ?.toLocaleLowerCase()
            .includes(id.toLocaleLowerCase());

          // 3. Condición para los tags
          const isTagMatch = item.tags?.some(
            (tag) => tag.itemtag.toLocaleLowerCase() === id.toLocaleLowerCase()
          );

          // El item se mantiene si al menos una de las condiciones es verdadera
          return isCategoryMatch || isDescriptionMatch || isTagMatch;
        })
      : fetchBusiness;
    seyIsFilterCategory(filtered);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idSearch = params.get("s");
    const idCategory = params.get("c");
    //console.log(idCategory);
    if (idCategory && !idSearch) {
      fetchAndFilter(idCategory);
    } else if (idSearch && !idCategory) {
      fetchAndSearch(idSearch);
    } else {
      fetchAndFilter("");
    }
  }, []);

  //console.log(isFilterCategory);

  return (
    <ul className="flex gap-5">
      {isFilterCategory.map((item) => (
        <ReactCardFilter
          key={item.id}
          imageLogo={item.imagelogo.url}
          title={item.title}
          tags={item.tags}
          shortDescription={item.shortdescription}
        />
      ))}
    </ul>
  );
}

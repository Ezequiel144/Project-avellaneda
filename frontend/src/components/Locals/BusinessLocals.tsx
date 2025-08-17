import { useEffect, useState } from "react";
import type { BusinessItemCard } from "../../interface";
import { strapiFetch } from "../../utils/fetch";

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

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idCategory = params.get("c");
    //console.log(idCategory);
    if (idCategory) {
      fetchAndFilter(idCategory);
    } else {
      fetchAndFilter("");
    }
  }, []);

  //console.log(isFilterCategory);

  return (
    <ul>
      {isFilterCategory.map((item) => (
        <li key={item.id}>{item.title}</li>
      ))}
    </ul>
  );
}

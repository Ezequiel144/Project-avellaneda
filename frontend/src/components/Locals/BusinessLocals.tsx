import { useEffect, useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { IoIosAlert } from "react-icons/io";
import { normalizeString } from "../../helpers/deleteAcent";
import type { BusinessItemCard } from "../../interface";
import { strapiFetch } from "../../utils/fetch";
import ReactCardFilter from "./ReactCardFilter/ReactCardFilter";

export default function BusinessLocals() {
  const [isFilterCategory, seyIsFilterCategory] = useState<BusinessItemCard[]>(
    []
  );
  const [loading, setLoading] = useState<boolean>(true);

  const fetchAndFilter = async (id: string) => {
    setLoading(true);
    const res = await strapiFetch(
      "/businesses?fields[0]=title&fields[1]=shortdescription&populate[imagelogo][fields][0]=url&populate[tags][fields][0]=*&populate=category",
      {
        method: "GET",
      }
    );

    const fetchBusiness = res.data as BusinessItemCard[];
    //console.log(fetchBusiness, id);

    const filtered = id
      ? fetchBusiness.filter((item) =>
          item?.category?.some(
            (subItem) =>
              subItem.title.toLocaleLowerCase() === id.toLocaleLowerCase()
          )
        )
      : fetchBusiness;

    console.log(filtered);

    seyIsFilterCategory(filtered);
    setLoading(false);
  };

  const fetchAndSearch = async (id: string) => {
    setLoading(true);
    const res = await strapiFetch(
      "/businesses?fields[0]=title&fields[1]=shortdescription&populate[imagelogo][fields][0]=url&populate[tags][fields][0]=*&populate=category",
      {
        method: "GET",
      }
    );
    const fetchBusiness = res.data as BusinessItemCard[];

    console.log(fetchBusiness);
    const filtered = id
      ? fetchBusiness.filter((item) => {
          // 1. Condición para el título de la categoría
          const isCategoryMatch = item.category?.some(
            (subItem) =>
              normalizeString(subItem.title.toLocaleLowerCase()) ===
              normalizeString(id.toLocaleLowerCase())
          );

          // 2. Condición para la descripción
          const isDescriptionMatch = normalizeString(
            item.shortdescription?.toLocaleLowerCase()
          ).includes(normalizeString(id.toLocaleLowerCase()));

          // 3. Condición para los tags
          const isTagMatch = item.tags?.some(
            (tag) =>
              normalizeString(tag.itemtag.toLocaleLowerCase()) ===
              normalizeString(id.toLocaleLowerCase())
          );

          // El item se mantiene si al menos una de las condiciones es verdadera
          return isCategoryMatch || isDescriptionMatch || isTagMatch;
        })
      : fetchBusiness;

    seyIsFilterCategory(filtered);
    setLoading(false);
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

  if (loading) {
    return (
      <div className="w-full text-center flex flex-col gap-y-2 items-center">
        <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
      </div>
    );
  }

  if (isFilterCategory.length === 0) {
    return (
      <div className="w-full text-center flex flex-col gap-y-2 items-center">
        <IoIosAlert className="text-8xl text-red-500" />
        <h2 className="text-xl font-semibold ">
          No se encontro nada en tu busqueda :{"("}
        </h2>
        <p className="text-base font-normal text-[#1e1e1e]/70">
          Lo que buscaste no tubo resultados
        </p>
        <a
          href="/locals"
          className="size-fit py-3 px-5 bg-red-500 text-white rounded-xl text-base font-semibold"
        >
          Ver todo los negocios
        </a>
      </div>
    );
  }

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

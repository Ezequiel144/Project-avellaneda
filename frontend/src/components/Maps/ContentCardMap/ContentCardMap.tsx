import { useEffect, useState } from "react";
import { normalizeString } from "../../../helpers/deleteAcent";
import type { BusinessItemCardMap } from "../../../interface/business";
import { strapiFetch } from "../../../utils/fetch";
import CardMapReact from "./CardMapReact";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ContentCardMap() {
  const [isBusiness, setIsBusiness] = useState<BusinessItemCardMap[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchBusiness = async (id: string) => {
    setLoading(true);
    const res = await strapiFetch(
      "/businesses?fields[0]=title&fields[1]=shortdescription&populate[imagelogo][fields][0]=url&populate[tags][fields][0]=*&populate[directions]=*",
      {
        method: "GET",
      }
    );
    const fetchBusiness = res.data as BusinessItemCardMap[];

    const filtered = id
      ? fetchBusiness.filter((item) => {
          //1.Condicion para el titulo
          const isTitle = normalizeString(item.title)
            .toLocaleLowerCase()
            .includes(normalizeString(id).toLocaleLowerCase());

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
          return isTitle || isDescriptionMatch || isTagMatch;
        })
      : fetchBusiness;

    setIsBusiness(filtered);
    setLoading(false);
  };

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idSearch = params.get("s");
    if (idSearch) {
      fetchBusiness(idSearch);
    } else {
      fetchBusiness("");
    }
  }, []);

  //console.log(isBusiness);

  if (loading) {
    return (
      <div className="w-full text-center flex flex-col gap-y-2 items-center">
        <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
      </div>
    );
  }

  if (isBusiness.length === 0) {
    return (
      <div className="bg-white p-6 rounded-xl">No se encontro lo buscado</div>
    );
  }

  return (
    <ul
      id="business-list"
      className="flex gap-x-3 overflow-auto w-full max-w-[1200px] z-10"
    >
      {isBusiness.map((item) => (
        <CardMapReact
          key={item.id}
          id={item.id}
          title={item.title}
          tags={item.tags}
          shortDescription={item.shortdescription}
          imageLogo={item.imagelogo.url}
          direction={item.directions}
        />
      ))}
    </ul>
  );
}

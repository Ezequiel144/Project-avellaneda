import { useEffect, useState } from "react";
import ReactCardFilter from "../../Locals/ReactCardFilter/ReactCardFilter";
import { strapiFetch } from "../../../utils/fetch";
import type { BusinessItemCardGalery } from "../../../interface/business";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { ReactInputSearch } from "./ReactInputSearch";

export function ReactContentGalery({ documentId }: { documentId: string }) {
  const [listBusinessesFilter, setListBusinessesFilter] = useState<
    BusinessItemCardGalery[] | null
  >(null);
  const [filterBusinesses, setFilterBusinesses] = useState<
    BusinessItemCardGalery[] | null
  >(null);

  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchAndFilterBusinesses = async (currentId: string) => {
      try {
        // 1. Obtener los negocios de la API.
        setIsLoading(true);
        const res = await strapiFetch(
          `/businesses?filters[galery][documentId][$eq]=${currentId}&fields[0]=title&fields[1]=shortdescription&populate[imagelogo][fields][0]=url&populate[tags][fields][0]=*&populate=galery`,
          {
            method: "GET",
          },
        );

        setListBusinessesFilter(res.data as BusinessItemCardGalery[]);
        //setAllBusinesses(res.data as BusinessItemCardGalery[]);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener y filtrar negocios:", error);
      }
    };

    if (documentId) {
      fetchAndFilterBusinesses(documentId);
    }
  }, [documentId]);

  useEffect(() => {
    if (!listBusinessesFilter) {
      setFilterBusinesses(null);
      return;
    }

    const filtered = listBusinessesFilter.filter((business) =>
      business.title.toLowerCase().includes(searchTerm.toLowerCase()),
    );

    setFilterBusinesses(filtered);
  }, [listBusinessesFilter, searchTerm]);

  //console.log(filterBusinesses);

  if (isLoading) {
    return (
      <div className="bg-white p-5 rounded-xl w-full h-fit max-h-[90%] gap-y-5 flex flex-col">
        <div className="w-full text-center flex flex-col gap-y-2 items-center">
          <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
        </div>
      </div>
    );
  }

  //console.log(filterBusinesses);

  return (
    <div className="flex flex-col gap-y-5">
      <p>{filterBusinesses?.length || 0} locales en total</p>
      <ReactInputSearch searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      {listBusinessesFilter?.length !== 0 ? (
        <ul className="gap-5 grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(282px,1fr))]">
          {filterBusinesses?.map((business) => (
            <ReactCardFilter
              key={business.id}
              id={business.id}
              imageLogo={business.imagelogo?.url || ""}
              title={business.title || ""}
              tags={business.tags}
              shortDescription={business.shortdescription || ""}
            />
          ))}
        </ul>
      ) : (
        <p>No hay locales disponibles.</p>
      )}
    </div>
  );
}

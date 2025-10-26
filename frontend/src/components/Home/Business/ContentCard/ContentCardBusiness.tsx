import { useEffect, useState } from "react";
import { strapiFetch } from "../../../../utils/fetch";
import type { BusinessItemCard } from "../../../../interface";
import CardBusiness from "./CardBusiness";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function ContentCardBusiness() {
  const [isBusiness, setIsBusiness] = useState<BusinessItemCard[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [isPageSize, setIsPageSize] = useState<number>(8);

  const fetchBusiness = async () => {
    setLoading(true);
    const res = await strapiFetch(
      `/businesses?fields[0]=title&fields[1]=shortdescription&populate[imagelogo][fields][0]=url&populate[tags][fields][0]=*&pagination[page]=1&pagination[pageSize]=${isPageSize}`,
      {
        method: "GET",
      }
    );
    const fetchBusiness = res.data as BusinessItemCard[];

    setIsBusiness(fetchBusiness);
    setLoading(false);
  };

  useEffect(() => {
    fetchBusiness();
  }, [isPageSize]);

  if (loading) {
    return (
      <div className="w-full text-center flex flex-col gap-y-2 items-center">
        <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
      </div>
    );
  }

  return (
    <article className="flex flex-col gap-y-3 w-full items-center">
      <ul className="justify-start grid grid-cols-2 sm:grid-cols-[repeat(auto-fit,minmax(282px,1fr))] gap-5 w-full">
        {isBusiness.map((item: BusinessItemCard) => (
          <CardBusiness
            key={item.id}
            id={item.id}
            imageLogo={item.imagelogo.url}
            title={item.title}
            tags={item.tags}
            shortDescription={item.shortdescription}
          />
        ))}
      </ul>
      {isBusiness.length % 8 === 0 && (
        <button
          className="bg-red-500 text-white rounded-xl py-3 px-8 text-base md:text-xl cursor-pointer w-full md:w-fit font-semibold"
          onClick={() => setIsPageSize((prev) => prev + 8)}
        >
          {" "}
          Ver + locales{" "}
        </button>
      )}
    </article>
  );
}

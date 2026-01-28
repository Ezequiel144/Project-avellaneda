import { useEffect, useState } from "react";
import { strapiFetch } from "../../../utils/fetch";
import type { GaleryItem } from "../../../interface";

export default function ContentCardGeleries() {
  const [isGaleries, setIsGaleries] = useState<GaleryItem[]>([]);
  const [loading, setLoading] = useState<boolean>(true);

  const fetchGaleries = async () => {
    setLoading(true);
    const res = await strapiFetch(
      `/galeries?populate[image][fields][0]=url&populate=direction&pagination[limit]=1000`,
      {
        method: "GET",
      },
    );
    const fetchgaleries = res.data as GaleryItem[];

    setIsGaleries(fetchgaleries);
    setLoading(false);
  };

  useEffect(() => {
    fetchGaleries();
  }, []);

  //console.log(isGaleries);
  if (loading) {
    return (
      <div className="w-full text-center flex flex-col gap-y-2 items-center">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-red-500"></div>
        <p className="text-gray-500">Cargando galerías...</p>
      </div>
    );
  }

  return (
    <ul
      className="grid
  grid-rows-2
  grid-flow-col
  auto-cols-[384px]
  gap-6
  overflow-x-auto
  snap-x
  snap-mandatory
  scroll-smooth
  w-full
  py-1"
    >
      {isGaleries.map((item) => (
        <li
          key={item.id}
          className="snap-start rounded-lg flex flex-col snap-always"
        >
          <a
            href={`/galeryid/${item.documentId}`}
            className="h-[180px] w-[384px] overflow-hidden rounded-lg"
          >
            <img
              src={item.image?.url}
              alt={item.title}
              className="object-cover size-full overflow-hidden rounded-lg hover:scale-105 transition-all duration-300"
            />
          </a>
          <h4 className="font-semibold text-xl p-2">{item.title}</h4>
        </li>
      ))}
    </ul>
  );
}

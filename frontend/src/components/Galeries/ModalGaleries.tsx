import { useEffect, useState } from "react";
import { AiOutlineClose, AiOutlineLoading3Quarters } from "react-icons/ai";
//import listBusiness from "../../data/business.data.json";
import type { BusinessItemCardGalery, GaleryItem } from "../../interface";
import { strapiFetch } from "../../utils/fetch";
import ReactCardGalery from "./ReactCardGalery/ReactCardGalery";

export default function ModalGaleries({
  listGaleries,
}: {
  listGaleries: GaleryItem[];
}) {
  const [modalId, setModalId] = useState<string | null>(null);
  const [galery, setGalery] = useState<GaleryItem | null>(null);
  const [businessFiltered, setBusinessFiltered] = useState<
    BusinessItemCardGalery[]
  >([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  //const { URL_STRAPI } = envVariants();

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("m");
    setModalId(id);

    const fetchAndFilterBusinesses = async (currentId: string) => {
      try {
        // 1. Obtener los negocios de la API.
        setIsLoading(true);
        const res = await strapiFetch(
          "/businesses?fields[0]=title&fields[1]=shortdescription&populate[imagelogo][fields][0]=url&populate[tags][fields][0]=*&populate=galery",
          {
            method: "GET",
          }
        );
        const fetchedBusinesses = res.data as BusinessItemCardGalery[];

        // 2. Encontrar la galería correcta del listado inicial.
        const galeryFound = listGaleries.find(
          (gal) => gal.id.toString() === currentId
        );
        setGalery(galeryFound || null);

        // 3. Filtrar los negocios con los datos recién obtenidos.
        const newListBusiness = fetchedBusinesses.filter(
          (item) => item?.galery?.id.toString() === currentId
        );
        //console.log(fetchedBusinesses);
        setBusinessFiltered(newListBusiness);
        setIsLoading(false);
      } catch (error) {
        console.error("Error al obtener y filtrar negocios:", error);
      }
    };

    if (id) {
      fetchAndFilterBusinesses(id);
    }
  }, [listGaleries]); // Se ejecuta al montar y cuando `listGaleries` cambie.

  if (!modalId) {
    return null;
  }

  return (
    <div className="size-full z-20 bg-black/30 backdrop-blur-lg fixed top-0 left-0 flex items-center justify-center ">
      {!isLoading ? (
        <div className="bg-white p-5 rounded-xl w-full md:w-[964px] h-fit max-h-[90%] gap-y-5 flex flex-col">
          <div className="w-full h-[295px] rounded-lg overflow-hidden relative">
            <img
              src={`${galery?.image?.url}`}
              className="size-full object-cover"
              alt="image-galery"
              onError={(e) => {
                const target = e.currentTarget;
                target.onerror = null;
                target.src = "/image/no-image.png";
              }}
            />
            <a
              href="/galeries"
              className=" bg-white rounded-full p-3 absolute top-2 right-2"
            >
              <AiOutlineClose className="text-xl" />
            </a>
          </div>
          <h2 className="text-2xl md:text-3xl font-semibold">
            {galery?.title}
          </h2>
          <p className="text-base font-normal text-[#A3A3A3] capitalize">
            {galery?.direction.country}, {galery?.direction.province},{" "}
            {galery?.direction.locality}, {galery?.direction.postalcode},{" "}
            {galery?.direction.street} {galery?.direction.number}
          </p>
          <a
            href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
              galery?.direction.street +
                " " +
                galery?.direction.number +
                ", " +
                galery?.direction.locality +
                ", " +
                galery?.direction.province +
                ", " +
                galery?.direction.country
            )}`}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full py-4 bg-red-500 text-white text-base md:text-xl font-semibold text-center rounded-xl"
          >
            Ver en mapa
          </a>
          {businessFiltered.length !== 0 && (
            <ul className=" md:grid sm:grid-cols-2 overflow-auto gap-4 h-fit max-h-[200px] md:max-h-[300px] pb-6">
              {businessFiltered.map((item) => (
                <ReactCardGalery
                  key={item.id}
                  imageLogo={item.imagelogo}
                  title={item.title}
                  tags={item.tags}
                  shortDescription={item.shortdescription}
                />
              ))}
            </ul>
          )}
        </div>
      ) : (
        <div className="bg-white p-5 rounded-xl w-full md:w-[964px] h-fit max-h-[90%]  gap-y-5 flex flex-col">
          <div className="w-full text-center flex flex-col gap-y-2 items-center">
            <AiOutlineLoading3Quarters className="text-2xl animate-spin" />
          </div>
        </div>
      )}
    </div>
  );
}

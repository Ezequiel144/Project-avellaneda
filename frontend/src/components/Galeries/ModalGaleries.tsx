import { useEffect, useState } from "react";
import { AiOutlineClose } from "react-icons/ai";
import listBusiness from "../../data/business.data.json";
import type { GaleryItem } from "../../interface";
import ReactCardGalery from "./ReactCardGalery/ReactCardGalery";

export default function ModalGaleries({
  listGaleries,
}: {
  listGaleries: GaleryItem[];
}) {
  const [modalId, setModalId] = useState<string | null>(null);
  const [galery, setGalery] = useState<GaleryItem | null>(null);
  const [businessFiltered, setBusinessFiltered] = useState<any[]>([]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setModalId(params.get("m"));
  }, []);

  useEffect(() => {
    if (modalId) {
      const galery = listGaleries.find((gal) => gal.id === modalId);
      setGalery(galery || null);
      filteredBusiness(modalId);
    }
  }, [modalId]);

  const filteredBusiness = (id: string) => {
    const newListBusiness = listBusiness.filter(
      (item) => item.galery.id === id
    );
    setBusinessFiltered(newListBusiness);
  };
  if (!modalId) {
    return null; // Si no hay modalId, no renderizamos nada
  }

  //console.log(businessFiltered);

  return (
    <div className="size-full z-10 bg-black/30 backdrop-blur-lg fixed top-0 left-0 flex items-center justify-center ">
      <div className="bg-white p-5 rounded-xl w-[964px] h-fit overflow-auto gap-y-5 flex flex-col">
        <div className="w-full h-[295px] rounded-lg overflow-hidden relative">
          <img
            src={`../image/${galery?.image}`}
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
        <h2 className="text-3xl font-semibold">{galery?.title}</h2>
        <p className="text-base font-normal text-[#A3A3A3]">
          {galery?.direction}
        </p>
        <a
          href="#"
          target="_blank"
          rel="noopener noreferrer"
          className="w-full py-4 bg-red-500 text-white text-xl font-semibold text-center rounded-xl"
        >
          Ver en mapa
        </a>
        <ul className="grid grid-cols-2 overflow-auto gap-4 max-h-[300px] pb-6">
          {businessFiltered.map((item) => (
            <ReactCardGalery
              key={item.id}
              imageLogo={item.imageLogo}
              title={item.title}
              tags={item.tags}
              shortDescription={item.shortDescription}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

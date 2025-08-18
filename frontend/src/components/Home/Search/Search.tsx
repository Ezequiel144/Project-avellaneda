import { useState } from "react";
import { BiSolidMap } from "react-icons/bi";

export default function Search() {
  const [isValueSearch, setIsValueSearch] = useState<string>("");
  //console.log(isValueSearch);
  return (
    <div className="flex flex-col w-full max-w-[740px] gap-y-3">
      <article className="flex items-center gap-x-4 w-full">
        <input
          type="search"
          className="bg-[#B3B3B3]/50 px-4 py-4 rounded-lg w-full"
          placeholder="Que vas a comprar"
          onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
            setIsValueSearch(e.target.value);
          }}
          value={isValueSearch}
        />
        <a
          href={`/locals?s=${isValueSearch}`}
          className="px-8 h-full bg-red-500 rounded-lg text-xl font-semibold cursor-pointer flex items-center justify-center"
        >
          Buscar
        </a>
      </article>
      <button className="px-8 py-4 h-full bg-red-500 rounded-lg text-xl font-semibold cursor-pointer flex items-center justify-center gap-x-2">
        <BiSolidMap className="text-2xl" /> Ver locales en mapa
      </button>
    </div>
  );
}

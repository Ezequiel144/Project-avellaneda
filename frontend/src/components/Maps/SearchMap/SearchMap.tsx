import { useEffect, useState } from "react";

export default function SearchMap() {
  const [isValueSearch, setIsValueSearch] = useState<string>("");
  const [isValueInput, setIsValueInput] = useState<string>("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const idMap = params.get("q");

    if (idMap) {
      //console.log("existe solo el idMap - &s=valor");
      setIsValueSearch(`/maps?q=${idMap}&s=${isValueInput}`);
    } else if (!idMap) {
      //console.log("no existe solo el idMap - ?s=valor");
      setIsValueSearch(`/maps?s=${isValueInput}`);
    }
  }, [isValueInput]);

  //console.log(isValueInput);

  return (
    <div className="w-full flex text-white gap-x-3 ">
      <input
        type="search"
        className="w-full p-3 bg-[#B3B3B3]/70 rounded-xl"
        placeholder="Que vas a buscar ?"
        onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
          setIsValueInput(e.target.value)
        }
        value={isValueInput}
      />
      <a
        href={isValueSearch}
        className="bg-red-500 py-3 px-4 rounded-xl font-semibold"
      >
        Buscar
      </a>
    </div>
  );
}

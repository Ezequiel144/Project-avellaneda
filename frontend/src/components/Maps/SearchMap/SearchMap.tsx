export default function SearchMap() {
  return (
    <div className="w-full flex text-white gap-x-3 ">
      <input
        type="search"
        className="w-full p-3 bg-[#B3B3B3]/70 rounded-xl"
        placeholder="Que vas a buscar ?"
      />
      <button className="bg-red-500 py-3 px-4 rounded-xl">Buscar</button>
    </div>
  );
}

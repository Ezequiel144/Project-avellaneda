import { useState } from "react";

export function ReactInputSearch({
  searchTerm,
  setSearchTerm,
}: {
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}) {
  return (
    <input
      type="text"
      className="w-full rounded-xl px-4 py-3 bg-[#B3B3B3]/50 placeholder:text-gray-700"
      placeholder="Buscar local"
      onChange={(e) => setSearchTerm(e.target.value)}
    />
  );
}

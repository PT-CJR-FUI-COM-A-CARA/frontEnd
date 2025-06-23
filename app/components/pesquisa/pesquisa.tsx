import React from "react";
import { BiSearch } from 'react-icons/bi';

interface BarraPesProps {
  onSearch: (searchTerm: string) => void;
}

const BarraPes: React.FC<BarraPesProps> = ({ onSearch }) => {
  const [search, setSearch] = React.useState("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
  };

  return (
    <div className="w-full max-w-md px-4 py-5 text-left">
      <div className="relative w-full">
        <BiSearch className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl" />
        <input
          type="search"
          value={search}
          onChange={handleChange}
          placeholder="Buscar professor(a)"
          className="w-full border-2 border-gray-300 pl-12 pr-4 py-3 rounded-xl bg-white text-black placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-[#050036]"
        />
      </div>
    </div>
  );
};

export default BarraPes;

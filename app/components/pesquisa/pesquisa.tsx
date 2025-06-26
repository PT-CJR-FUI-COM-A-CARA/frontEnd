import React from "react";
import { BiSearch } from 'react-icons/bi';

interface BarraPesProps {
  onSearch: (searchTerm: string) => void;
  sugestoes: string[];
}

const BarraPes: React.FC<BarraPesProps> = ({ onSearch, sugestoes}) => {
  const [search, setSearch] = React.useState("");
  const [mostrarSugestoes, setSugestoes] = React.useState(true);


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearch(value);
    onSearch(value);
    setSugestoes(true);
  };

  const handleClickSugestao = (nome: string) => {
    setSearch(nome);
    onSearch(nome);
    setSugestoes(false);
  };

  const sugestoesFiltradas = sugestoes.filter(
    (s) => s.toLowerCase().startsWith(search.toLowerCase()) && search !== ""
  );

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
        {mostrarSugestoes && sugestoesFiltradas.length > 0 && (
        <ul className="absolute z-10 mt-2 w-full bg-white border border-gray-300 rounded-xl shadow-md max-h-60 overflow-y-auto">
          {sugestoesFiltradas.map((nome, index) => (
            <li
              key={index}
              onClick={() => handleClickSugestao(nome)}
              className="px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              {nome}
            </li>
          ))}
        </ul>
        )}
      </div>
    </div>
  );
};

export default BarraPes;

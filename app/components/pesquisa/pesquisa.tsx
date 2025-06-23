import React from "react";

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
      <input
        type="search"
        value={search}
        onChange={handleChange}
        placeholder="Buscar professor(a)"
        className="w-full border-2 border-black-600 pl-12 pr-4 py-3 rounded-xl bg-white text-black placeholder-gray-400"
      />
    </div>
  );
};

export default BarraPes;

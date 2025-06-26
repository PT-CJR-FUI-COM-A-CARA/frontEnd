'use client';
import React, { useRef, useEffect } from 'react';
import { useRouter } from 'next/navigation';

interface MenuModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const MenuModal: React.FC<MenuModalProps> = ({ isOpen, onClose }) => {
  const modalContentRef = useRef<HTMLDivElement>(null);
  const router = useRouter();

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (modalContentRef.current && !modalContentRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    <div
      className="fixed inset-0 bg-[rgba(5,0,54,0.30)] z-40 flex items-center justify-center"
      onClick={onClose}
    >
      <div
        ref={modalContentRef}
        className="bg-[#ECEDBC] w-[70%] h-[80%] rounded-[20px] shadow-xl py-6 px-8 z-50 flex flex-col justify-between"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Formulário */}
        <form className="flex flex-col h-full w-full justify-between gap-4">

          {/* Selects */}
          <div className="flex flex-col gap-4 pt-[25px] ">
            <div className="relative">
              <select
                defaultValue=""
                className="w-full px-4 py-4 bg-[white] pl-[30px] text-[#9CA3AF] text-xl rounded-[20px] border border-gray-300 appearance-none focus:outline-none"
              >
                <option value="" disabled className=''>Nome do professor</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 pr-[20px]">
                <svg className="h-7 w-7 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="currentColor"><polygon points="0,0 10,0 5,6" /></svg>
              </div>
            </div>

            <div className="relative pt-[20px] pb-[20px]">
              <select
                defaultValue=""
                className="w-full pl-[30px] text-[#9CA3AF] px-4 py-4 bg-[white] text-xl rounded-[20px] border border-gray-300 appearance-none focus:outline-none"
              >
                <option value="" disabled>Disciplina</option>
              </select>
              <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-gray-700 pr-[20px]">
                <svg className="h-7 w-7 text-black" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 6" fill="currentColor"><polygon points="0,0 10,0 5,6" /></svg>
              </div>
            </div>
          </div>

          <div className=" bg-white border border-gray-300 rounded-[20px] overflow-hidden h-[35%]">
            <textarea
              className="w-full h-[100%] px-4 py-3 text-base resize-none focus:outline-none"
            />
          </div>

          {/* Botões alinhados à direita */}
          <div className="flex justify-end items-center gap-6 mt-auto pr-[50px] pb-[20px]">
            <button
              type="button"
              onClick={onClose}
              className="text-lg sm:text-4xl  text-[#050036] hover:underline pr-[40px]"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="py-2 px-[50px] text-lg sm:text-2xl text-white bg-[#050036] rounded-[10px] hover:bg-opacity-90 transition "
            >
              Avaliar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MenuModal;

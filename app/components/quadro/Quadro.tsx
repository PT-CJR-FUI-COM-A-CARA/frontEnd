import React, { ReactNode, MouseEventHandler } from 'react';
import { FC } from 'react';
import Image from 'next/image';

interface ProfProps {
  name: string;
  area: string;
  Fotopsrc: string;
}

const ProfQuadro: React.FC<ProfProps> = ({ name, area, Fotopsrc }) => {
    return (
        <div className="w-40 h-56 sm:w-40 sm:h-56 md:w-44 md:h-60 lg:w-48 lg:h-64 bg-white text-[#000000] px-4 py-3 rounded-xl hover:scale-105 transition-transform duration-200 cursor-pointer shadow-md">
            <img 
                src={Fotopsrc}
                alt={name}
                className="w-32 h-32 sm:w-32 sm:h-32 md:w-36 md:h-36 lg:w-40 lg:h-40 mx-auto mt-2 object-cover rounded-xl"
            />
            <p className="mt-3 text-center text-sm sm:text-base font-medium text-black">{name}</p>
            <p className="mt-1 text-center text-xs sm:text-sm text-gray-600">{area}</p>
        </div>
    );
}

export default ProfQuadro;
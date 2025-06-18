import React, { ReactNode, MouseEventHandler } from 'react';
import { FC } from 'react';
import Image from 'next/image';

interface ProfProps {
  name: string;
  area: string;
  Fotopsrc: string;
}

const  ProfQuadro: React.FC<ProfProps> = ({  name, area, Fotopsrc }) => {
    return (
        <div className= " w-100 h-100 bg-white text-[#000000] text-sm px-7 py-2 rounded-xl hover:scale-110 duration-200 cursor-pointer"
            >
            <Image 
            src = {Fotopsrc}
            alt = {name}
            width = {50}
            height = {75}
            className="mx-auto"
            />

            <p  className= "mt-2 font-semibold text-black">{name}</p>
            <p className = "mt-2 font-semibold text-gray" >{area}</p>
    
    

        </div>
    )
}

export default ProfQuadro;
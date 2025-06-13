import React, { ReactNode, MouseEventHandler } from 'react';

interface BotaoProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

const Botão: React.FC<BotaoProps> = ({children, onClick, type}) => {
  return (
    <button className="min-w-[120px] max-w-[160px] w-full bg-white text-[#050036] text-sm px-7 py-2 rounded-xl hover:scale-110 duration-200 cursor-pointer"
      onClick={onClick}
      type = {type || 'button'}
    >
      {children}
    </button>
  )
}

export default Botão
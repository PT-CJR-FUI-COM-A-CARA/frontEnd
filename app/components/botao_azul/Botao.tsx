import React, { ReactNode, MouseEventHandler } from 'react';

interface BotaoProps {
  children: ReactNode;
  onClick?: MouseEventHandler<HTMLButtonElement>;
  type?: 'button' | 'submit' | 'reset';
}

const Botão: React.FC<BotaoProps> = ({children, onClick, type}) => {
  return (
    <button className="bg-[#050036] text-white text-lg px-7 py-3 rounded-xl hover:scale-110 duration-200"
      onClick={onClick}
      type = {type || 'button'}
    >
      {children}
    </button>
  )
}

export default Botão
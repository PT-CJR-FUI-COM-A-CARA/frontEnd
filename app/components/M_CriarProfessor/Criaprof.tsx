  import React, { useRef, useState,} from 'react';
  import  Botao_Azul  from '../botao_azul/Botao_Azul';
  import { IoClose } from 'react-icons/io5'; 
  import { FaCamera } from 'react-icons/fa';



  interface ModalProfProps {
  isOpen: boolean; //verifica se o modal deveria estar aberto
  onClose: () => void;  // fecha o modal
  
}


  export const Criaprof = ( {onClose,isOpen }: ModalProfProps) => {

     if(!isOpen) return null;
    return(
        <div className='fixed inset-0 bg-black/50 z-50 flex items-center justify-center'>
            <div className='bg-[#EDEDED] w-90 h-125 rounded-lg p-4 flex flex-col  justify-center gap-y-4'>
                <div className='flex flex-col items-center justify-center relative'>
                     <div className='relative w-full'>
                    <button
                        className='absolute top-2 right-2 text-2xl text-black  cursor-pointer hover:scale-110 transform transition-transformation duration-200'
                        onClick={onClose}>
                            <IoClose />
                        </button>
                </div>
                    <img
                         src="/profileSemFoto/profileSemFoto.jpg"
                         alt="Foto do professor"
                         className=" 
                           w-36 h-36 rounded-full object-cover margin-top border-4 border-white shadow-lg"
                            />
                    <button className='bg-white rounded-full border-4 border-white shadow-sm transform -translate-y-2 hover:scale-110 transition cursor-pointer'
                            onClick={() => alert('Função de upload de foto ainda não implementada')}>
                        <FaCamera className='text-black w-6 h-6' />
                    
                    </button>
                </div>
                <div className='flex flex-col itens-center justify-center gap-y-3'>
                    <textarea className=' resize-none w-[100%] h-[15%] bg-white rounded-2xl p-2 text-black placeholder-gray-500 placeholder: text-xs ' placeholder='Nome'></textarea>
                    <textarea className=' resize-none w-[100%] h-[15%] bg-white rounded-2xl p-2 text-black placeholder-gray-500 placeholder: text-xs ' placeholder='Email'></textarea>
                    <textarea className=' resize-none w-[100%] h-[15%] bg-white rounded-2xl p-2 text-black placeholder-gray-500 placeholder: text-xs ' placeholder='Departamento'></textarea>
                    <textarea className=' resize-none w-[100%] h-[15%] bg-white rounded-2xl p-2 text-black placeholder-gray-500 placeholder: text-xs' placeholder='Aulas'></textarea>
                </div>
                <div className='flex items-certer justify-center'>
                    <Botao_Azul type="submit" > Criar </Botao_Azul>
                </div>
                
            </div>
        </div>


    )
    






  }
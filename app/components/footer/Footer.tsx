import React from 'react';
import { FaInstagram } from 'react-icons/fa'
import { FaLinkedin } from 'react-icons/fa'
import { useRouter } from 'next/navigation';


export const Footer: React.FC = () =>{

    const router = useRouter();

    return(
        <footer className='bg-[#050036] text-white py-0 mt-10'>
            <div className='flex items-center justify-between max-w-6xl mx-auto'>
                <button
                            aria-label="Home"
                            className="p-1 rounded-full  cursor-pointer"
                            onClick={() => router.push('/')}
                        >
                            <img src="/logo/Logomarca 3.svg" alt="Logo" className="h-16" />
                        </button>


            
            <div className=' container mx-auto flex flex-col items-center text-center py-4 text-white'>
               <div className='flex space-x-8 mb-2'>
                     <a href="https://www.instagram.com/fui_com_a_cara/" target="_blank" rel="noopener noreferrer">
                        <p className ='text-lg  hover:scale-110 transform transition-transformation duration-200'>Contato</p>
                     </a>
                     <a href="/sobre" target="_blank" rel="noopener noreferrer">
                     <p className='text-lg  hover:scale-110 transform transition-transformation duration-200'>Sobre</p>
                     </a>        
               </div>
               <p className="text-sm">
                         @2025 Fui com a cara todos os direitos reservados
                </p>
            </div>

    

            <div className="h-10 w-10" />
            <div className='flex space-x-4'>
                <a href="https://www.instagram.com/cjr.unb/" target="_blank" rel="noopener noreferrer">
                    <FaInstagram size={30} className='text-white hover:scale-110 transform transition-transformation duration-200' />
                </a>
                <a href="https://www.linkedin.com/company/cjr-unb/posts/?feedView=all" target="_blank" rel="noopener noreferrer">
                    <FaLinkedin size={30} className='text-white hover:scale-110 transform transition-transformation duration-200' />
                </a>
            </div>
            </div>
        </footer>

    )

}
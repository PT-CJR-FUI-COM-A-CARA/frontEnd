import React from 'react';
import Botao_Azul from '../botao_azul/Botao_Azul';
import { BsTrash } from 'react-icons/bs';


interface ModalProps {
  isOpen: boolean; //verifica se o modal deveria estar aberto
  onClose: () => void;  // fecha o modal
  
}



export const MeditComent2 = ({ onClose,isOpen }: ModalProps) =>{
   

    

    if(!isOpen) return null;


    return(
     <div  className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
        <div className='bg-[#ECEDBC] w-[45%] h-[45%]  rounded-2xl p-6 flex flex-col'>
           
            <div className='bg-[#FFFFFF] w-[90%] h-[80%] self-center rounded-2xl flex flex-col  '>
              <textarea
              
                className='w-full h-full p-4
                resize-none
                rounded-2x-l
                focus:outline-none
                '

                placeholder='Digite seu comentario'
                
              
              > 
              </textarea>
            

            </div>


            <div className='flex justify-between items-center mt-4'>


                 <div >
                                      <button
                                        type='button'
                                      >
                                          
                                        <BsTrash className='w-7 h-7 text-black hover:scale-110 duration-200 cursor-pointer'>   </BsTrash>
                
                
                                      </button>
                
                
                              </div>


                 <div className="flex space-x-4 ">
                     <Botao_Azul  onClick={onClose}  type = "button"  > Cancelar </Botao_Azul>
                     <Botao_Azul  onClick={onClose}  type = "submit"  > Editar </Botao_Azul>
         

                  </div>



            </div >
            
            


        </div>
     </div>

    )


}
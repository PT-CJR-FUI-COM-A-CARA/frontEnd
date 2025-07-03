import react from 'react';
import { FaCommentAlt } from 'react-icons/fa';


export const NotificacaoBalaoC = () => {

    return(

        <div className=' flex items-start p-4 w-[full] h-[10%] bg-[#FFFFFF] cursor-pointer hover:bg-[#ECEDBC] border border-gray '>
            <div className="text-gray-700 mt-1">
                <FaCommentAlt size={20} />
            </div>

            <div className='flex-1'> 
                <div className='ml-2 text-black font-semibold'>
                <p>Alguem fez um novo comentario na sua avaliação!</p>
                </div>
            </div>





        </div>



    )






}
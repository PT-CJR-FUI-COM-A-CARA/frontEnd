import React, { useRef, useState,} from 'react';
import { FaBold } from 'react-icons/fa';
import { FaItalic } from 'react-icons/fa'

interface ModalProps {
  isOpen: boolean; //verifica se o modal deveria estar aberto
  onClose: () => void;  // fecha o modal
  
}



export const Mcomentario = ({ onClose,isOpen }: ModalProps) =>{
   
     const editorRef = useRef<HTMLDivElement>(null);
     const [italicoAtivo, setItalicoAtivo] = useState(false);
     const [negritoAtivo, setNegritoAtivo] = useState(false);

     const TransItalico = () => {
    const selection = window.getSelection();
    editorRef.current?.focus();

    if (selection && selection.rangeCount === 0) {
    const range = document.createRange();
    range.selectNodeContents(editorRef.current!);
    range.collapse(false);
    selection.addRange(range);
  }

  // Ativa modo itálico
  document.execCommand('italic');

  setItalicoAtivo(!italicoAtivo);
    }; //botao de italico

    const TransNegrito = () =>{
        const selection = window.getSelection();
        editorRef.current?.focus();

        if (selection && selection.rangeCount === 0) {
    const range = document.createRange();
    range.selectNodeContents(editorRef.current!);
    range.collapse(false);
    selection.addRange(range);
  }

   document.execCommand('bold');

   setNegritoAtivo(!negritoAtivo);
    };//botao de negrito


    const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const conteudo = editorRef.current?.innerHTML || '';
    console.log('Conteúdo enviado:', conteudo);
    onClose();
    //conteudo enviado para o banco de dados
  };

    

    if(!isOpen) return null;


    return(
     <form onSubmit={handleSubmit} className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
        <div className='bg-[#ECEDBC] w-[45%] h-[45%]  rounded-2xl p-6 flex flex-col'>
           
            <div className='bg-[#FFFFFF] w-[90%] h-[80%] self-center rounded-2xl flex flex-col  '>
                 <div className='flex gap-4 mb-4'>
                    <button
                     type="button"
                    onClick={TransItalico}
                    className={`px-4 py-2 rounded text-white w-fit cursor-pointer`}
                    >
                        <FaItalic 
                        
                          className= {`w-5 h-5 ${italicoAtivo? ' bg-[#050036]' : 'text-[#050036]'}`}/>
                    </button>
                    
                         
                    <button
                     type="button"
                    onClick={TransNegrito}
                    className={`px-4 py-2 w-4 h-4 rounded text-white w-fit cursor-pointer`}
                    >
                        <FaBold  className= {`w-5 h-5 ${negritoAtivo? ' bg-[#050036]' : 'text-[#050036]'}`}/>
                    </button>

                    </div>

                    
                 
                 <div
                    ref={editorRef}
                     contentEditable={true}
                     className="w-[100%] h-[70%] border rounded-2xl p-3 focus:outline-none"
                      style={{
                     whiteSpace: 'pre-wrap',
                     }}
                ></div>
            </div>
             <div className="flex justify-end space-x-4 mt-4">
            <button    type="button"  onClick={onClose} className=' bg-[#050036] w-[15%] h-[80%]  mt-4 text-sm text-white rounded-xl cursor-pointer hover:scale-110 duration-200'>    
                Cancelar    
            </button>
            <button className=' bg-[#050036] w-[15%] h-[80%]  mt-4 text-sm text-white rounded-xl cursor-pointer hover:scale-110 duration-200'>     

                Comentar
            </button>

               



             </div>
            


        </div>
     </form>

    )


}
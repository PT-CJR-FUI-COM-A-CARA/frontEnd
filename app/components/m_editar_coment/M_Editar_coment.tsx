import React, { useRef, useState, useEffect } from 'react';
import { FaBold, FaItalic } from 'react-icons/fa';
import { BsTrash } from 'react-icons/bs';
import { updateComentario, deleteComentario } from '@/app/utils/api';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  comentarioId: number;      // ID do comentário
  initialContent: string;    // Conteúdo atual do comentário
}

export const MeditComent = ({ onClose, isOpen, comentarioId, initialContent }: ModalProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [italicoAtivo, setItalicoAtivo] = useState(false);
  const [negritoAtivo, setNegritoAtivo] = useState(false);

  // Preenche conteúdo inicial quando abrir
  useEffect(() => {
    if (editorRef.current && isOpen) {
      editorRef.current.innerHTML = initialContent;
    }
  }, [initialContent, isOpen]);

  const TransItalico = () => {
    editorRef.current?.focus();
    document.execCommand('italic');
    setItalicoAtivo(!italicoAtivo);
  };

  const TransNegrito = () => {
    editorRef.current?.focus();
    document.execCommand('bold');
    setNegritoAtivo(!negritoAtivo);
  };

  const handleUpdate = async (event: React.FormEvent) => {
    event.preventDefault();
    const conteudo = editorRef.current?.innerHTML || '';
    try {
      await updateComentario(comentarioId, conteudo);
      console.log("Comentário atualizado com sucesso!");
      onClose();
      // Aqui você pode atualizar lista de comentários no frontend
    } catch (error) {
      console.error("Erro ao atualizar comentário:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteComentario(comentarioId);
      console.log("Comentário excluído com sucesso!");
      onClose();
      // Aqui você pode remover comentário da lista no frontend
    } catch (error) {
      console.error("Erro ao excluir comentário:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleUpdate} className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
      <div className='bg-[#ECEDBC] w-[45%] h-[45%] rounded-2xl p-6 flex flex-col'>
        <div className='bg-[#FFFFFF] w-[90%] h-[80%] self-center rounded-2xl flex flex-col'>
          <div className='flex gap-4 mb-4'>
            <button type="button" onClick={TransItalico} className="px-4 py-2 rounded text-white w-fit cursor-pointer">
              <FaItalic className={`w-5 h-5 ${italicoAtivo ? 'bg-[#050036]' : 'text-[#050036]'}`} />
            </button>
            <button type="button" onClick={TransNegrito} className="px-4 py-2 rounded text-white w-fit cursor-pointer">
              <FaBold className={`w-5 h-5 ${negritoAtivo ? 'bg-[#050036]' : 'text-[#050036]'}`} />
            </button>
          </div>

          <div
            ref={editorRef}
            contentEditable={true}
            className="w-full h-[70%] border rounded-2xl p-3 focus:outline-none"
            style={{ whiteSpace: 'pre-wrap' }}
          ></div>
        </div>

        <div className="flex justify-between items-center mt-4">
          <button type="button" onClick={handleDelete}>
            <BsTrash className='w-7 h-7 text-black hover:scale-110 duration-200 cursor-pointer' />
          </button>

          <div className='flex space-x-4'>
            <button type="button" onClick={onClose} className='px-6 py-2 text-sm text-black rounded-xl cursor-pointer hover:scale-110 duration-200'>
              Cancelar
            </button>
            <button type="submit" className='bg-[#050036] px-6 py-2 text-sm text-white rounded-xl cursor-pointer hover:scale-110 duration-200'>
              Editar
            </button>
          </div>
        </div>
      </div>
    </form>
  );
};

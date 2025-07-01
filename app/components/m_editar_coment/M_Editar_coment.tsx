import React, { useRef, useState, useEffect } from 'react';
import { FaBold, FaItalic } from 'react-icons/fa';
import { updateAvaliacao, deleteAvaliacao } from '@/app/utils/api';
import { BsTrash } from 'react-icons/bs';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  avaliacaoId: number;
  initialContent: string;
  onUpdated: () => void; // Para atualizar a lista após edição
  onDeleted: () => void; // Para atualizar lista após exclusão
}

const MeditAvaliacao = ({
  isOpen,
  onClose,
  avaliacaoId,
  initialContent,
  onUpdated,
  onDeleted
}: ModalProps) => {
  const editorRef = useRef<HTMLDivElement>(null);
  const [italicoAtivo, setItalicoAtivo] = useState(false);
  const [negritoAtivo, setNegritoAtivo] = useState(false);

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

  const handleUpdate = async (e: React.FormEvent) => {
    e.preventDefault();
    const conteudo = editorRef.current?.innerHTML || '';
    try {
      await updateAvaliacao(avaliacaoId, conteudo);
      console.log("Avaliação atualizada com sucesso!");
      onUpdated(); // Atualiza lista no frontend
      onClose();
    } catch (error) {
      console.error("Erro ao atualizar avaliação:", error);
    }
  };

  const handleDelete = async () => {
    try {
      await deleteAvaliacao(avaliacaoId);
      console.log("Avaliação excluída com sucesso!");
      onDeleted();
      onClose();
    } catch (error) {
      console.error("Erro ao excluir avaliação:", error);
    }
  };

  if (!isOpen) return null;

  return (
    <form onSubmit={handleUpdate} className='fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center'>
      <div className='bg-[#ECEDBC] w-[45%] h-[45%] rounded-2xl p-6 flex flex-col'>
        <div className='bg-[#FFFFFF] w-[90%] h-[80%] self-center rounded-2xl flex flex-col'>
          <div className='flex gap-4 mb-4'>
            <button type="button" onClick={TransItalico}>
              <FaItalic className={`w-5 h-5 ${italicoAtivo ? 'bg-[#050036]' : 'text-[#050036]'}`} />
            </button>
            <button type="button" onClick={TransNegrito}>
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

export default MeditAvaliacao;

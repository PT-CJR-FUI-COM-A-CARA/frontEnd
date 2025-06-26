import React from 'react';
import { FaRegComment, FaTrash, FaEdit } from 'react-icons/fa'; // Adicionado FaEdit

interface PostCardProps {
  userName: string;
  userImage: string;
  postDate: string;
  nomeProfessor: string;
  materia: string;
  postContent: string;
  commentCount: number;
  onEdit?: () => void;     // Callback para edição
  onDelete?: () => void;   // Callback para exclusão
}

const PostCard: React.FC<PostCardProps> = ({
  userName,
  userImage,
  postDate,
  nomeProfessor,
  materia,
  postContent,
  commentCount,
  onEdit,
  onDelete,
}) => {
  return (
    <div className="bg-yellow-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <img src={userImage} alt={userName} className="w-12 h-12 rounded-full object-cover" />
        <div className="flex flex-col">
          <p className="font-bold text-[#050036] text-base">
            {userName}{' '}
            <span className="font-normal text-sm text-gray-600">
              · {postDate} · {nomeProfessor} · {materia}
            </span>
          </p>
        </div>
      </div>

      {/* Conteúdo */}
      <p className="text-[#050036] text-base leading-relaxed">
        {postContent}
      </p>

      {/* Rodapé */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2 text-gray-700">
          <FaRegComment className="text-xl hover:text-blue-600 transition" />
          <span className="text-sm">{commentCount} comentários</span>
        </div>

        {/* Ações: Editar e Deletar */}
        <div className="flex gap-4 text-gray-600">
          <button onClick={onEdit} title="Editar">
            <FaEdit className="text-lg hover:text-blue-600 transition" />
          </button>
          <button onClick={onDelete} title="Excluir">
            <FaTrash className="text-lg hover:text-red-600 transition" />
          </button>
        </div>
      </div>
    </div>
  );
};

export default PostCard;

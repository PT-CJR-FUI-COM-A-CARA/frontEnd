import React, { useState, useEffect } from 'react';
import { FaRegComment, FaTrash, FaEdit } from 'react-icons/fa';
import { deleteAvaliacao, updateAvaliacao } from '@/app/utils/api';
import { jwtDecode } from 'jwt-decode';

interface PostCardProps {
  id: number;
  userId: number; // ID do autor da avaliação
  userName: string;
  userImage: string;
  postDate: string;
  nomeProfessor: string;
  materia: string;
  postContent: string;
  commentCount: number;
}

const PostCard: React.FC<PostCardProps> = ({
  id,
  userId,
  userName,
  userImage,
  postDate,
  nomeProfessor,
  materia,
  postContent,
  commentCount,
}) => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);

  useEffect(() => {
    const token = localStorage.getItem("token");

    if (token) {
      try {
        const decoded: { sub?: string } = jwtDecode(token);
        if (decoded.sub) {
          const id = Number(decoded.sub);
          setCurrentUserId(id);
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    }
  }, []);

  // Verificação: se currentUserId for igual ao userId do post, permite editar/deletar
  const canEditOrDelete = currentUserId === userId;

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
      <p
        className="text-[#050036] text-base leading-relaxed"
        dangerouslySetInnerHTML={{ __html: postContent }}
      />

      {/* Rodapé */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2 text-gray-700">
          <FaRegComment className="text-xl hover:text-blue-600 transition" />
          <span className="text-sm">{commentCount} comentários</span>
        </div>

        {/* Ações: só se for o dono */}
        {canEditOrDelete && (
          <div className="flex gap-4 text-gray-600">
            <button onClick={() => updateAvaliacao(id, "Novo conteúdo")} title="Editar">
              <FaEdit className="text-lg hover:text-blue-600 transition" />
            </button>
            <button onClick={() => deleteAvaliacao(id)} title="Excluir">
              <FaTrash className="text-lg hover:text-red-600 transition" />
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default PostCard;

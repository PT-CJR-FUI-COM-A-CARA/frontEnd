import React from 'react';
import { FaRegComment, FaTrash } from 'react-icons/fa'; // Importando ícones de lixeira e comentário

interface PostCardProps {
  userName: string;
  userImage: string; // URL da imagem do usuário
  postDate: string; // Data e hora da publicação
  nomeProfessor: string; // Categoria da publicação (e.g., "João Frango", "Rick")
  materia: string; // Tipo da publicação (e.g., "Surf", "Viagem Interdimensional")
  postContent: string;
  commentCount: number;
}

const PostCard: React.FC<PostCardProps> = ({
  userName,
  userImage,
  postDate,
  nomeProfessor,
  materia,
  postContent,
  commentCount,
}) => {
  return (
    <div className="bg-yellow-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      {/* Informações do cabeçalho do post */}
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

      {/* Conteúdo do post */}
      <p className="text-[#050036] text-base leading-relaxed">
        {postContent}
      </p>

      {/* Rodapé do post: comentários e ícone de lixeira(que eu ainda não fiz) */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2 text-gray-700">
          <FaRegComment className="text-xl" />
          <span className="text-sm">{commentCount} comentários</span>
        </div>
      </div>
    </div>
  );
};

export default PostCard;
"use client";
import React, { useEffect, useState } from "react";
import { FaRegComment, FaTrash, FaEdit } from "react-icons/fa";
import { deleteAvaliacao, updateAvaliacao, getComentariosCount } from "@/app/utils/api";
import { jwtDecode } from "jwt-decode";
import Mcomentario from "@/app/components/m_comentario/M_Comentario";

interface PostCardProps {
  id: number;
  userId: number;
  userName: string;
  userImage: string;
  postDate: string;
  nomeProfessor: string;
  materia: string;
  postContent: string;
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
}) => {
  const [currentUserId, setCurrentUserId] = useState<number | null>(null);
  const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
  const [comentariosCount, setComentariosCount] = useState<number | null>(null);

  // Decodifica token para pegar userId atual
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      try {
        const decoded: { sub?: string } = jwtDecode(token);
        if (decoded.sub) {
          setCurrentUserId(Number(decoded.sub));
        }
      } catch (error) {
        console.error("Erro ao decodificar token:", error);
      }
    }
  }, []);

  // Busca a quantidade de comentários para essa avaliação
  useEffect(() => {
    async function fetchCount() {
      try {
        const count = await getComentariosCount(id);
        setComentariosCount(count);
      } catch (error) {
        console.error("Erro ao buscar quantidade de comentários:", error);
        setComentariosCount(0);
      }
    }
    fetchCount();
  }, [id]);

  const canEditOrDelete = currentUserId === userId;

  return (
    <div className="bg-yellow-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <img
          src={userImage}
          alt={userName}
          className="w-12 h-12 rounded-full object-cover"
        />
        <div className="flex flex-col">
          <p className="font-bold text-[#050036] text-base">
            {userName}{" "}
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
          <button onClick={() => setIsCommentModalOpen(true)}>
            <FaRegComment className="text-xl hover:text-blue-600 transition" />
          </button>
          <span className="text-sm">
            {comentariosCount !== null ? comentariosCount : "Carregando..."} comentários
          </span>
        </div>

        {canEditOrDelete && (
          <div className="flex gap-4 text-gray-600">
            <button
              onClick={() => updateAvaliacao(id, "Novo conteúdo")}
              title="Editar"
            >
              <FaEdit className="text-lg hover:text-blue-600 transition" />
            </button>
            <button onClick={() => deleteAvaliacao(id)} title="Excluir">
              <FaTrash className="text-lg hover:text-red-600 transition" />
            </button>
          </div>
        )}
      </div>

      {/* Modal de comentário */}
      <Mcomentario
        isOpen={isCommentModalOpen}
        onCloseAction={() => {
          setIsCommentModalOpen(false);
          // Atualiza a quantidade de comentários ao fechar o modal
          (async () => {
            try {
              const count = await getComentariosCount(id);
              setComentariosCount(count);
            } catch (error) {
              console.error("Erro ao atualizar quantidade de comentários:", error);
            }
          })();
        }}
        avaliacaoId={id}
      />
    </div>
  );
};

export default PostCard;

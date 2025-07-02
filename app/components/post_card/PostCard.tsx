"use client";
import React, { useState, useEffect } from "react";
import Link from "next/link";
import { FaRegComment, FaTrash, FaEdit } from "react-icons/fa";
import {
  deleteAvaliacao,
  getComentariosCount,
} from "@/app/utils/api";
import { jwtDecode } from "jwt-decode";
import Mcomentario from "../m_comentario/M_Comentario";
import MeditAvaliacao from "@/app/m_editar_avaliacao/M_Editar_Avaliacao"; 

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
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [comentariosCount, setComentariosCount] = useState<number | null>(null);
  const [conteudoEdit, setConteudoEdit] = useState(postContent);

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

  const handleCloseEditModal = () => {
    setIsEditModalOpen(false);
    // Atualizar conteúdo local após edição, se necessário
    setConteudoEdit(conteudoEdit); // ou refazer fetch se quiser garantir 100%
  };

  return (
    <div className="bg-yellow-100 rounded-2xl p-5 shadow-sm flex flex-col gap-3">
      {/* Cabeçalho */}
      <div className="flex items-center gap-3">
        <Link href={{ pathname: "/perfilDeUsuario", query: { id: userId } }}>
          <img
            src={userImage}
            alt={userName}
            className="w-12 h-12 rounded-full object-cover cursor-pointer"
          />
        </Link>
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
        dangerouslySetInnerHTML={{ __html: conteudoEdit }}
      />

      {/* Rodapé */}
      <div className="flex justify-between items-center mt-2">
        <div className="flex items-center gap-2 text-gray-700">
          <button onClick={() => setIsCommentModalOpen(true)}>
            <FaRegComment className="text-xl hover:text-blue-600 transition" />
          </button>
          <Link href={{ pathname: '/Avaliacao', query: { id } }} className="text-sm hover:underline cursor-pointer">
              Ver {comentariosCount !== null ? comentariosCount : "..."} comentários
          </Link>
        </div>

        {canEditOrDelete && (
          <div className="flex gap-4 text-gray-600">
            <button
              onClick={() => setIsEditModalOpen(true)}
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
          async function atualizarCount() {
            try {
              const count = await getComentariosCount(id);
              setComentariosCount(count);
            } catch (error) {
              console.error("Erro ao atualizar quantidade de comentários:", error);
            }
          }
          atualizarCount();
        }}
        avaliacaoId={id}
      />

      {/* Modal de edição */}
      <MeditAvaliacao
        isOpen={isEditModalOpen}
        onCloseAction={handleCloseEditModal}
        avaliacaoId={id}          
        avaliacaoAtual={conteudoEdit} 
      />
    </div>
  );
};

export default PostCard;

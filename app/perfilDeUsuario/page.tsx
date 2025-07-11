"use client";
import React, { useEffect, useState, useCallback } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "../components/navbar/NavBar";
import PostCard from "../components/post_card/PostCard";
import { getOneUser, getAvaliacoesByUser, getOneProf } from "../utils/api";
import { FaArrowLeft } from "react-icons/fa";
import ModalEditarPerfil from "../components/m_editar_perfil/M_Editar_Perfil";

const PerfilDeUsuario = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [usuario, setUsuario] = useState<any>(null);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const fetchData = useCallback(async () => {
    if (!userId) return;

    try {
      const [userData, avaliacoesData] = await Promise.all([
        getOneUser(Number(userId)),
        getAvaliacoesByUser(Number(userId)),
      ]);
      setUsuario(userData);

      const avaliacoesComProfessor = await Promise.all(
        avaliacoesData.map(async (avaliacao: any) => {
          try {
            const professor = await getOneProf(avaliacao.profId);
            return { ...avaliacao, nomeProfessor: professor.nome };
          } catch {
            return { ...avaliacao, nomeProfessor: "Não informado" };
          }
        })
      );

      avaliacoesComProfessor.sort(
        (a, b) =>
          new Date(b.data).getTime() - new Date(a.data).getTime()
      );

      setAvaliacoes(avaliacoesComProfessor);
    } catch (error) {
      console.error("Erro ao carregar dados do perfil:", error);
    } finally {
      setLoading(false);
    }
  }, [userId]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  if (loading) {
    return (
      <>
        <NavBar />
        <div className="text-center py-10">Carregando perfil...</div>
      </>
    );
  }

  return (
    <>
      <NavBar />
      <div className="flex bg-[#EDEDED] min-h-[calc(100vh-60px)] pt-10 pb-10 px-4">
        <div className="w-full max-w-2xl mx-auto relative">
          {/* Botão de voltar */}
          <button
            onClick={() => router.back()}
            className="absolute top-8 left-0 md:left-[-60px] w-10 h-10 md:w-12 md:h-12 rounded-full bg-white border flex items-center justify-center shadow-md hover:bg-gray-200 transition"
            title="Voltar"
          >
            <FaArrowLeft className="text-gray-700 text-lg md:text-xl" />
          </button>

          <div className="relative">
            {/* Fundo amarelo */}
            <div className="bg-yellow-100 h-32 rounded-t-lg"></div>

            {/* Card branco com conteúdo */}
            <div className="bg-white rounded-b-lg shadow-md px-4 sm:px-6 pb-6 pt-1 -mt-8 relative z-10">
              {/* Foto e botões */}
              <div className="flex flex-col md:flex-row items-center justify-between gap-4">
                <img
                  src={usuario?.fotosrc ?? "/profileSemFoto/profileSemFoto.jpg"}
                  alt="Foto do usuário"
                  className="w-28 h-28 md:w-32 md:h-32 rounded-full object-cover border-4 border-white shadow-lg -mt-16"
                />
                <div className="flex flex-col items-center md:items-end gap-2 mt-2 md:mt-4">
                  <button 
                    onClick={() => setIsModalOpen(true)}
                    className="bg-[#050036] text-white text-sm px-5 py-2 rounded-full hover:scale-105 transition"
                  >
                    Editar Perfil
                  </button>
                  {/* <button className="bg-red-500 text-white text-sm px-5 py-2 rounded-full hover:scale-105 transition">
                    Excluir Perfil
                  </button> */}
                </div>
              </div>

              {/* Dados do usuário */}
              <div className="pt-4 text-center md:text-left">
                <h2 className="text-2xl font-semibold text-[#222E50] mb-2">
                  {usuario?.nome ?? "Nome não informado"}
                </h2>
                <p className="text-[#222E50] mb-1 text-sm">
                  {usuario?.curso ?? "Curso não informado"}
                </p>
                <p className="text-[#222E50] mb-1 text-sm">
                  {usuario?.departamento ?? "Departamento não informado"}
                </p>

                <hr className="my-6 border-[#595652]" />

                {/* Avaliações */}
                <div className="pb-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Avaliações
                  </h3>

                  {avaliacoes.length === 0 ? (
                    <p className="text-sm text-gray-600">
                      Nenhuma avaliação ainda.
                    </p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {avaliacoes.map((avaliacao) => (
                        <PostCard
                          key={avaliacao.id}
                          id={avaliacao.id}
                          userId={avaliacao.userId}
                          userName={usuario?.nome ?? "Usuário"}
                          userImage={
                            usuario?.fotosrc ??
                            "/profileSemFoto/profileSemFoto.jpg"
                          }
                          postDate={new Date(
                            avaliacao.data
                          ).toLocaleString("pt-BR")}
                          nomeProfessor={avaliacao.nomeProfessor}
                          materia={
                            avaliacao.materia ?? "Matéria não informada"
                          }
                          postContent={avaliacao.avaliacao}
                          onAction={fetchData}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {isModalOpen && (
        <ModalEditarPerfil 
          usuario={usuario} 
          onClose={() => setIsModalOpen(false)}
          onSave={() => {
            fetchData(); // Recarrega os dados do perfil após salvar
          }}
        />
      )}
    </>
  );
};

export default PerfilDeUsuario;

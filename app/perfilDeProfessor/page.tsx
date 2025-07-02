"use client";
import React, { useEffect, useState, useCallback } from "react";
import NavBar from "../components/navbar/NavBar";
import { FaBuilding, FaBook, FaArrowLeft } from "react-icons/fa";
import { useRouter, useSearchParams } from "next/navigation";
import { getOneProf, getAvaliacoesByProf, getOneUser } from "../utils/api";
import PostCard from "../components/post_card/PostCard";

const PerfilDeProfessor = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const profId = searchParams.get("id");
  
  const [professor, setProfessor] = useState<any>(null);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Função centralizada para buscar todos os dados
  const fetchData = useCallback(async () => {
    if (!profId) return;

    try {
      const [profData, avaliacoesData] = await Promise.all([
        getOneProf(Number(profId)),
        getAvaliacoesByProf(Number(profId)),
      ]);
      setProfessor(profData);

      // Para cada avaliação, busca os dados do usuário
      const avaliacoesComUsuario = await Promise.all(
        avaliacoesData.map(async (avaliacao: any) => {
          try {
            const usuario = await getOneUser(avaliacao.userId);
            return {
              ...avaliacao,
              nomeUsuario: usuario.nome,
              fotoUsuario: usuario.fotosrc,
            };
          } catch (error) {
            console.error("Erro ao buscar usuário da avaliação", error);
            return {
              ...avaliacao,
              nomeUsuario: "Usuário",
              fotoUsuario: "/profileSemFoto/profileSemFoto.jpg",
            };
          }
        })
      );
      
      // Ordena as avaliações da mais recente para a mais antiga
      avaliacoesComUsuario.sort((a, b) => new Date(b.data).getTime() - new Date(a.data).getTime());

      setAvaliacoes(avaliacoesComUsuario);
    } catch (error) {
      console.error("Erro ao carregar dados do professor:", error);
    } finally {
      setLoading(false);
    }
  }, [profId]);

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

      <div className="flex bg-[#EDEDED] min-h-[calc(100vh-60px)] pt-10 pb-10">
        <div className="w-fulld max-w-2xl mx-auto relative">
          <button
            onClick={() => router.back()}
            className="absolute top-8 left-[-60px] md:left-[-80px] w-12 h-12 rounded-full bg-white border flex items-center justify-center shadow-md hover:bg-gray-200 transition"
            title="Voltar"
          >
            <FaArrowLeft className="text-gray-700 text-xl" />
          </button>

          <div className="relative">
            <div className="bg-yellow-100 h-32 rounded-t-lg"></div>

            <div className="bg-white rounded-b-lg shadow-md px-6 py-6 relative">
              <img
                src={professor?.fotosrc ?? "/profileSemFoto/profileSemFoto.jpg"}
                alt="Foto do professor"
                className="absolute top-0 left-6 transform -translate-y-1/2 w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <div className="pl-2 pt-14">
                <h2 className="text-2xl font-semibold text-[#222E50] mb-2">
                  {professor?.nome ?? "Nome não informado"}
                </h2>

                <p className="text-[#222E50] mb-1 flex items-center text-[14px]">
                  <FaBuilding className="mr-2 text-lg" />
                  {professor?.departamento ?? "Departamento não informado"}
                </p>

                <p className="text-[#222E50] flex items-center text-[14px]">
                  <FaBook className="mr-2 text-lg" />
                  {professor?.materias?.length
                    ? professor.materias.map((m: { nome: string }) => m.nome).join(", ")
                    : "Matérias não informadas"}
                </p>

                <hr className="my-6 border-[#595652]" />

                <div className="pb-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Avaliações
                  </h3>

                  {avaliacoes.length === 0 ? (
                    <p className="text-sm text-gray-600">Nenhuma avaliação ainda.</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {avaliacoes
                        .filter((avaliacao) => typeof avaliacao.id === "number" && !isNaN(avaliacao.id))
                        .map((avaliacao) => (
                          <PostCard
                            key={avaliacao.id}
                            id={avaliacao.id}
                            userId={avaliacao.userId}
                            userName={avaliacao.nomeUsuario ?? "Usuário"}
                            userImage={avaliacao.fotoUsuario ?? "/profileSemFoto/profileSemFoto.jpg"}
                            postDate={new Date(avaliacao.data).toLocaleString("pt-BR")}
                            nomeProfessor={professor?.nome}
                            materia={avaliacao.materia ?? "Matéria não informada"}
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
    </>
  );
};

export default PerfilDeProfessor;
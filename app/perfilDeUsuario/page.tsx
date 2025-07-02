"use client";
import React, { useEffect, useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import NavBar from "../components/navbar/NavBar";
import PostCard from "../components/post_card/PostCard";
import { getOneUser, getAvaliacoesByUser, getOneProf } from "../utils/api";
import { FaArrowLeft } from "react-icons/fa";

const PerfilDeUsuario = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const userId = searchParams.get("id");

  const [usuario, setUsuario] = useState<any>(null);
  const [avaliacoes, setAvaliacoes] = useState<any[]>([]);

  useEffect(() => {
    const fetchUsuario = async () => {
      if (userId) {
        try {
          const user = await getOneUser(Number(userId));
          setUsuario(user);
        } catch (error) {
          console.error("Erro ao carregar usuário:", error);
        }
      }
    };
    fetchUsuario();
  }, [userId]);

  useEffect(() => {
    const fetchAvaliacoesEProfessores = async () => {
      if (userId) {
        try {
          const response = await getAvaliacoesByUser(Number(userId));

          const avaliacoesComProfessor = await Promise.all(
            response.map(async (avaliacao: any) => {
              try {
                const professor = await getOneProf(avaliacao.profId);
                return {
                  ...avaliacao,
                  nomeProfessor: professor.nome,
                };
              } catch (error) {
                console.error("Erro ao buscar professor da avaliação:", error);
                return {
                  ...avaliacao,
                  nomeProfessor: "Professor não informado",
                };
              }
            })
          );

          setAvaliacoes(avaliacoesComProfessor);
        } catch (error) {
          console.error("Erro ao buscar avaliações:", error);
        }
      }
    };
    fetchAvaliacoesEProfessores();
  }, [userId]);

  return (
    <>
      <NavBar />

      <div className="flex bg-[#EDEDED] min-h-[calc(100vh-60px)] pt-10 pb-10">
        <div className="w-full max-w-2xl mx-auto relative">
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
                src={usuario?.fotosrc ?? "/profileSemFoto/profileSemFoto.jpg"}
                alt="Foto do usuário"
                className="absolute top-0 left-6 transform -translate-y-1/2 w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
              />

              <div className="pl-2 pt-14">
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

                <div className="pb-2">
                  <h3 className="text-lg font-semibold text-gray-800 mb-4">
                    Avaliações
                  </h3>

                  {avaliacoes.length === 0 ? (
                    <p className="text-sm text-gray-600">Nenhuma avaliação ainda.</p>
                  ) : (
                    <div className="flex flex-col gap-4">
                      {avaliacoes.map((avaliacao, index) => (
                        <PostCard
                          key={index}
                          id={avaliacao.id}
                          userId={avaliacao.userId}
                          userName={usuario?.nome ?? "Usuário"}
                          userImage={usuario?.fotosrc ?? "/profileSemFoto/profileSemFoto.jpg"}
                          postDate={new Date(avaliacao.data).toLocaleString("pt-BR")}
                          nomeProfessor={avaliacao.nomeProfessor}
                          materia={avaliacao.materia ?? "Matéria não informada"}
                          postContent={avaliacao.avaliacao}
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

export default PerfilDeUsuario;

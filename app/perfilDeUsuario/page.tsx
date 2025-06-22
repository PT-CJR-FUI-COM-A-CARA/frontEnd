"use client"
import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar'; 
import { FaBuilding, FaEnvelope, FaArrowLeft } from 'react-icons/fa'; 
import PostCard from '../components/post_card/PostCard';
import { useRouter } from 'next/navigation';
import { getOneUser, getAvaliacoesByUser } from '../utils/api';
import { jwtDecode } from 'jwt-decode';

const PerfilDeUsuario = () => {
    const router = useRouter();

    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userID, setUserID] = useState<number | null>(null);
    const [userData, setUserData] = useState<any>(null);
    const [avaliacoes, setAvaliacoes] = useState<any[]>([]);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsLoggedIn(true);
            try {
                const decoded: { sub?: string } = jwtDecode(token);
                if (decoded.sub) {
                    setUserID(Number(decoded.sub));
                }
            } catch (error) {
                console.error("Erro ao decodificar token:", error);
            }
        }
    }, []);

    useEffect(() => {
        const fetchUser = async () => {
            if (userID) {
                try {
                    const user = await getOneUser(userID);
                    setUserData(user);
                    console.log("Usuário carregado:", user);
                } catch (error) {
                    console.error("Erro ao buscar usuário:", error);
                }
            }
        };

        fetchUser();
    }, [userID]);

    useEffect(() => {
        const fetchAvaliacoes = async () => {
            if (userID) {
                try {
                    const avaliacoesDoUsuario = await getAvaliacoesByUser(userID);
                    setAvaliacoes(avaliacoesDoUsuario);
                } catch (error) {
                    console.error("Erro ao buscar avaliações:", error);
                }
            }
        };

        fetchAvaliacoes();
    }, [userID]);

    return (
        <>
            <NavBar /> 

            <div className="flex bg-[#EDEDED] min-h-[calc(100vh-60px)] pt-10 pb-10">
                <div className="w-full max-w-2xl mx-auto relative"> 
                    <button
                        onClick={() => router.back()}
                        className="absolute top-16 left-[-60px] w-12 h-12 rounded-full bg-white border border-gray-300 flex items-center justify-center shadow-md cursor-pointer"
                    >
                        <FaArrowLeft className="text-gray-700 text-xl" />
                    </button>

                    <div className="relative">
                        <div className="bg-yellow-100 h-32 rounded-t-lg"></div>

                        <div className="bg-white rounded-b-lg shadow-md px-6 py-6 relative">
                            <img
                                src={userData?.fotosrc ?? "/profileSemFoto/profileSemFoto.jpg"}
                                alt="Profile Avatar"
                                className="absolute top-0 left-6 transform -translate-y-1/2 
                                        w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
                            />

                            {isLoggedIn && (
                                <div className="absolute top-6 right-6 flex space-x-2">
                                    <button className="bg-[#222E50] text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-[#1A253E] transition-colors duration-200">
                                        Editar Perfil
                                    </button>
                                    <button className="bg-red-500 text-white px-4 py-2 rounded-md text-sm font-medium shadow-sm hover:bg-red-600 transition-colors duration-200">
                                        Excluir Perfil
                                    </button>
                                </div>
                            )}

                            <div className="pl-2 pt-14">
                                <h2 className="text-2xl font-semibold text-[#222E50] mb-2">
                                    {userData?.nome ?? "Nome não informado"}
                                </h2>
                                
                                <p className="text-[#222E50] mb-1 flex items-center text-[14px]">
                                    <FaBuilding className="mr-2 text-lg" /> 
                                    {userData?.departamento ?? "Departamento não informado"}
                                </p>
                                
                                <p className="text-[#222E50] flex items-center text-[14px]">
                                    <FaEnvelope className="mr-2 text-lg" /> 
                                    {userData?.email ?? "Email não informado"}
                                </p>

                                <hr className="my-6 border-[#595652]" />

                                <div className="pb-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Publicações</h3>
                                    
                                    <div className="flex flex-col gap-4">
                                        {avaliacoes.length === 0 ? (
                                            <p className="text-sm text-gray-600">Nenhuma avaliação ainda.</p>
                                        ) : (
                                            avaliacoes.map((avaliacao, index) => (
                                                <PostCard
                                                    key={index}
                                                    userName={userData?.nome ?? "Usuário"}
                                                    userImage={userData?.fotosrc ?? "/profileSemFoto/profileSemFoto.jpg"}
                                                    postDate={new Date(avaliacao.data).toLocaleString('pt-BR')}
                                                    nomeProfessor={avaliacao.nomeProfessor}
                                                    materia={avaliacao.materia}
                                                    postContent={avaliacao.avaliacao}
                                                    commentCount={avaliacao.qtdComentarios ?? 0}
                                                />
                                            ))
                                        )}
                                    </div>
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

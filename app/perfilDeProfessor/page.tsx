"use client"
import React, { useEffect, useState } from 'react';
import NavBar from '../components/navbar/NavBar'; 
import { FaBuilding, FaBook, FaArrowLeft } from 'react-icons/fa';
import { useRouter, useSearchParams } from 'next/navigation';
import { getOneProf } from '../utils/api';

const PerfilDeProfessor = () => {
    const router = useRouter();
    const searchParams = useSearchParams();
    const profId = searchParams.get("id"); // pega ?id=xxx da URL

    const [professor, setProfessor] = useState<any>(null);

    useEffect(() => {
        const fetchProfessor = async () => {
            if (profId) {
                try {
                    const prof = await getOneProf(Number(profId));
                    setProfessor(prof);
                } catch (error) {
                    console.error("Erro ao carregar professor:", error);
                }
            }
        };

        fetchProfessor();
    }, [profId]);

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
                                src={professor?.fotosrc ?? "/profileSemFoto/profileSemFoto.jpg"} 
                                alt="Profile Avatar"
                                className="absolute top-0 left-6 transform -translate-y-1/2 
                                       w-36 h-36 rounded-full object-cover border-4 border-white shadow-lg"
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
                                    {professor?.materias?.join(", ") ?? "Matérias não informadas"}
                                </p>

                                <hr className="my-6 border-[#595652]" />

                                <div className="pb-2">
                                    <h3 className="text-lg font-semibold text-gray-800 mb-4">Avaliações</h3>
                                    <div className="text-sm text-gray-600">Nenhuma avaliação ainda.</div>
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

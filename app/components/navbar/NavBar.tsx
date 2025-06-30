'use client'
import React, { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import Botao_Branco from '../botao_branco/Botao_branco';
import { jwtDecode } from 'jwt-decode';
import { getOneUser } from '@/app/utils/api';

export default function NavBar() {
    const router = useRouter();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [userPhoto, setUserPhoto] = useState<string | null>(null);
    const [userID, setUserID] = useState<number | null>(null);

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (token) {
            setIsLoggedIn(true);
            try {
                const decoded: { sub?: string } = jwtDecode(token);
                if (decoded.sub) {
                    const id = Number(decoded.sub);
                    setUserID(id);

                    getOneUser(id)
                        .then(user => {
                            setUserPhoto(user.fotosrc ?? null);
                        })
                        .catch(err => console.error("Erro ao buscar foto do usuário:", err));
                }
            } catch (error) {
                console.error("Erro ao decodificar token:", error);
            }
        }
    }, []);

    const handleLogout = () => {
        localStorage.removeItem('token');
        setIsLoggedIn(false);
    }

    return (
        <header>
            <nav className="h-15 bg-[#050036] text-white p-1">
                <div className="container mx-auto flex justify-between items-center">
                    <div className="flex items-center space-x-4 ml-15">
                        <button
                            aria-label="Home"
                            className="p-1 rounded-full hover:scale-105 transition duration-300 cursor-pointer"
                            onClick={() => router.push('/')}
                        >
                            <img src="/logo/Logomarca 3.svg" alt="Logo" className="h-12" />
                        </button>
                    </div>

                    {isLoggedIn ? (
                        <ul className="flex space-x-4 mr-15">
                            <li>
                                <button
                                    aria-label="mais"
                                    className="p-1 rounded-full hover:scale-110 transition duration-300 cursor-pointer"
                                >
                                    <img src="/icones-nav/Mais_Icon.png" alt="Mais" className="h-7" />
                                </button>
                            </li>

                            <li>
                                <button
                                    aria-label="notificações"
                                    className="p-1 rounded-full hover:scale-110 transition duration-300 cursor-pointer"
                                >
                                    <img src="/icones-nav/Noti_Icon.png" alt="notificações" className="h-7" />
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={() => router.push('/perfilDeUsuario')}
                                    className="p-1 rounded-full hover:scale-110 transition duration-300 cursor-pointer"
                                    aria-label="Perfil do usuário"
                                >
                                    <img
                                        src={userPhoto || "/profileSemFoto/profileSemFoto.jpg"}
                                        alt="Foto do perfil"
                                        className="h-9 w-9 rounded-full object-cover border border-white shadow-sm"
                                    />
                                </button>
                            </li>

                            <li>
                                <button
                                    onClick={handleLogout}
                                    aria-label="Sair"
                                    className="p-1 rounded-full hover:scale-110 transition duration-300 cursor-pointer"
                                >
                                    <img src="/icones-nav/Saida_Icon.png" alt="Sair" className="h-7" />
                                </button>
                            </li>
                        </ul>
                    ) : (
                        <ul className="flex flex-col sm:flex-row gap-2 sm:gap-4 mr-15">
                            <li className='flex space-x-3'>
                                <Botao_Branco onClick={() => router.push('/login')} type="button">
                                    Login
                                </Botao_Branco>
                                <Botao_Branco onClick={() => router.push('/cadastro')} type="button">
                                    Cadastro
                                </Botao_Branco>
                            </li>
                        </ul>
                    )}
                </div>
            </nav>
        </header>
    );
}

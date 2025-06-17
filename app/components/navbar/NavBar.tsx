'use client'
import React, {ReactNode, MouseEventHandler} from 'react'
import { useRouter } from 'next/navigation'
import Botão from '../botao_branco/Botao_branco'

export default function NavBar({ isLoggedIn = false }) {

    const router = useRouter();

    const handleLogout = () => {
        localStorage.removeItem('token'); // Remove o token do localStorage
        router.push('/login'); // Redireciona para a página de login
    }

    return (
    <header>
        <nav className="bg-[#050036] text-white py-1">
            <div className="container mx-auto flex justify-between items-center">
                <div className="flex items-center space-x-4 ml-15">
                    <button
                    aria-label="Home"
                    className="p-1 rounded-full hover:scale-105 transition duration-300 cursor-pointer"
                    > <img src="/logo/Logomarca 3.svg" 
                        alt="Logo" 
                        className="h-8 sm:h-10 md:h-12 lg:h-14 max-w-[180px] w-auto" />
                    </button>
                </div>    
                { isLoggedIn ? (
                    <ul className="flex space-x-3 sm:space-x-4 mr-15"> 
                        <li> 
                        <button
                        aria-label = "mais"
                        className = " p-1 rounded-full hover:scale-110 transition duration-300 cursor-pointer"
                        > <img src="/icones-nav/Mais_Icon.png" alt = "Mais" className = "h-7" />
                        </button>  
                            </li>

                        <li>   
                        <button
                        aria-label = "notificações"
                        className = " p-1 rounded-full hover:scale-110 trasition duration-300 cursor-pointer"
                        > <img src="/icones-nav/Noti_Icon.png" alt = "notificações" className = "h-7" />
                        </button>

                        </li>

                        <li>   
                        <button
                        aria-label = "Icon"
                        className = " p-1 rounded-full hover:scale-110 trasition duration-300 cursor-pointer"
                        > <img src="/icones-nav/PH_Icon.png" alt = "Icon" className = "h-7" />
                        </button>

                        </li>

                        <li>   
                        <button
                        aria-label = "Sair"
                        onClick = {handleLogout}
                        className = " p-1 rounded-full hover:scale-110 trasition duration-300 cursor-pointer"
                        > <img src="/icones-nav/Saida_Icon.png" alt = "saida" className = "h-7" />
                        </button>

                        </li>
                    </ul>
                ) : (
                    <ul className="flex space-x-3 sm:space-x-4 mr-15">
                        <li
                        className='flex gap-2 sm:gap-4'>
                            <Botão
                            onClick={() => router.push('/login')}
                            type="button">
                                Login
                            </Botão>
                            <Botão
                            onClick={() => router.push('/cadastro')}
                            type="button">
                                Cadastro
                            </Botão>
                        </li>
                    </ul>

                )}
            </div>
        </nav>
    </header>
    );
}

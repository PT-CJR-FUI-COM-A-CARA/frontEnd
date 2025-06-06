'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Botão from '../components/botao_azul/Botao';

export default function LoginPage() 
{
  const router = useRouter();
  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* IMAGEM JACARÉ */}
      <div className="w-full md:w-1/2 bg-yellow-100 flex justify-center items-center">
        <img
          src="logo/jacareLogin.png"
          alt="JacaréLogin"
          className='w-full h-full object-contain'
        />
      </div>

      {/* FORMULÁRIO P/ LOGIN DO USUÁRIO */}
      <div className="w-full md:w-1/2 bg-[#EDEDED] flex flex-col justify-center items-center p-8">
      
        <img
          src="logo/Logomarca 1.svg"
          alt="Logo"
          className='w-100 mb-6'/>
        
        <form className="w-full max-w-sm space-y-4">

          <input
            type="email"
            placeholder="Email"
            className="h-12 w-full p-2 bg-white rounded-xl placeholder-gray-500 text-gray-700"
          />
          <input
            type="password"
            placeholder="Senha"
            className="h-12 w-full p-2 bg-white rounded-xl placeholder-gray-500 text-gray-700"
          />
          
          <div className = "w-full flex justify-center mt-8 space-x-20">
            <Botão
              type="submit"
            >
              Entrar
            </Botão>

            { /* BOTÃO PARA REDIRECIONAR PARA A PÁGINA DE CADASTRO */}
            <Botão
              onClick={() => router.push('/cadastro')}
            >
              Criar Conta
            </Botão>
            </div>
          </form>
      </div>
    </div>
  );
}
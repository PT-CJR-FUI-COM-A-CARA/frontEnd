'use client';

import { useRouter } from 'next/navigation';
import React from 'react';
import Botão from '../components/botao_azul/Botao';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

export default function LoginPage() {
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [erro, setErro] = React.useState<string | null>(null);
  const [senhaVisivel, setSenhaVisivel] = React.useState(false);

  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !senha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }
    try {
      // Lógica de autenticação
    } catch (err) {
      setErro('Erro ao fazer login. Verifique suas credenciais.');
    }
  };

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* IMAGEM JACARÉ */}
      <div className="w-full md:w-1/2 bg-yellow-100 flex justify-center items-center">
        <img
          src="logo/jacareLogin.png"
          alt="JacaréLogin"
          className="w-full h-full object-contain"
        />
      </div>

      {/* FORMULÁRIO P/ LOGIN DO USUÁRIO */}
      <div className="w-full md:w-1/2 bg-[#EDEDED] flex flex-col justify-center items-center p-8">
        <img
          src="logo/Logomarca 1.svg"
          alt="Logo"
          className="w-100 mb-6"
        />

        <form className="w-full max-w-sm space-y-4" onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full p-2 bg-white rounded-xl placeholder-gray-500 text-gray-700"
          />


          <div className="relative">
            <input
              type={senhaVisivel ? 'text' : 'password'}
              placeholder="Senha"
              value={senha}
              onChange={(e) => setSenha(e.target.value)}
              className="h-12 w-full p-2 bg-white rounded-xl placeholder-gray-500 text-gray-700 pr-10"
            />
            <button
              type="button"
              onClick={() => setSenhaVisivel(!senhaVisivel)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {senhaVisivel ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <div className="w-full flex justify-center mt-8 space-x-20">
            <Botão type="submit">Entrar</Botão>

            {/* BOTÃO PARA REDIRECIONAR PARA A PÁGINA DE CADASTRO */}
            <Botão onClick={() => router.push('/cadastro')}>
              Criar Conta
            </Botão>
          </div>
        </form>
      </div>
    </div>
  );
}
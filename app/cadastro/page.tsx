'use client';

import { useRouter } from 'next/navigation';
import React, { useState } from 'react';
import Botão from '../components/botao_azul/Botao_Azul';
import Popup from '../components/popup/PopUp';
import { registerUser } from '../utils/api';
import { FaEye, FaEyeSlash } from "react-icons/fa";

export default function CadastroPage() {
  const [senha, setSenha] = useState('');
  const [confirmarSenha, setConfirmarSenha] = useState('');
  const [erro, setErro] = useState('');
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [curso, setCurso] = useState('');
  const [departamento, setDepartamento] = useState('');

  //POP-UP
  const [popupAberto, setPopupAberto] = useState(false);

  //ROTA
  const router = useRouter();

  //VISUALIZAÇÃO DA SENHA
  const [senhaVisivel, setSenhaVisivel] = useState(false);
  const [confirmarSenhaVisivel, setConfirmarSenhaVisivel] = useState(false);

  const lendoRegister = async () => {
    try {
      await registerUser(nome, email, senha, curso, departamento);
      setPopupAberto(true);
      setErro('');

      setTimeout(() => {
        router.push('/login');
      }, 3500);

    } catch (error) {
      console.error('Erro ao registrar usuário:', error);
      setErro('Erro ao registrar usuário. Por favor, tente novamente.');
    }
  };

  const validarSenhaSegura = (senha: string) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(senha);
  };

  const validarEmail = (email: string) => {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validarSenhaSegura(senha)) {
      setErro('A senha deve ter pelo menos 8 caracteres, incluindo uma letra maiúscula, uma letra minúscula, um número e um caractere especial.');
      return;
    }

    if (senha !== confirmarSenha) {
      setErro('As senhas não coincidem.');
      return;
    }

    if (!nome || !email || !curso || !departamento || !senha || !confirmarSenha) {
      setErro('Por favor, preencha todos os campos.');
      return;
    }

    if (!validarEmail(email)) {
      setErro('Por favor, insira um email válido.');
      return;
    }

    await lendoRegister();
  }

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* IMAGEM JACARÉ */}
      <div className="w-full md:w-1/2 bg-yellow-100 flex justify-center items-center">
        <img
          src="logo/jacareCadastro.png"
          alt="Jacaré Cadastro"
          className='w-[90%] h-full object-contain'
        />
      </div>

      {/* FORMULÁRIO P/ CADASTRO DO USUÁRIO */}
      <div className="w-full md:w-1/2 bg-[#EDEDED] flex flex-col justify-center items-center p-8">

        <img
          src="logo/Logomarca 2.svg"
          alt="Logo"
          className='w-100 mb-6' />

        <form className="w-full max-w-sm space-y-4" onSubmit={handleSubmit}>

          <input
            type="text"
            placeholder="Nome"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            className="h-12  w-full p-2 bg-white rounded-xl placeholder-gray-500 text-gray-700"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="h-12 w-full p-2 bg-white rounded-xl placeholder-gray-500 text-gray-700"
          />

          {/* CAMPO SENHA COM OLHINHO */}
          <div className= "relative">
            <input
              type={senhaVisivel ? "text" : "password"}
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

          {/* CAMPO CONFIRMAR SENHA COM OLHINHO */}
          <div className="relative">
            <input
              type={confirmarSenhaVisivel ? "text" : "password"}
              placeholder="Confirmar Senha"
              value={confirmarSenha}
              onChange={(e) => setConfirmarSenha(e.target.value)}
              className="h-12 w-full p-2 bg-white rounded-xl placeholder-gray-500 text-gray-700 pr-10"
            />
            <button
              type="button"
              onClick={() => setConfirmarSenhaVisivel(!confirmarSenhaVisivel)}
              className="absolute right-3 top-3 text-gray-500"
            >
              {confirmarSenhaVisivel ? <FaEyeSlash /> : <FaEye />}
            </button>
          </div>

          <input
            type="text"
            placeholder="Curso"
            value={curso}
            onChange={(e) => setCurso(e.target.value)}
            className="h-12 w-full p-2 bg-white rounded-xl placeholder-gray-500 text-gray-700"
          />

          <input
            type="text"
            placeholder="Departamento"
            value={departamento}
            onChange={(e) => setDepartamento(e.target.value)}
            className="h-12 w-full p-2 bg-white rounded-xl placeholder-gray-500 text-gray-700"
          />

          {erro && <p className="text-red-500 text-sm">{erro}</p>}

          <Popup isOpen={popupAberto} onClose={() => setPopupAberto(false)}>
            <div className='flex flex-col items-center'>
              <h2 className='text-[#050036] font-bold mb-4'>Cadastro realizado com sucesso!</h2>
              <p className='text-[#050036]'>Redirecionando para o login...</p>
            </div>
          </Popup>

          <div className="w-full flex justify-center mt-8 space-x-20">
            <Botão type="submit">
              Criar Conta
            </Botão>

            <Botão onClick={() => router.push('/login')}>
              Login
            </Botão>
          </div>
        </form>
      </div>
    </div>
  );
}

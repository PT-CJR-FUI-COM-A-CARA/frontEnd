'use client';

import { useRouter } from 'next/navigation';

export default function LoginPage() 
{
  const router = useRouter();

  return (
    <div className="flex flex-col md:flex-row min-h-screen">
      {/* IMAGEM JACARÉ */}
      <div className="w-full md:w-1/2 bg-yellow-100 flex justify-center items-center">
        <img
          src="/jacareLogin.png"
          alt="JacaréLogin"
          style={{ width: "915px", height: "858px", objectFit: "contain" }}
        />
      </div>

      {/* FORMULÁRIO P/ LOGIN DO USUÁRIO */}
      <div className="w-full md:w-1/2 bg-gray-100 flex flex-col justify-center items-center p-8">
        <h1 className="text-3xl font-bold mb-4 text-center">
          <span className="text-blue-900">FUI COM A CARA</span>
        </h1>

        <form className="w-full max-w-sm space-y-4">
          <input
            type="email"
            placeholder="Email"
            className="w-full p-2 border rounded placeholder-gray-500 text-gray-700"
          />
          <input
            type="password"
            placeholder="Senha"
            className="w-full p-2 border rounded placeholder-gray-500 text-gray-700"
          />
          <button
            type="submit"
            className="w-full p-2 bg-blue-900 text-white rounded hover:bg-blue-800"
          >
            Entrar
          </button>
        </form>

        {/* BOTÃO DE CRIAR UMA CONTA */}
        <div className="mt-4 w-full max-w-sm">
          <button
          //redireciona o usuário para página de cadastro
            onClick={() => router.push('/cadastro')}
            className="w-full p-2 bg-blue-900 text-white rounded hover:bg-blue-800"
          >
            Criar nova conta
          </button>
        </div>
      </div>
    </div>
  );
}

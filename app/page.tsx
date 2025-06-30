'use client';
import React, { useEffect, useState } from 'react';
import NavBar from './components/navbar/NavBar';
import CarrosselProfessores from './components/carrossel/carrossel';
import DropdownOrdenar from './components/ordenar/ordenar';
import BarraPes from './components/pesquisa/pesquisa';
import ProfQuadro from './components/quadro/Quadro';
import { getAllProf } from './utils/api';
import Link from 'next/link';

const Home = () => {
  type Professor = {
    id: number;
    nome: string;
    materia: string;
    departamento: string;
    fotosrc: string;
  };

  const [professores, setProfessores] = useState<Professor[]>([]);
  const [ordenacao, setOrdenacao] = useState<'nome' | 'departamento' | 'recentes' | 'antigas'>('recentes');
  const [termoBusca, setTermoBusca] = useState("");

  useEffect(() => {
    const fetchProfessores = async () => {
      try {
        const data = await getAllProf();
        setProfessores(data);
      } catch (error) {
        console.error('Erro ao buscar professores:', error);
      }
    };

    fetchProfessores();
  }, []);

  const professoresRecentes = professores.slice(-8);

  const professoresOrdenados = [...professores].sort((a, b) => {
    if (ordenacao === 'nome') return a.nome.localeCompare(b.nome);
    if (ordenacao === 'departamento') return a.departamento.localeCompare(b.departamento);
    if (ordenacao === 'antigas') return 0;
    if (ordenacao === 'recentes') return -1;
    return 0;
  });

  const professoresFiltrados = professores.filter((prof) =>
    prof.nome.toLowerCase().startsWith(termoBusca.toLowerCase())
  );

  return (
    <>
      <NavBar />

      {/* Barra de Pesquisa */}
      <div className="flex justify-end px-10 mt-4">
        <BarraPes onSearch={setTermoBusca} sugestoes={professores.map((p) => p.nome)}/>
      </div>

      {/* Se estiver pesquisando, mostrar os resultados */}
      {termoBusca ? (
        <section className="px-10 py-6">
          <h2 className="text-3xl font-medium ml-15">Resultado da Pesquisa</h2>
          {professoresFiltrados.length > 0 ? (
            <div className="flex flex-wrap justify-center gap-6">
              {professoresFiltrados.map((prof) => (
                <Link href={`/perfilDeProfessor?id=${prof.id}`} key={prof.id}>
                <ProfQuadro
                  key={prof.id}
                  id={prof.id}
                  nome={prof.nome}
                  materia={prof.materia}
                  departamento={prof.departamento}
                  fotosrc={prof.fotosrc}
                />
                </Link>
              ))}
            </div>
          ) : (
            <p className="font-medium ml-15 sm:ml-10 md:ml-15 text-gray-500">Nenhum professor encontrado com esse nome.</p>
          )}
        </section>
      ) : (
        <>
          {/* Carrossel - Novos Professores */}
          <section className="px-4 sm:px-8 md:px-10 lg:px-15 py-10">
            <h2 className="text-3xl font-medium ml-4 sm:ml-8 md:ml-10">Novos Professores</h2>
            <CarrosselProfessores professores={professoresRecentes} />
          </section>

          {/* Carrossel - Todos os Professores com ordenação */}
          <section className="px-4 sm:px-8 md:px-10 lg:px-15 py-10">
            <div className="flex justify-between items-center mb-1">
              <h2 className="text-3xl font-medium ml-4 sm:ml-8 md:ml-10">Todos os Professores</h2>
              <DropdownOrdenar ordenacao={ordenacao} setOrdenacao={setOrdenacao} />
            </div>
            <CarrosselProfessores professores={professoresOrdenados} />
          </section>
        </>
      )}
    </>
  );
};

export default Home;

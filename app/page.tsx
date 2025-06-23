'use client';
import React, { useEffect } from 'react'
import NavBar from './components/navbar/NavBar'
import CarrosselProfessores from './components/carrossel/carrossel'
import DropdownOrdenar from './components/ordenar/ordenar';
import BarraPes from './components/pesquisa/pesquisa';
import ProfQuadro from './components/quadro/Quadro';
import { useState } from 'react';
import { getAllProf } from './utils/api';


const Home = () => {

  type Professor = {
  id: number;
  nome: string;
  materia: string;
  departamento: string;
  fotosrc: string;
};

  const [professores, setProfessores] = useState<Professor[]>([]);
  const [ordenacao, setOrdenacao] = useState<'nome' | 'materia' | 'recentes' | 'antigas'>('recentes');
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

  const professoresRecentes = professores.slice(-8); // Ultimos 8 professores

  const professoresOrdenados = [...professores].sort((a, b) => {
    if (ordenacao === 'nome') return a.nome.localeCompare(b.nome);
    if (ordenacao === 'materia') return a.materia.localeCompare(b.materia);
    if (ordenacao === 'recentes') return 0; // Manter a ordem original
    if (ordenacao === 'antigas') return -1; // Inverter a ordem original
    return 0;
  });

  const professoresFiltrados = professores.filter((prof) =>
    prof.nome.toLowerCase().includes(termoBusca.toLowerCase())
  );

  return (
  <>
   <NavBar />

   <div className="flex justify-end px-10 mt-4">
      <BarraPes onSearch={setTermoBusca} />
    </div>
      {termoBusca && (
        <section className="px-10 py-6">
          <h2 className="text-2xl font-semibold mb-4">Resultado da Pesquisa</h2>
          {professoresFiltrados.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-6">
              {professoresFiltrados.map((prof) => (
                <ProfQuadro
                  key={prof.id}
                  id={prof.id}
                  nome={prof.nome}
                  materia={prof.materia}
                  departamento={prof.departamento}
                  fotosrc={prof.fotosrc}
                />
              ))}
            </div>
          ) : (
            <p className="text-gray-500">Nenhum professor encontrado com esse nome.</p>
          )}
        </section>
      )}

   <section className='px-15 py-10'>
    <h2 className="text-3xl font-medium ml-15">Novos Professores</h2>
    <CarrosselProfessores professores={professoresRecentes} />
   </section>
   <section className='px-15 py-10'>
    <div className='flex justify-between items-center mb-1'>
      <h2 className="text-3xl font-medium ml-15">Todos os Professores</h2>
       <DropdownOrdenar ordenacao={ordenacao} setOrdenacao={setOrdenacao} />
    </div>
    <CarrosselProfessores professores={professoresOrdenados} />
   </section>
  </>
  )
}

export default Home
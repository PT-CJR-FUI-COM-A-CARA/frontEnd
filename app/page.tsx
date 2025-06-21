'use client';
import React, { useEffect } from 'react'
import NavBar from './components/navbar/NavBar'
import CarrosselProfessores from './components/carrossel/carrossel'
import DropdownOrdenar from './components/ordenar/ordenar';
import { useState } from 'react';
import { getAllProf } from './utils/api';


const Home = () => {

  type Professor = {
  id: number;
  name: string;
  materia: string;
  departamento: string;
  fotosrc: string;
};

  const [professores, setProfessores] = useState<Professor[]>([]);
  const [ordenacao, setOrdenacao] = useState<'nome' | 'materia' | 'recentes' | 'antigas'>('recentes');

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
    if (ordenacao === 'nome') return a.name.localeCompare(b.name);
    if (ordenacao === 'materia') return a.materia.localeCompare(b.materia);
    if (ordenacao === 'recentes') return 0; // Manter a ordem original
    if (ordenacao === 'antigas') return -1; // Inverter a ordem original
    return 0;
  });

  return (
  <>
   <NavBar />
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
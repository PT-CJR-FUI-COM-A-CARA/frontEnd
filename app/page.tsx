'use client';
import React from 'react'
import NavBar from './components/navbar/NavBar'
import CarrosselProfessores from './components/carrossel/carrossel'
import DropdownOrdenar from './components/ordenar/ordenar';
import { useState } from 'react';

const Home = () => {

  const [ordenacao, setOrdenacao] = useState<'nome' | 'materia' | 'recentes' | 'antigas'>('recentes');

  const professores = [
    {
      name: "Ed Sheeran",
      area: "Composição",
      Fotopsrc: "/fotos/Ed.jpg",
    },
    {
      name: "Shawn Mendes",
      area: "Técnica de Performance",
      Fotopsrc: "/fotos/Shawn.avif",
    },
    {
      name: "Camila Cabello",
      area: "Expressão Artística",
      Fotopsrc: "/fotos/Camila.jpg",
    },
    {
      name: "Beyoncé",
      area: "Didática",
      Fotopsrc: "/fotos/Bey.webp",
    },
    {
      name: "Taylor Swift",
      area: "Análise Musical",
      Fotopsrc: "/fotos/Taylor.jpg",
    },
    {
      name: "Ariana Grande",
      area: "Prática de Conjunto",
      Fotopsrc: "/fotos/Ariana.avif",
    },
    {
      name: "Miley Cyrus",
      area: "Métodos da Monia",
      Fotopsrc: "/fotos/Cyrus.jpg",
    },
    {
      name: "Billie Eilish",
      area: "Técnica Vocal",
      Fotopsrc: "/fotos/Billie.webp",
    },
    {
      name: "Dua Lipa",
      area: "Produção Musical",
      Fotopsrc: "/fotos/Dua.webp",
    },
    {
      name: "Selena Gomez",
      area: "Marketing Musical",
      Fotopsrc: "/fotos/Selena.avif",
    },
    {
      name: "Harry Styles",
      area: "História da Música",
      Fotopsrc: "/fotos/Harry.webp",
    },
  ];

  const professoresRecentes = professores.slice(-8); // Ultimos 8 professores

  const professoresOrdenados = [...professores].sort((a, b) => {
    if (ordenacao === 'nome') return a.name.localeCompare(b.name);
    if (ordenacao === 'materia') return a.area.localeCompare(b.area);
    if (ordenacao === 'recentes') return 0; // Manter a ordem original
    if (ordenacao === 'antigas') return -1; // Inverter a ordem original
    return 0; // Caso não seja nenhuma das opções, manter a ordem original
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
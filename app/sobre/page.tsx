"use client";
import React from "react";
import { FaPaintBrush, FaRocket, FaLightbulb, FaGem } from "react-icons/fa";
import  Botao_Branco  from "@/app/components/botao_branco/Botao_branco"; 

export default function AboutPage() {
  return (
    <div className="bg-[#EDEDED] text-gray-200 font-sans">
      <section
        className="relative flex flex-col items-center justify-center text-center py-32 px-4 bg-cover bg-top bg-no-repeat"
        style={{ backgroundImage: "url('/fotoEquipe/fotoEquipe.jpeg')" }}
      >
        <div className="absolute inset-0 bg-[#050036]/60"></div>

        <div className="relative z-10">
          <h1 className="text-4xl md:text-6xl font-bold mb-6">Fui Com a Cara</h1>
        </div>
      </section>

      {/* Serviços rápidos */}
      <section className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto py-16 px-6">
        <ServiceCard icon={<FaPaintBrush />} title="Identidade Visual" text="Nossa identidade visual é única, de tal forma a gerar uma aproximação do usuário com a marca"/>
        <ServiceCard icon={<FaLightbulb />} title="Inovação" text="Temos como objetivo a criação de uma plataforma de fácil acesso para o usuário ver as avaliações de um professor"/>
        <ServiceCard icon={<FaRocket />} title="Trabalho Estratégico" text="Dividimos nossas tarefas estrategicamente para cada dev implementar mais funcionalidades para o site"/>
        <ServiceCard icon={<FaGem />} title="Hard Skills" text="Utilizamos desse projeto para aprimoramento das nossas habilidades de programação"/>
      </section>

      {/* About us */}
      <section className="bg-[#050036] py-20 px-6 text-center">
        
      </section>
    </div>
  );
}

function ServiceCard({ icon, title, text }) {
  return (
    <div className="bg-[#050036] p-6 rounded-lg text-center hover:bg-purple-600 hover:text-white transition-colors duration-300">
      <div className="text-3xl mb-4">{icon}</div>
      <h3 className="text-lg font-semibold">{title}</h3>
      <p className="text-gray-400 mt-2 text-sm">{text}</p>
    </div>
  );
}


function AboutCard({ title }) {
  return (
    <div className="bg-[#0f0f1c] p-6 rounded-lg text-left hover:bg-purple-600 hover:text-white transition-colors duration-300">
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-400 text-sm">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Vivamus laoreet nec nunc et fringilla.
      </p>
    </div>
  );
}

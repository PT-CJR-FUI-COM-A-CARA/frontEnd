import React from 'react'
import NavBar from './components/navbar/NavBar'
import ProfQuadro from './components/quadro/Quadro'

const Home = () => {

  const professores = [
    {
      name: "Harry Styles",
      area: "História da Música",
      Fotopsrc: "/fotos/Harry.webp",
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
      name: "Beyoncé",
      area: "Didática",
      Fotopsrc: "/fotos/Bey.webp",
    },
    {
      name: "Billie Eilish",
      area: "Técnica Vocal",
      Fotopsrc: "/fotos/Billie.webp",
    },
    {
      name: "Ed Sheeran",
      area: "Composição",
      Fotopsrc: "/fotos/Ed.jpg",
    },
    {
      name: "Dua Lipa",
      area: "Produção Musical",
      Fotopsrc: "/fotos/Dua.webp",
    },
  ];

  return (
    <>
   <NavBar />
   <section className='bg-gray-100 px-6 py-20'>
      <h2 className='text-3xl font-bold mb-8 ml-15'>Novos Professores</h2>
       <div className='flex overflow-x-auto scrollbar-hide'>
        {professores.map((professor, index) => (
          <div
          key = {index}
          className=' ml-15 w-[180px] h-[180px] md:w-[220px] md:h-[220px] lg:w-[250px] lg:h-[350px]'
          >
            <ProfQuadro
              name={professor.name}
              area={professor.area}
              Fotopsrc={professor.Fotopsrc}
            />
          </div>
        ))}
        </div>
   </section>

    </>
  )
}

export default Home
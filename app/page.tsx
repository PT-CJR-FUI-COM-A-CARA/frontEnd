import React from 'react'
import NavBar from './components/navbar/NavBar'
import BarraPes from './components/barra_pesquisa/Barra_pes'

const Home = () => {
  return (
    <>
   <NavBar />
  
    <div>
      <p>Essa é a página inicial</p>
      <BarraPes type = "search" />
    </div>
    </>
  )
}

export default Home